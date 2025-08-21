import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart, Product } from '../CartContext';
import productsData from './productsData';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const product = productsData.find((p: Product) => p.id === Number(id));
  const { addToCart } = useCart();

  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
