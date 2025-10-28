// Client Component for Add to Wishlist functionality
// Uses useOptimistic for immediate UI feedback
'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface AddToWishlistButtonProps {
  productId: string;
  isAuthenticated: boolean;
  initialIsInWishlist?: boolean;
}

export default function AddToWishlistButton({
  productId,
  isAuthenticated,
  initialIsInWishlist = false
}: AddToWishlistButtonProps) {
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isPending, startTransition] = useTransition();
  const [optimisticInWishlist, setOptimisticInWishlist] = useOptimistic(
    isInWishlist,
    (state, newState: boolean) => newState
  );

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    // Optimistic update - toggle the state immediately
    const newState = !optimisticInWishlist;
    startTransition(() => {
      setOptimisticInWishlist(newState);
    });

    try {
      const response = await fetch('/api/wishlist', {
        method: newState ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsInWishlist(newState);
      } else {
        // Revert optimistic update on error
        setOptimisticInWishlist(!newState);
        alert(data.error || `Failed to ${newState ? 'add to' : 'remove from'} wishlist`);
      }
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticInWishlist(!newState);
      console.error('Error updating wishlist:', error);
      alert(`Failed to ${newState ? 'add to' : 'remove from'} wishlist. Please try again.`);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isPending}
      className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
        optimisticInWishlist
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {isPending ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {optimisticInWishlist ? 'Removing...' : 'Adding...'}
        </span>
      ) : optimisticInWishlist ? (
        'Remove from Wishlist'
      ) : (
        'Add to Wishlist'
      )}
    </button>
  );
}
