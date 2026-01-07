import { Link } from "react-router";

export const LandingPage = () => {
  return (
    <section className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 px-6">
      <div className="max-w-3xl text-center">

        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">What's for dinner?</h2>

        <p className="text-gray-700 text-xl md:text-2xl mb-6 leading-relaxed">
          Swipe through meal ideas and match with your favorites.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Link
            to="/filter"
            aria-label="set filters"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 sm:flex-1 sm:max-w-[200px]"
          >
            Start Swiping
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 justify-center text-xs">
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
            🥗 Vegetarian
          </span>
          <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-medium">
            🥩 Meat
          </span>
          <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
            🌱 Vegan
          </span>
        </div>
      </div>
    </section>
  );
};
