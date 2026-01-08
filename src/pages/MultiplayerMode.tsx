import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ref, set, onValue, push, get } from "firebase/database";
import { database } from "../firebase/config";
import { MealCard, Recipe } from "../components/MealCard";
import { Loader } from "../components/Loader";
import { shuffleArray } from "../utils/helpers";

interface Session {
  recipes: Recipe[];
  users: {
    [userId: string]: {
      currentIndex: number;
      likes: number[];
    };
  };
  matches: Recipe[];
}

export const MultiplayerMode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  
  const [userId] = useState(() => {
    const stored = sessionStorage.getItem("mm_user_id");
    if (stored) return stored;
    const newId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("mm_user_id", newId);
    return newId;
  });
  const [session, setSession] = useState<Session | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(true);

  const createNewSession = useCallback(async () => {
    try {
      const diet = searchParams.get("diet") || "none";
      
      const cacheKey = `mm_recipes_${diet}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
      
      let recipes: Recipe[];
      
      if (cachedData && cacheTimestamp) {
        const age = Date.now() - parseInt(cacheTimestamp);
        const maxAge = 24 * 60 * 60 * 1000;
        
        if (age < maxAge) {
          console.log("Using cached recipes for multiplayer", diet);
          const cachedRecipes = JSON.parse(cachedData);
          recipes = shuffleArray(cachedRecipes);
        } else {
          recipes = await fetchRecipesFromAPI(diet);
          recipes = shuffleArray(recipes);
        }
      } else {
        recipes = await fetchRecipesFromAPI(diet);
        recipes = shuffleArray(recipes);
      }
      
      if (!recipes || recipes.length === 0) {
        console.error("No recipes available");
        alert("Could not load recipes. Please try again.");
        setLoading(false);
        navigate("/filter");
        return;
      }

      const sessionsRef = ref(database, "sessions");
      const newSessionRef = push(sessionsRef);
      const newSessionId = newSessionRef.key;

      const sessionData: Session = {
        recipes,
        users: {
          [userId]: {
            currentIndex: 0,
            likes: [],
          },
        },
        matches: [],
      };

      await set(newSessionRef, sessionData);
      
      const link = `${window.location.origin}/multiplayer?sessionId=${newSessionId}`;
      setShareLink(link);
      navigate(`/multiplayer?sessionId=${newSessionId}`, { replace: true });
    } catch (error) {
      console.error("Error creating session:", error);
      setLoading(false);
    }
  }, [userId, searchParams, navigate]);

  const fetchRecipesFromAPI = async (diet: string): Promise<Recipe[]> => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const dietParam = diet === "meat" ? "" : diet === "none" ? "" : `&diet=${diet}`;
    
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=50&addRecipeInformation=true${dietParam}`
    );
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return [];
    }
    
    const recipes: Recipe[] = data.results.map((r: { id: number; title: string; image: string; diets: string[] }) => ({
      id: r.id,
      title: r.title,
      image: r.image,
      diets: r.diets || [],
    }));
    
    // Cache the results
    const cacheKey = `mm_recipes_${diet}`;
    localStorage.setItem(cacheKey, JSON.stringify(recipes));
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
    console.log("Cached recipes for", diet);
    
    return recipes;
  };

  const joinSession = useCallback(async (sid: string) => {
    try {
      const sessionRef = ref(database, `sessions/${sid}`);
      const snapshot = await get(sessionRef);
      
      if (snapshot.exists()) {
        const sessionData = snapshot.val();
        
        if (!sessionData.users[userId]) {
          await set(ref(database, `sessions/${sid}/users/${userId}`), {
            currentIndex: 0,
            likes: [],
          });
        }
        
        const link = `${window.location.origin}/multiplayer?sessionId=${sid}`;
        setShareLink(link);
        setLoading(false);
      } else {
        alert("Session not found!");
        navigate("/filter");
      }
    } catch (error) {
      console.error("Error joining session:", error);
      setLoading(false);
    };
  }, [userId, navigate]);

  useEffect(() => {
    const initSession = async () => {
      if (!sessionId) {
        await createNewSession();
      } else {
        await joinSession(sessionId);
      }
    };
    initSession();
  }, [sessionId, createNewSession, joinSession]);

  useEffect(() => {
    if (!sessionId) return;

    const sessionRef = ref(database, `sessions/${sessionId}`);
    const unsubscribe = onValue(sessionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (!data.matches) {
          data.matches = [];
        }
        setSession(data);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [sessionId]);

  const handleLike = async (recipe: Recipe) => {
    if (!sessionId || !session) return;

    const userLikes = [...(session.users[userId]?.likes || []), recipe.id];
    
    await set(ref(database, `sessions/${sessionId}/users/${userId}/likes`), userLikes);
    
    const otherUsers = Object.keys(session.users).filter((id) => id !== userId);
    let isMatch = false;
    
    for (const otherUserId of otherUsers) {
      const otherUserLikes = session.users[otherUserId]?.likes || [];
      if (otherUserLikes.includes(Number(recipe.id))) {
        isMatch = true;
        
        const matchExists = session.matches.some((m) => m.id === recipe.id);
        if (!matchExists) {
          const newMatches = [...session.matches, recipe];
          await set(ref(database, `sessions/${sessionId}/matches`), newMatches);
          
          const sessionMatches = JSON.parse(localStorage.getItem("mm_session_matches") || "{}");
          sessionMatches[sessionId] = {
            matches: newMatches,
            timestamp: Date.now(),
            sessionId: sessionId
          };
          localStorage.setItem("mm_session_matches", JSON.stringify(sessionMatches));
        }
        break;
      }
    }
    
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    await set(ref(database, `sessions/${sessionId}/users/${userId}/currentIndex`), newIndex);
    
    if (isMatch) {
      alert("🎉 It's a match!");
    }
  };

  const handleDislike = async () => {
    if (!sessionId) return;

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    await set(ref(database, `sessions/${sessionId}/users/${userId}/currentIndex`), newIndex);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <Loader />
      </div>
    );
  }

  if (!session || !session.recipes || currentIndex >= session.recipes.length) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-6">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            All done! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            You've swiped through all recipes. Check out your matches!
          </p>
          
          {session && session.matches.length > 0 && (
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Your Matches ({session.matches.length})</h3>
              <div className="space-y-2">
                {session.matches.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100"
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  >
                    {recipe.image && (
                      <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover" />
                    )}
                    <span className="font-medium text-gray-800">{recipe.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-4">
      <div className="flex-shrink-0 mb-2 text-center">
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">
          Swipe Together
        </h1>
        <p className="text-xs text-gray-600">
          {currentIndex + 1} / {session.recipes.length} recipes
          {session.matches && session.matches.length > 0 && ` • ❤️ ${session.matches.length} ${session.matches.length === 1 ? "match" : "matches"}`}
        </p>
      </div>

      {shareLink && (
        <div className="flex-shrink-0 mb-2 bg-white rounded-lg p-2 shadow-sm max-w-md w-full mx-auto">
          <p className="text-xs text-gray-600 mb-1">Share with your friend:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
            />
            <button
              onClick={copyShareLink}
              className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-orange-600 transition-colors whitespace-nowrap"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
        <div className="w-full max-w-md h-full flex items-center justify-center">
          <MealCard
            recipe={session.recipes[currentIndex]}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>
      </div>

      <div className="flex-shrink-0 mt-3 text-xs text-gray-500 text-center">
        <p>Use arrow keys: ← Dislike • → Like</p>
      </div>
    </div>
  );
};
