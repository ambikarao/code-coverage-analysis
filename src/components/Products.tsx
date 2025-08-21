import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import productsData from './productsData';
import { useCart } from '../CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const products: Product[] = productsData;

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToAbout = () => {
    navigate('/about');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <div className="products-container">
      <h1>Products Page</h1>
      <p>Browse our collection of products.</p>

      <div className="navigation-buttons">
        <button onClick={handleNavigateToHome} className="nav-button">
          Go to Home
        </button>
        <button onClick={handleNavigateToAbout} className="nav-button">
          Go to About
        </button>
      </div>

      <div className="category-filter">
        <h3>Filter by Category:</h3>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
            <h3>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <button style={{ marginLeft: '1rem' }} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;