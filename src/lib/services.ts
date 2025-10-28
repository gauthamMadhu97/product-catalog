// Database services for users, products, and wishlist
import db from './db';
import { Product, WishlistItem } from '@/types';
import crypto from 'crypto';

// ============= USER SERVICES =============

export const userService = {
  // Get user by email
  getByEmail(email: string) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as any;
  },

  // Get user by ID
  getById(id: string) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as any;
  },

  // Create new user
  create(email: string, password: string, name: string, provider = 'credentials') {
    const id = crypto.randomUUID();
    const image = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

    const stmt = db.prepare(`
      INSERT INTO users (id, email, password, name, image, provider)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, email, password, name, image, provider);
    return this.getById(id);
  },

  // Create OAuth user (no password)
  createOAuthUser(id: string, email: string, name: string, image: string, provider: string) {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (id, email, name, image, provider)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(id, email, name, image, provider);
    return this.getById(id);
  },

  // Verify credentials
  verify(email: string, password: string) {
    const user = this.getByEmail(email);
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
};

// ============= PRODUCT SERVICES =============

export const productService = {
  // Get all products
  getAll(): Product[] {
    const stmt = db.prepare('SELECT * FROM products ORDER BY created_at DESC');
    return stmt.all() as Product[];
  },

  // Get product by ID
  getById(id: string): Product | undefined {
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    return stmt.get(id) as Product | undefined;
  },

  // Get products by category
  getByCategory(category: string): Product[] {
    const stmt = db.prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC');
    return stmt.all(category) as Product[];
  },

  // Get paginated products
  getPaginated(page: number, limit: number, category?: string) {
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as count FROM products';
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = ?';
      countQuery += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const products = db.prepare(query).all(...params) as Product[];
    const { count } = db.prepare(countQuery).get(category || []) as { count: number };

    return {
      products,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    };
  },

  // Create product
  create(product: Omit<Product, 'id' | 'created_at'>) {
    const id = crypto.randomUUID();

    const stmt = db.prepare(`
      INSERT INTO products (id, name, description, price, category, image, stock, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.image,
      product.stock || 0,
      product.rating || 0
    );

    return this.getById(id);
  },

  // Search products
  search(query: string): Product[] {
    const searchPattern = `%${query}%`;
    const stmt = db.prepare(`
      SELECT * FROM products
      WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
      ORDER BY created_at DESC
    `);
    return stmt.all(searchPattern, searchPattern, searchPattern) as Product[];
  }
};

// ============= WISHLIST SERVICES =============

export const wishlistService = {
  // Get all wishlist items for a user
  getByUserId(userId: string): WishlistItem[] {
    const stmt = db.prepare(`
      SELECT user_id as userId, product_id as productId, added_at as addedAt
      FROM wishlist
      WHERE user_id = ?
      ORDER BY added_at DESC
    `);

    const items = stmt.all(userId) as any[];
    return items.map(item => ({
      userId: item.userId,
      productId: item.productId,
      addedAt: new Date(item.addedAt)
    }));
  },

  // Add item to wishlist
  add(userId: string, productId: string): WishlistItem {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO wishlist (user_id, product_id)
      VALUES (?, ?)
    `);

    stmt.run(userId, productId);

    return {
      userId,
      productId,
      addedAt: new Date()
    };
  },

  // Remove item from wishlist
  remove(userId: string, productId: string): boolean {
    const stmt = db.prepare(`
      DELETE FROM wishlist
      WHERE user_id = ? AND product_id = ?
    `);

    const result = stmt.run(userId, productId);
    return result.changes > 0;
  },

  // Check if item is in wishlist
  isInWishlist(userId: string, productId: string): boolean {
    const stmt = db.prepare(`
      SELECT COUNT(*) as count
      FROM wishlist
      WHERE user_id = ? AND product_id = ?
    `);

    const { count } = stmt.get(userId, productId) as { count: number };
    return count > 0;
  },

  // Get wishlist with product details
  getWithProducts(userId: string) {
    const stmt = db.prepare(`
      SELECT
        w.user_id as userId,
        w.product_id as productId,
        w.added_at as addedAt,
        p.name,
        p.description,
        p.price,
        p.image,
        p.category,
        p.stock,
        p.rating
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = ?
      ORDER BY w.added_at DESC
    `);

    return stmt.all(userId);
  }
};
