import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

type RecipeDetails = {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  diets?: string[];
  instructions?: string;
  extendedIngredients?: Array<{
    id: number;
    original: string;
  }>;
};

export const MealInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        const apiKey = import.meta.env.VITE_API_KEY;
        
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🍽️</div>
          <p className="text-xl font-semibold text-gray-700">
            Loading recipe details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Recipe not found
          </h2>
          <p className="text-gray-600 mb-6">{error || "Could not load recipe"}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              {recipe.readyInMinutes && (
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                  <span className="text-xl">⏱️</span>
                  <span className="font-medium text-gray-700">
                    {recipe.readyInMinutes} min
                  </span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                  <span className="text-xl">🍽️</span>
                  <span className="font-medium text-gray-700">
                    {recipe.servings} servings
                  </span>
                </div>
              )}
            </div>

            {recipe.diets && recipe.diets.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.diets.map((diet) => (
                  <span
                    key={diet}
                    className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200"
                  >
                    <span>🌱</span>
                    {diet}
                  </span>
                ))}
              </div>
            )}

            {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.extendedIngredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{ingredient.original}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.instructions && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Instructions
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {recipe.instructions}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
