import { Link } from "react-router";

export const LandingPage = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 px-6">
      <div className="max-w-3xl text-center">
 
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          MealMatch
        </h1>

        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">What to eat tonight?</h2>

        <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed">
          Swipe through meal ideas and match with your favorites. 
          <br />
          Try solo or create a session to swipe with someone!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            to="/single"
            aria-label="Start single mode"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 sm:flex-1 sm:max-w-[200px]"
          >
            Swipe Solo
          </Link>

          <Link
            to="/multi"
            aria-label="Start multiplayer mode"
            className="border-2 border-orange-500 text-orange-600 bg-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 sm:flex-1 sm:max-w-[200px]"
          >
            Swipe Together
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            🥗 Vegetarian
          </span>
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium">
            🥩 Meat
          </span>
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            🌱 Vegan
          </span>
        </div>
      </div>
    </section>
  );
};
