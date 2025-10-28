# Product Catalog - Next.js 15 Application

A modern, full-featured product catalog web application built with Next.js 15, demonstrating advanced features including Server and Client Components, API Routes, Authentication, and Server Actions.

## Features Overview

- **12+ Products** across 4 categories (Electronics, Fashion, Sports, Home)
- **User Authentication** with NextAuth.js (demo mode)
- **Wishlist Functionality** with optimistic updates
- **Pagination** on product listing
- **Responsive Design** with Tailwind CSS
- **Server & Client Components** following Next.js 15 best practices
- **Protected Routes** with middleware
- **Server Actions** for data mutations

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Authentication:** NextAuth.js v5 (Auth.js)
- **State Management:** React Hooks (useState, useOptimistic, useTransition)
- **Code Quality:** ESLint

## Project Structure

```
product-catalog/
├── src/
│   ├── app/                          # App Router pages
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   │   ├── products/             # Product API endpoints
│   │   │   └── wishlist/             # Wishlist API endpoints
│   │   ├── auth/                     # Authentication pages
│   │   │   └── signin/               # Sign-in page
│   │   ├── products/                 # Product pages
│   │   │   ├── [id]/                 # Dynamic product detail
│   │   │   ├── loading.tsx           # Loading UI
│   │   │   ├── error.tsx             # Error UI
│   │   │   └── page.tsx              # Product listing
│   │   ├── wishlist/                 # Wishlist page (protected)
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   ├── components/                   # Reusable components
│   │   ├── AddToWishlistButton.tsx   # Client component with useOptimistic
│   │   ├── Footer.tsx                # Footer component
│   │   ├── Header.tsx                # Header with navigation
│   │   ├── Pagination.tsx            # Pagination component
│   │   ├── ProductCard.tsx           # Product card component
│   │   └── WishlistItem.tsx          # Wishlist item with Server Action
│   ├── lib/                          # Utility functions
│   │   ├── actions.ts                # Server Actions
│   │   ├── data.ts                   # Mock product data
│   │   └── wishlist.ts               # Wishlist service (in-memory)
│   ├── types/                        # TypeScript types
│   │   ├── index.ts                  # Application types
│   │   └── next-auth.d.ts            # NextAuth type extensions
│   ├── auth.ts                       # NextAuth configuration
│   └── middleware.ts                 # Route protection middleware
├── .env.local                        # Environment variables
├── .env.example                      # Environment variables template
└── package.json                      # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation Steps

1. **Clone or extract the project:**
   ```bash
   cd product-catalog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   The `.env.local` file should already exist with default values. For production, update these values:

   ```bash
   NEXTAUTH_SECRET=your-secret-key-replace-this-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```

   To generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Authentication Setup

The application uses **NextAuth.js v5 (Auth.js)** for authentication.

**For Testing (Current Setup):**
- Email: `test@example.com`
- Password: `password123`

**For Production:**
See [SETUP_AUTH.md](./SETUP_AUTH.md) for complete setup instructions including:
- Database authentication (with Prisma + bcrypt)
- OAuth authentication (Google, GitHub)
- Hybrid approach (both database + OAuth)

The current test user is temporary and should be replaced before deployment.

## Feature Mapping to Requirements

### ✅ Project Setup
- [x] Next.js 15 initialized with TypeScript and ESLint
- [x] App Router structure implemented
- [x] Proper folder organization

### ✅ Routing & Layout
- [x] **/** - Home page with welcome message and navigation (`src/app/page.tsx`)
- [x] **/products** - Product listing page (`src/app/products/page.tsx`)
- [x] **/products/[id]** - Dynamic product detail page (`src/app/products/[id]/page.tsx`)
- [x] **/wishlist** - Protected wishlist page (`src/app/wishlist/page.tsx`)
- [x] Shared layout with Header and Footer (`src/app/layout.tsx`)
- [x] Active navigation highlighting (`src/components/Header.tsx`)

### ✅ Server & Client Components
- [x] Server Components for Home and Product Listing pages
- [x] Client Component for "Add to Wishlist" with local state (`src/components/AddToWishlistButton.tsx`)
- [x] Proper use of 'use client' directive

