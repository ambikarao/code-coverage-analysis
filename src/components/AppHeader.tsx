import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const AppHeader: React.FC = () => {
  const { cart } = useCart();
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2rem',
        background: '#f8f9fa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link to="/" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>Home</Link>
        <Link to="/products" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>Products</Link>
        <Link to="/about" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>About</Link>
        <Link to="/profile" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>Profile</Link>
        <Link to="/categories" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>Categories</Link>
        <Link to="/cart-summary" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>Cart Summary</Link>
      </nav>
      <Link to="/cart" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', borderRadius: '20px', padding: '0.5rem 1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', cursor: 'pointer' }}>
          <span role="img" aria-label="cart" style={{ fontSize: '1.3rem' }}>🛒</span>
          <span style={{ fontWeight: 600, color: '#007bff', fontSize: '1rem' }}>Cart: {cart.length}</span>
        </div>
      </Link>
    </header>
  );
};

export default AppHeader;
