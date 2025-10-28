export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 md:h-full bg-gray-200 animate-pulse"></div>

            <div className="p-8 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-16 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
