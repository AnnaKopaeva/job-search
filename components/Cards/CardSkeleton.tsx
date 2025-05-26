export default function CardSkeleton() {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-64 p-4 bg-white shadow rounded-md flex flex-col justify-between animate-pulse"
        >
          <div>
            <div className="flex items-center space-x-4 mb-4 gap-2">
              <div className="h-12 w-12 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4 gap-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
