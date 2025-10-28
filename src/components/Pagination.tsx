'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (category) {
      params.set('category', category);
    }
    return `/products?${params.toString()}`;
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
        >
          Previous
        </Link>
      )}

      <div className="flex space-x-1">
        {pages.map(page => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`px-4 py-2 rounded-lg font-medium ${page === currentPage
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
        >
          Next
        </Link>
      )}
    </div>
  );
}
