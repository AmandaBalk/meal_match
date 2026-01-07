import { useState } from "react";
import { MealCard, Recipe } from "../components/MealCard";

export const SingleMode = ({ recipes }: { recipes: Recipe[] }) => {
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState<Recipe[]>(
    () => JSON.parse(localStorage.getItem("mm_favorites") || "[]")
  );

  const handleLike = (r: Recipe) => {
    const newFavs = [...favorites, r];
    setFavorites(newFavs);
    localStorage.setItem("mm_favorites", JSON.stringify(newFavs));
    setIndex((prev) => prev + 1);
  };

  const handleDislike = () => {
    setIndex((prev) => prev + 1);
  };

  if (index >= recipes.length) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            No more recipes! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            You've swiped through all available meals.
          </p>
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

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-4 overflow-y-auto">
      <div className="flex-shrink-0 mb-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          Solo Swipe Mode
        </h1>
        <p className="text-gray-600">
          {index + 1} / {recipes.length} meal ideas
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 w-full">
        <MealCard
          recipe={recipes[index]}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </div>

      <div className="flex-shrink-0 mt-3 text-sm text-gray-500 text-center">
        <p>Or use arrow keys: ← Dislike • → Like</p>
      </div>
    </div>
  );
};
