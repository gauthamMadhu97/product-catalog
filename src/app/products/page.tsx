import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import Pagination from '@/components/Pagination';

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const category = params.category;
  const itemsPerPage = 6;

  const filteredProducts = category
    ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="bg-gray-50 min-h-screen py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Browse our collection of {filteredProducts.length} amazing products
          </p>
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8 flex flex-wrap gap-2">
          <a
            href="/products"
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${!category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            All Products
          </a>
          {categories.map(cat => (
            <a
              key={cat}
              href={`/products?category=${cat.toLowerCase()}`}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition-colors ${category?.toLowerCase() === cat.toLowerCase()
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {cat}
            </a>
          ))}
        </div>

        <Suspense fallback={<ProductsLoading />}>
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-500 text-base sm:text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </Suspense>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            category={category}
          />
        )}
      </div>
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden h-80 sm:h-96 animate-pulse"
        >
          <div className="h-40 sm:h-48 bg-gray-200"></div>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
            <div className="h-5 sm:h-6 bg-gray-200 rounded"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
