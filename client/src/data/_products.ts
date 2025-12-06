// // TypeScript interfaces based on your Mongoose schemas
// export interface ProductImage {
//   secure_url: string;
//   public_id: string;
// }

// export interface ProductVariant {
//   _id: string;
//   color: string;
//   size: string;
//   images: ProductImage[];
//   productId: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Product {
//   _id: string;
//   title: string;
//   brand: string;
//   categoryId: string;
//   subCategoryId: string;
//   basePrice: number;
//   images: ProductImage[];
//   description: string;
//   isActive: boolean;
//   variantIds: string[];
//   variants: ProductVariant[]; // Populated variants
//   createdAt: string;
//   updatedAt: string;
// }

// // Dummy data generator functions
// const generateObjectId = (): string => {
//   return Math.random().toString(16).substr(2, 24);
// };

// const generateProductImage = (productName: string, index: number): ProductImage => ({
//   secure_url: `https://picsum.photos/200`,
//   public_id: `products/${productName.toLowerCase().replace(/\s+/g, '_')}_${index}`
// });

// const brands = [
//   'Nike', 'Adidas', 'Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 
//   'Canon', 'Nikon', 'Zara', 'H&M', 'Uniqlo', 'Levis', 'Gucci'
// ];

// const colors = [
//   'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 
//   'Pink', 'Gray', 'Brown', 'Navy', 'Maroon', 'Teal', 'Coral'
// ];

// const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '32', '34', '36', '38', '40', '42'];

// const productTitles = [
//   'Wireless Bluetooth Headphones',
//   'Smart Fitness Watch',
//   'Premium Cotton T-Shirt',
//   'Leather Crossbody Bag',
//   'Running Sneakers',
//   'Wireless Phone Charger',
//   'Stainless Steel Water Bottle',
//   'Bluetooth Speaker',
//   'Denim Jacket',
//   'Gaming Mouse',
//   'Laptop Backpack',
//   'Sunglasses',
//   'Yoga Mat',
//   'Coffee Mug Set',
//   'Phone Case',
//   'Desk Lamp',
//   'Wireless Earbuds',
//   'Hoodie',
//   'Mechanical Keyboard',
//   'Travel Pillow',
//   'Skincare Set',
//   'Baseball Cap',
//   'Portable Power Bank',
//   'Casual Sneakers',
//   'Workout Leggings',
//   'Canvas Tote Bag',
//   'Smart Home Device',
//   'Kitchen Knife Set',
//   'Perfume',
//   'Wall Clock',
//   'Throw Blanket',
//   'Phone Stand',
//   'Bookshelf',
//   'Face Mask Set',
//   'Winter Scarf',
//   'USB Cable',
//   'Notebook Set',
//   'Protein Shaker',
//   'LED Strip Lights',
//   'Ceramic Plates Set',
//   'Hair Dryer',
//   'Board Game',
//   'Plant Pot',
//   'Car Phone Mount',
//   'Meditation Cushion',
//   'Kitchen Scale',
//   'Wireless Mouse Pad',
//   'Essential Oil Diffuser',
//   'Tablet Stand',
//   'Premium Socks Set'
// ];

// const descriptions = [
//   'High-quality product designed for everyday use with premium materials and excellent craftsmanship.',
//   'Innovative design meets functionality in this must-have item for modern lifestyle.',
//   'Durable and stylish, perfect for both casual and professional settings.',
//   'Eco-friendly materials combined with contemporary design for conscious consumers.',
//   'Premium quality construction ensures long-lasting performance and satisfaction.',
//   'Sleek and modern design that complements any style or decor.',
//   'Versatile and practical solution for your daily needs with superior quality.',
//   'Crafted with attention to detail and built to exceed your expectations.'
// ];

// const generateProductVariants = (productId: string, numVariants: number = 3): ProductVariant[] => {
//   const variants: ProductVariant[] = [];
//   const usedCombinations = new Set<string>();
  
//   for (let i = 0; i < numVariants; i++) {
//     let color, size, combination;
    
//     // Ensure unique color-size combinations
//     do {
//       color = colors[Math.floor(Math.random() * colors.length)];
//       size = sizes[Math.floor(Math.random() * sizes.length)];
//       combination = `${color}-${size}`;
//     } while (usedCombinations.has(combination));
    
//     usedCombinations.add(combination);
    
//     const variantId = generateObjectId();
//     const variant: ProductVariant = {
//       _id: variantId,
//       color,
//       size,
//       images: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, index) =>
//         generateProductImage(`variant-${color}-${size}`, index + 1)
//       ),
//       productId,
//       isActive: Math.random() > 0.1, // 90% active
//       createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//       updatedAt: new Date().toISOString()
//     };
    
//     variants.push(variant);
//   }
  
//   return variants;
// };

// // Generate 50 dummy products with variants
// export const productData: Product[] = Array.from({ length: 50 }, (_, index) => {
//   const productId = generateObjectId();
//   const categoryId = generateObjectId();
//   const subCategoryId = generateObjectId();
//   const title = productTitles[index];
//   const brand = brands[Math.floor(Math.random() * brands.length)];
//   const numVariants = Math.floor(Math.random() * 4) + 2; // 2-5 variants per product
//   const variants = generateProductVariants(productId, numVariants);
  
//   const product: Product = {
//     _id: productId,
//     title,
//     brand,
//     categoryId,
//     subCategoryId,
//     basePrice: Math.floor(Math.random() * 500) + 20, // $20-$520
//     images: Array.from({ length: Math.floor(Math.random() * 4) + 3 }, (_, imgIndex) =>
//       generateProductImage(title, imgIndex + 1)
//     ),
//     description: descriptions[Math.floor(Math.random() * descriptions.length)],
//     isActive: Math.random() > 0.05, // 95% active
//     variantIds: variants.map(v => v._id),
//     variants, // Populated variants
//     createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//     updatedAt: new Date().toISOString()
//   };
  
//   return product;
// });