### ✅ API Routes
- [x] **GET /api/products** - List all products with pagination (`src/app/api/products/route.ts`)
- [x] **GET /api/products/[id]** - Get product details (`src/app/api/products/[id]/route.ts`)
- [x] **POST /api/wishlist** - Add product to wishlist (`src/app/api/wishlist/route.ts`)
- [x] **GET /api/wishlist** - Get user's wishlist
- [x] **DELETE /api/wishlist** - Remove from wishlist

### ✅ Data Fetching & Server Actions
- [x] Server-side data fetching for listing and detail pages
- [x] `loading.tsx` for Products and Product Detail pages
- [x] `error.tsx` for error handling
- [x] `not-found.tsx` for 404 handling
- [x] Server Actions for wishlist operations (`src/lib/actions.ts`)
- [x] Form submissions using Server Actions

### ✅ Authentication
- [x] NextAuth.js v5 integration (`src/auth.ts`)
- [x] Credentials provider (demo mode)
- [x] Protected routes with middleware (`src/middleware.ts`)
- [x] Sign-in page (`src/app/auth/signin/page.tsx`)
- [x] Sign-out functionality
- [x] User profile display in header

### ✅ Best Practices
- [x] Environment variables in `.env.local`
- [x] TypeScript types defined (`src/types/index.ts`)
- [x] Well-organized file structure
- [x] Code comments and documentation
- [x] Proper error handling

### ✅ Bonus Features
- [x] **Pagination** on product listing page (`src/components/Pagination.tsx`)
- [x] **useOptimistic** for wishlist updates (`src/components/AddToWishlistButton.tsx`)
- [x] **useTransition** for loading states
- [x] **Responsive design** with Tailwind CSS
- [x] Category filtering on products page
- [x] Product ratings and stock indicators
- [x] Mock data service (`src/lib/data.ts`)

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Key Implementation Highlights

### 1. Server vs Client Components
- **Server Components:** Used by default for better performance (Home, Products, Wishlist pages)
- **Client Components:** Only where needed for interactivity (AddToWishlistButton, Header, Pagination)

### 2. Optimistic Updates
The `AddToWishlistButton` component uses `useOptimistic` hook to provide instant feedback:
```typescript
const [optimisticInWishlist, setOptimisticInWishlist] = useOptimistic(
  isInWishlist,
  (state, newState: boolean) => newState
);
```

### 3. Server Actions
Wishlist operations use Server Actions for secure, server-side mutations:
```typescript
// src/lib/actions.ts
'use server';
export async function removeFromWishlist(formData: FormData) {
  // Server-side logic with revalidation
}
```

### 4. Middleware Protection
Protected routes are secured using Next.js middleware:
```typescript
// src/middleware.ts
export default auth((req) => {
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/wishlist');
  if (isProtectedRoute && !req.auth) {
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
  }
});
```

### 5. Pagination
Products page supports pagination with URL parameters:
```typescript
// /products?page=2&category=electronics
```

## Data Storage

**Note:** This application uses **in-memory storage** for wishlist data. In a production environment, you would:
- Replace with a real database (PostgreSQL, MongoDB, etc.)
- Use an ORM like Prisma or Drizzle
- Implement proper data persistence
- Add database migrations

## Future Enhancements

Potential improvements for production:
- [ ] Real database integration
- [ ] Product search functionality
- [ ] Shopping cart implementation
- [ ] Order processing
- [ ] User profile management
- [ ] Product reviews and comments
- [ ] Image upload for products
- [ ] Advanced filtering (price range, ratings)
- [ ] Social authentication (Google, GitHub)
- [ ] Email notifications
- [ ] Analytics integration

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### TypeScript errors
If you encounter TypeScript errors, try:
```bash
npm run build
```

### NextAuth errors
Ensure your `.env.local` file has the correct values and restart the dev server.

## License

This project is a demonstration application created for educational purposes.

## Contact

For questions or feedback about this implementation, please refer to the project documentation or create an issue in the repository.

---

**Built with Next.js 15, TypeScript, Tailwind CSS, and NextAuth.js**
