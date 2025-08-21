// Example product data
import { Product } from '../CartContext';

const productsData: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High performance laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest model smartphone',
    price: 699.99,
    category: 'Electronics',
    inStock: true,
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Noise cancelling headphones',
    price: 199.99,
    category: 'Electronics',
    inStock: false,
  },
  {
    id: 4,
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug',
    price: 15.99,
    category: 'Kitchen',
    inStock: true,
  },
  {
    id: 5,
    name: 'Blender',
    description: 'Powerful kitchen blender',
    price: 89.99,
    category: 'Kitchen',
    inStock: true,
  },
  {
    id: 6,
    name: 'T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 25.99,
    category: 'Clothing',
    inStock: true,
  },
  {
    id: 7,
    name: 'Jeans',
    description: 'Stylish blue jeans',
    price: 79.99,
    category: 'Clothing',
    inStock: false,
  },
  {
    id: 8,
    name: 'Sneakers',
    description: 'Running sneakers',
    price: 129.99,
    category: 'Clothing',
    inStock: true,
  },
];

export default productsData;
