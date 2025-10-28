// TypeScript types for the Product Catalog application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
}

export interface WishlistItem {
  userId: string;
  productId: string;
  addedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
