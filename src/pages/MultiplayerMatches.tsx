import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Recipe } from "../components/MealCard";
import { EmptyState } from "../components/EmptyState";

interface SessionMatchData {
  matches: Recipe[];
  timestamp: number;
  sessionId: string;
}

interface SessionMatches {
  [sessionId: string]: SessionMatchData;
}

export const MultiplayerMatches = () => {
  const navigate = useNavigate();
  const [sessionMatches, setSessionMatches] = useState<SessionMatches>({});

  useEffect(() => {
    const saved = localStorage.getItem("mm_session_matches");
    if (saved) {
      setSessionMatches(JSON.parse(saved));
    }
  }, []);

  const handleClearSession = (sessionId: string) => {
    if (window.confirm("Are you sure you want to clear matches?")) {
      const updated = { ...sessionMatches };
      delete updated[sessionId];
      setSessionMatches(updated);
      localStorage.setItem("mm_session_matches", JSON.stringify(updated));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all shared matches?")) {
      setSessionMatches({});
      localStorage.removeItem("mm_session_matches");
    }
  };

  const sessionIds = Object.keys(sessionMatches).sort(
    (a, b) => sessionMatches[b].timestamp - sessionMatches[a].timestamp
  );

  return (
    <div className="h-full bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8 px-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            <span>←</span> Back
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                Shared Matches
              </h1>
              <p className="text-gray-600">
                {sessionIds.length} {sessionIds.length === 1 ? "session" : "sessions"} with matches
              </p>
            </div>

            {sessionIds.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {sessionIds.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No matches yet"
            description='Start a "Swipe Together" session to find matches with friends!'
            buttonText="Start Swiping"
            buttonLink="/filter"
            onButtonClick={() => navigate("/filter")}
          />
        ) : (
          <div className="space-y-8">
            {sessionIds.map((sessionId) => {
              const sessionData = sessionMatches[sessionId];
              const date = new Date(sessionData.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              return (
                <div key={sessionId} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {date}
                      </h3>
                      <p className="text-sm font-semibold text-orange-600 mt-1">
                        {sessionData.matches.length} {sessionData.matches.length === 1 ? "match" : "matches"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleClearSession(sessionId)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium underline"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessionData.matches.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {recipe.image && (
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-32 object-cover cursor-pointer"
                            onClick={() => navigate(`/recipe/${recipe.id}`)}
                          />
                        )}
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2">
                            {recipe.title}
                          </h4>
                          {recipe.diets && recipe.diets.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {recipe.diets.slice(0, 2).map((diet) => (
                                <span
                                  key={diet}
                                  className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700"
                                >
                                  {diet}
                                </span>
                              ))}
                            </div>
                          )}
                          <button
                            onClick={() => navigate(`/recipe/${recipe.id}`)}
                            className="w-full py-1.5 px-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-xs"
                          >
                            View Recipe
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
