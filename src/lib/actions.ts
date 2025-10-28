'use server';

import { revalidatePath } from 'next/cache';
import { wishlistService } from './wishlist';
import { auth } from '@/auth';

export async function removeFromWishlist(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: 'Unauthorized. Please sign in.'
    };
  }

  const productId = formData.get('productId') as string;

  if (!productId) {
    return {
      error: 'Product ID is required'
    };
  }

  try {
    const removed = wishlistService.removeFromWishlist(
      session.user.id!,
      productId
    );

    if (!removed) {
      return {
        error: 'Product not found in wishlist'
      };
    }

    revalidatePath('/wishlist');

    return {
      success: true,
      message: 'Product removed from wishlist'
    };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return {
      error: 'Failed to remove from wishlist'
    };
  }
}

export async function addToWishlistAction(formData: FormData) {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: 'Unauthorized. Please sign in.'
    };
  }

  const productId = formData.get('productId') as string;

  if (!productId) {
    return {
      error: 'Product ID is required'
    };
  }

  try {
    const wishlistItem = wishlistService.addToWishlist(
      session.user.id!,
      productId
    );

    revalidatePath('/wishlist');
    revalidatePath(`/products/${productId}`);

    return {
      success: true,
      message: 'Product added to wishlist',
      data: wishlistItem
    };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return {
      error: 'Failed to add to wishlist'
    };
  }
}
