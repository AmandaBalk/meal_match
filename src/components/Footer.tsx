export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-2 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
        <div className="text-gray-600">
          © {new Date().getFullYear()} MealMatch
        </div>
        <div className="flex gap-4 text-gray-600">
          <a href="#" className="hover:text-orange-600 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-orange-600 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}