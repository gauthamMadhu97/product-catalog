// API Route: POST /api/wishlist
// Adds a product to the user's wishlist

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { wishlistService } from '@/lib/wishlist';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Add to wishlist
    const wishlistItem = wishlistService.add(
      session.user.id!,
      productId
    );

    return NextResponse.json({
      success: true,
      message: 'Product added to wishlist',
      data: wishlistItem
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    // Get user's wishlist
    const wishlistItems = wishlistService.getByUserId(session.user.id!);

    return NextResponse.json({
      success: true,
      data: wishlistItems
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Remove from wishlist
    const removed = wishlistService.remove(
      session.user.id!,
      productId
    );

    if (!removed) {
      return NextResponse.json(
        { error: 'Product not found in wishlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
