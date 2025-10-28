'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
              ProductCatalog
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${isActive('/')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${isActive('/products')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Products
            </Link>
            <Link
              href="/wishlist"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${isActive('/wishlist')
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Wishlist
            </Link>
          </nav>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="hidden sm:inline text-sm font-medium text-gray-700 truncate max-w-[100px] md:max-w-[150px]">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md whitespace-nowrap"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        <nav className="md:hidden pb-3 flex space-x-4 overflow-x-auto">
          <Link
            href="/"
            className={`text-sm font-medium whitespace-nowrap ${isActive('/') ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium whitespace-nowrap ${isActive('/products') ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            Products
          </Link>
          <Link
            href="/wishlist"
            className={`text-sm font-medium whitespace-nowrap ${isActive('/wishlist') ? 'text-blue-600' : 'text-gray-500'
              }`}
          >
            Wishlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
