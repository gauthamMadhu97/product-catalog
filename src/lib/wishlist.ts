import { WishlistItem } from '@/types';
import fs from 'fs';
import path from 'path';

const WISHLIST_FILE = path.join(process.cwd(), 'data', 'wishlist.json');

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readWishlist(): WishlistItem[] {
  ensureDataDir();

  if (!fs.existsSync(WISHLIST_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(WISHLIST_FILE, 'utf-8');
    const items = JSON.parse(data);
    // Convert date strings back to Date objects
    return items.map((item: any) => ({
      ...item,
      addedAt: new Date(item.addedAt)
    }));
  } catch (error) {
    console.error('Error reading wishlist:', error);
    return [];
  }
}

function writeWishlist(items: WishlistItem[]) {
  ensureDataDir();

  try {
    fs.writeFileSync(WISHLIST_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing wishlist:', error);
  }
}

export const wishlistService = {
  getWishlistByUserId(userId: string): WishlistItem[] {
    const allItems = readWishlist();
    return allItems.filter(item => item.userId === userId);
  },

  addToWishlist(userId: string, productId: string): WishlistItem {
    const allItems = readWishlist();

    const existing = allItems.find(
      item => item.userId === userId && item.productId === productId
    );

    if (existing) {
      return existing;
    }

    const newItem: WishlistItem = {
      userId,
      productId,
      addedAt: new Date()
    };

    allItems.push(newItem);
    writeWishlist(allItems);

    return newItem;
  },

  removeFromWishlist(userId: string, productId: string): boolean {
    const allItems = readWishlist();
    const index = allItems.findIndex(
      item => item.userId === userId && item.productId === productId
    );

    if (index > -1) {
      allItems.splice(index, 1);
      writeWishlist(allItems);
      return true;
    }

    return false;
  },

  isInWishlist(userId: string, productId: string): boolean {
    const allItems = readWishlist();
    return allItems.some(
      item => item.userId === userId && item.productId === productId
    );
  },

  getAllItems(): WishlistItem[] {
    return readWishlist();
  }
};
