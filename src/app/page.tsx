// Home Page - Server Component
// Displays welcome message and navigation to main sections

import Link from 'next/link';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Welcome to Product Catalog
          </h1>

          {!session && (
            <div className="mb-6 sm:mb-8">
              <Link
                href="/auth/signin"
                className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Sign In to Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Browse Products</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Explore our extensive catalog with products across multiple categories.
            </p>
            <Link
              href="/products"
              className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium"
            >
              View Products →
            </Link>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Save Favorites</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Create your personal wishlist to keep track of products you love.
            </p>
            <Link
              href="/wishlist"
              className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium"
            >
              View Wishlist →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
