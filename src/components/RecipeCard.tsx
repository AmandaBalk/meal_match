import { useNavigate } from "react-router";
import { Recipe } from "./MealCard";

type Props = {
  recipe: Recipe;
  onRemove?: (id: number | string) => void;
  showRemoveButton?: boolean;
};

export const RecipeCard = ({ recipe, onRemove, showRemoveButton = false }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-orange-600"
          onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
          {recipe.title}
        </h3>

        {recipe.diets && recipe.diets.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.diets.slice(0, 2).map((diet) => (
              <span
                key={diet}
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700"
              >
                <span>🌱</span>
                {diet}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            className="flex-1 py-2 px-4 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-sm"
          >
            View Recipe
          </button>
          {showRemoveButton && onRemove && (
            <button
              onClick={() => onRemove(recipe.id)}
              className="py-2 px-4 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm"
              aria-label="Remove from matches"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
