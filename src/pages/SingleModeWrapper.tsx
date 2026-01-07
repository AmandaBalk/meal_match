import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { SingleMode } from "./SingleMode";
import { Recipe } from "../components/MealCard";
import { Loader } from "../components/Loader";
import { shuffleArray } from "../utils/helpers";

export const SingleModeWrapper = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const diet = searchParams.get("diet") || "none";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        
        const cacheKey = `mm_recipes_${diet}`;
        const shuffledCacheKey = `mm_shuffled_${diet}`;
        const cachedData = localStorage.getItem(cacheKey);
        const cachedShuffled = sessionStorage.getItem(shuffledCacheKey);
        const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
        
        if (cachedShuffled) {
          console.log("Using shuffled session cache for", diet);
          setRecipes(JSON.parse(cachedShuffled));
          setLoading(false);
          return;
        }
        
        if (cachedData && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          const maxAge = 24 * 60 * 60 * 1000;
          
          if (age < maxAge) {
            console.log("Using cached recipes for", diet);
            const cachedRecipes: Recipe[] = JSON.parse(cachedData);
            const shuffled = shuffleArray(cachedRecipes);
            setRecipes(shuffled);
            sessionStorage.setItem(shuffledCacheKey, JSON.stringify(shuffled));
            setLoading(false);
            return;
          }
        }
        
        const apiKey = import.meta.env.VITE_API_KEY;
        
        let url = "";
        
        if (diet === "none") {
          url = `https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeInformation=true&apiKey=${apiKey}`;
        } else {
          url = `https://api.spoonacular.com/recipes/complexSearch?number=50&diet=${diet}&addRecipeInformation=true&apiKey=${apiKey}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        
        const transformedRecipes: Recipe[] = data.results.map((r: { id: number; title: string; image: string; diets: string[] }) => ({
          id: r.id,
          title: r.title,
          image: r.image,
          diets: r.diets || [],
        }));

        const shuffledRecipes = shuffleArray(transformedRecipes);
        setRecipes(shuffledRecipes);
        
        localStorage.setItem(cacheKey, JSON.stringify(transformedRecipes));
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
        sessionStorage.setItem(shuffledCacheKey, JSON.stringify(shuffledRecipes));
        console.log("Cached recipes for", diet);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [diet]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🍽️💥</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <SingleMode recipes={recipes} />;
};
