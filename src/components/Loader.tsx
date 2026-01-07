export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
}
