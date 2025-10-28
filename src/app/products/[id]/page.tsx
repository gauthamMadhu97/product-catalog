// Product Detail Page - Server Component with Client Component for wishlist
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import AddToWishlistButton from '@/components/AddToWishlistButton';
import { auth } from '@/auth';
import { wishlistService } from '@/lib/wishlist';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const session = await auth();

  // Check if product is already in wishlist
  const isInWishlist = session?.user?.id
    ? wishlistService.isInWishlist(session.user.id, product.id)
    : false;

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 lg:mb-8 overflow-x-auto">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm whitespace-nowrap">
            <li>
              <a href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="/products" className="text-blue-600 hover:text-blue-800">
                Products
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate max-w-[150px] sm:max-w-none">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
            {/* Product Image */}
            <div className="relative h-64 sm:h-80 lg:h-full bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.stock < 20 && (
                <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded">
                  Only {product.stock} left!
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mb-3 sm:mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-base sm:text-lg font-semibold text-gray-700">
                    {product.rating}
                  </span>
                </div>
                <span className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-500">
                  ({product.stock} in stock)
                </span>
              </div>

              <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Free shipping on orders over $50
                </p>
              </div>

              {/* Add to Wishlist Button - Client Component */}
              <div>
                <AddToWishlistButton
                  productId={product.id}
                  isAuthenticated={!!session}
                  initialIsInWishlist={isInWishlist}
                />
              </div>

              {/* Product Features */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Product Features
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    High quality materials
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    1 year warranty
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    30-day return policy
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Fast & secure shipping
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
