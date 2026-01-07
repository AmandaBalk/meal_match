import { Recipe } from "./MealCard";

type Props = {
  recipe: Recipe;
  onLike: (r: Recipe) => void;
  onDislike: (r: Recipe) => void;
};

export const SwipeButtons = ({ recipe, onLike, onDislike }: Props) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <button
        onClick={() => onDislike(recipe)}
        aria-label={`Dislike ${recipe.title}`}
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all font-medium text-gray-700"
      >
        <span className="text-xl" aria-hidden>❌</span>
        <span className="text-sm">Yuck!</span>
      </button>

      <button
        onClick={() => onLike(recipe)}
        aria-label={`Like ${recipe.title}`}
        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 active:from-orange-700 active:to-red-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 transition-all font-medium shadow-md"
      >
        <span className="text-xl" aria-hidden>🍽️</span>
        <span className="text-sm">Yum!</span>
      </button>
    </div>
  );
};
