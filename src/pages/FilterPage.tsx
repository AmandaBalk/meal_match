import { useState } from "react";
import { Link } from "react-router";
import { DietFilterButtons } from "../components/DietFilterButtons";

export const FilterPage = () => {
  const [diet, setDiet] = useState<string>("");

  return (
    <section className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 px-6">
      <div className="max-w-2xl w-full text-center">

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          Choose your diet
        </h1>

        <p className="text-gray-700 text-lg mb-10 leading-relaxed">
          Select your dietary preference to get personalized meal suggestions
        </p>

        <div className="mb-10">
          <DietFilterButtons
            options={[
              { value: "vegetarian", label: "Vegetarian", emoji: "🥗" },
              { value: "vegan", label: "Vegan", emoji: "🌱" },
              { value: "meat", label: "Meat", emoji: "🥩" },
              { value: "none", label: "No preference", emoji: "🍽️" }
            ]}
            selectedDiet={diet}
            onSelect={setDiet}
          />
        </div>

        {diet && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Choose your mode
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link
                to={`/swipe?diet=${diet}&mode=solo`}
                aria-label="Start solo swipe"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex-1"
              >
                Swipe Solo
              </Link>

              <Link
                to={`/multiplayer?diet=${diet}&mode=multi`}
                aria-label="Start multiplayer swipe"
                className="border-2 border-orange-500 text-orange-600 bg-white px-8 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 flex-1"
              >
                Swipe Together
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link 
            to="/" 
            className="text-orange-600 hover:text-orange-700 font-medium underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};
