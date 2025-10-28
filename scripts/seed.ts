// Seed script to populate database with initial data
// Run with: npm run seed

import { userService, productService } from '../src/lib/services';

console.log('🌱 Seeding database...\n');

// Seed test user
console.log('Creating test user...');
try {
  userService.create(
    'test@example.com',
    'password123',
    'Test User',
    'credentials'
  );
  console.log('✓ Test user created (email: test@example.com, password: password123)\n');
} catch (error) {
  console.log('✓ Test user already exists\n');
}

// Seed products
console.log('Creating products...');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 45,
    rating: 4.5
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 32,
    rating: 4.7
  },
  {
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with multiple compartments and laptop sleeve.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Fashion',
    stock: 18,
    rating: 4.3
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight professional running shoes with breathable mesh and cushioned sole.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 67,
    rating: 4.6
  },
  {
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe and brew strength control.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 54,
    rating: 4.4
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra-thick yoga mat with non-slip surface and eco-friendly materials.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 89,
    rating: 4.8
  },
  {
    name: 'Desk Lamp LED',
    description: 'Modern LED desk lamp with adjustable brightness and USB charging port.',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 41,
    rating: 4.2
  },
  {
    name: 'Sunglasses Classic',
    description: 'Polarized sunglasses with UV protection and stylish aviator design.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    category: 'Fashion',
    stock: 73,
    rating: 4.5
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 360-degree sound and 12-hour battery.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 56,
    rating: 4.6
  },
  {
    name: 'Plant Pot Set',
    description: 'Set of 3 ceramic plant pots with drainage holes and saucers.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 92,
    rating: 4.1
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and rechargeable battery.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 128,
    rating: 4.3
  },
  {
    name: 'Water Bottle Insulated',
    description: 'Stainless steel insulated water bottle keeps drinks cold for 24 hours.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 156,
    rating: 4.7
  }
];

// Check if products already exist
const existingProducts = productService.getAll();
if (existingProducts.length > 0) {
  console.log(`✓ Database already has ${existingProducts.length} products\n`);
} else {
  products.forEach((product, index) => {
    productService.create(product);
    console.log(`✓ Created: ${product.name}`);
  });
  console.log(`\n✓ ${products.length} products created\n`);
}

console.log('🎉 Database seeded successfully!');
console.log('\nYou can now run: npm run dev');
