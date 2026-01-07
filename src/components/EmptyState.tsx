type Props = {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  onButtonClick?: () => void;
};

export const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
  onButtonClick,
}: Props) => {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.location.href = buttonLink;
    }
  };

  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <button
        onClick={handleClick}
        className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
      >
        {buttonText}
      </button>
    </div>
  );
};
