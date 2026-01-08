import { useRef } from "react";
import { useNavigate } from "react-router";
import { SwipeButtons } from "./SwipeButtons";
import { DietTags } from "./DietTags";

export type Recipe = {
  id: number | string;
  title: string;
  image?: string;
  diets?: string[]; 
};

type Props = {
  recipe: Recipe;
  onLike: (r: Recipe) => void;
  onDislike: (r: Recipe) => void;
};

export const MealCard = ({
  recipe,
  onLike,
  onDislike,
}: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/recipe/${recipe.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      onLike(recipe);
    } else if (e.key === "ArrowLeft") {
      onDislike(recipe);
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/recipe/${recipe.id}`);
    }
  };

  return (
    <div
      ref={cardRef}
      role="article"
      aria-label={`Meal card: ${recipe.title}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleCardClick}
      className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-200 transition transform hover:-translate-y-1 cursor-pointer"
    >
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-48 object-cover"
        />
      ) : (
        <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-400">
          No image
        </div>
      )}

      <div className="p-6 md:p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-800">{recipe.title}</h3>
        </div>

        <div className="mt-2" aria-label="Diet information">
          <DietTags diets={recipe.diets || []} />
        </div>

        <div className="mt-3">
          <SwipeButtons 
            recipe={recipe} 
            onLike={onLike} 
            onDislike={onDislike}
          />
        </div>
      </div>
    </div>
  );
};
