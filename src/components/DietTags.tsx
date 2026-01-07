type Props = {
  diets: string[];
  maxDisplay?: number;
};

export const DietTags = ({ diets, maxDisplay = 3 }: Props) => {
  if (!diets || diets.length === 0) {
    return <span className="text-xs text-gray-500">No diet label</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {diets.slice(0, maxDisplay).map((diet) => (
        <span
          key={diet}
          className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700"
        >
          <span aria-hidden>
            {diet.toLowerCase().includes("veg") ? "🌱" : "🍽️"}
          </span>
          <span>{diet}</span>
        </span>
      ))}
    </div>
  );
};
