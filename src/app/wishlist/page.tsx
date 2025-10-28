// Wishlist Page - Protected Route (Server Component)
// Displays user's wishlist items with Server Actions for removal

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { wishlistService } from '@/lib/services';
import WishlistItem from '@/components/WishlistItem';

export default async function WishlistPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/auth/signin');
  }

  // Get user's wishlist with full product details from database
  const wishlistProducts = wishlistService.getWithProducts(session.user.id!);

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {wishlistProducts.length > 0
              ? `You have ${wishlistProducts.length} item${wishlistProducts.length !== 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'}
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wishlistProducts.map(product => (
              <WishlistItem
                key={product.id}
                product={product}
                userId={session.user.id!}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Start adding products you love to your wishlist!
            </p>
            <a
              href="/products"
              className="inline-block bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
