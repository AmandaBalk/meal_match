import { Link } from "react-router";

export function Header() {
  return (
    <header className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.png" alt="MealMatch" className="w-24 h-24 md:w-32 md:h-32" />
          </Link>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/matches"
              className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-2 rounded-xl text-xs font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-sm whitespace-nowrap"
            >
              <span>🍽️</span>
              <span className="hidden min-[370px]:inline">My Matches</span>
            </Link>
            <Link
              to="/multiplayer-matches"
              className="flex items-center gap-1 border-2 border-orange-500 text-orange-600 bg-white px-2 py-2 rounded-xl text-xs font-medium hover:bg-orange-50 transition-all shadow-sm whitespace-nowrap"
            >
              <span>👥</span>
              <span className="hidden min-[370px]:inline">Shared Matches</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}