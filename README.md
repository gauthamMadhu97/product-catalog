Product Catalog - Next.js 15 Application

SETUP INSTRUCTIONS

1. Install dependencies:
   npm install

2. Set up environment variables:
   Currently set and shared along for zip

3. Run development server:
   npm run dev

4. Open browser:
   http://localhost:3000

5. Test authentication:
   Email: test@example.com
   Password: password123


REQUIREMENTS IMPLEMENTATION

Project Setup
- Next.js 15.1.3 with TypeScript and ESLint
- App Router structure

Routing & Layout
- / - Home page with welcome message and navigation
- /products - Product listing page
- /products/[id] - Dynamic product detail page
- /wishlist - Protected wishlist page
- Shared layout with Header and Footer
- Active navigation highlighting

Server & Client Components
- Server Components: Home, Product Listing, Product Detail pages
- Client Component: AddToWishlistButton with local state

API Routes
- GET /api/products - List all products with pagination
- GET /api/products/[id] - Get product details
- POST /api/wishlist - Add to wishlist
- GET /api/wishlist - Get user wishlist
- DELETE /api/wishlist - Remove from wishlist

Data Fetching & Server Actions
- Server-side data fetching for all pages
- loading.tsx implemented for Products and Product Detail pages
- error.tsx implemented for error handling
- Server Actions for wishlist operations in src/lib/actions.ts

Authentication
- NextAuth.js v5 integration
- Protected routes with middleware
- Sign-in and sign-out functionality
- User profile display in header
- Demo credentials and GitHub OAuth support

Best Practices
- Environment variables in .env.local
- Organized folder structure following Next.js conventions
- TypeScript types defined
- Clean code organization

Bonus Features
- Pagination on product listing
- useOptimistic for instant UI updates
- useTransition for loading states
- Responsive design with Tailwind CSS 4
- Category filtering
- 12 products across 4 categories


TECHNOLOGY STACK

Next.js 15.1.3
React 18.3.1
TypeScript 5
Tailwind CSS 4
NextAuth.js v5
