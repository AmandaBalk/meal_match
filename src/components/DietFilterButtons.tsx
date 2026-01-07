type DietOption = {
  value: string;
  label: string;
  emoji: string;
};

type Props = {
  options: DietOption[];
  selectedDiet: string;
  onSelect: (diet: string) => void;
};

export const DietFilterButtons = ({ options, selectedDiet, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`py-4 px-4 rounded-2xl border-2 font-semibold transition-all transform hover:-translate-y-1 shadow-md
            ${
              selectedDiet === option.value
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
            }`}
        >
          <div className="text-3xl mb-2">{option.emoji}</div>
          <div className="text-sm">{option.label}</div>
        </button>
      ))}
    </div>
  );
};
