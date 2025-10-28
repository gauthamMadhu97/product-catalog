// Product data from database
// This file provides helper functions to fetch products from the database
// DO NOT export static data - always fetch dynamically to ensure database connection works

import { Product } from '@/types';
import { productService } from './services';

// Helper function to get all products - use this instead of importing a static array
export function getProducts(): Product[] {
  return productService.getAll();
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return productService.getByCategory(category);
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return productService.getById(id);
}

// Get unique categories
export function getCategories(): string[] {
  const products = getProducts();
  return Array.from(new Set(products.map(p => p.category)));
}
