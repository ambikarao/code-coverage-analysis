import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/" style={{ color: '#007bff', textDecoration: 'underline', marginRight: '1rem' }}>Go to Home</Link>
    <Link to="/products" style={{ color: '#007bff', textDecoration: 'underline', marginRight: '1rem' }}>Go to Products</Link>
    <Link to="/cart" style={{ color: '#007bff', textDecoration: 'underline' }}>Go to Cart</Link>
  </div>
);

export default NotFound;
