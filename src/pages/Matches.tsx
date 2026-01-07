import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Recipe } from "../components/MealCard";
import { RecipeCard } from "../components/RecipeCard";
import { EmptyState } from "../components/EmptyState";

export const Matches = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [displayCount, setDisplayCount] = useState(15);

  useEffect(() => {
    const saved = localStorage.getItem("mm_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (id: number | string) => {
    const updated = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updated);
    localStorage.setItem("mm_favorites", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all your matches?")) {
      setFavorites([]);
      localStorage.removeItem("mm_favorites");
    }
  };

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
                Your Matches
              </h1>
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"} you loved
              </p>
            </div>

            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon="🍽️"
            title="No matches yet"
            description="Start swiping to find recipes you love!"
            buttonText="Start Swiping"
            buttonLink="/filter"
            onButtonClick={() => navigate("/filter")}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.slice(0, displayCount).map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onRemove={handleRemove}
                  showRemoveButton={true}
                />
              ))}
            </div>

          {displayCount < favorites.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setDisplayCount(prev => prev + 15)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
              >
                Show More ({favorites.length - displayCount} remaining)
              </button>
            </div>
          )}
        </>
        )}
      </div>
    </div>
  );
};