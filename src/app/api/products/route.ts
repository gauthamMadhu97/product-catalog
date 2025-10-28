import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';
import { PaginatedResponse, Product } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');

    let filteredProducts = category
      ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
      : products;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / limit);

    const response: PaginatedResponse<Product> = {
      data: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: filteredProducts.length,
        itemsPerPage: limit
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
