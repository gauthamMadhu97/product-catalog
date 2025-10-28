'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { removeFromWishlist } from '@/lib/actions';
import { Product } from '@/types';

interface WishlistItemProps {
  product: Product & { addedAt: Date };
  userId: string;
}

export default function WishlistItem({ product }: WishlistItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = async (formData: FormData) => {
    startTransition(async () => {
      const result = await removeFromWishlist(formData);
      if (result.error) {
        alert(result.error);
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Link
            href={`/products/${product.id}`}
            className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>

          <form action={handleRemove}>
            <input type="hidden" name="productId" value={product.id} />
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Removing...' : 'Remove from Wishlist'}
            </button>
          </form>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Added {new Date(product.addedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
