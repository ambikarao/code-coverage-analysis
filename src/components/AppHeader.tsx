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
        <Link to="/faq" style={{ fontWeight: 600, color: '#333', textDecoration: 'none', fontSize: '1.1rem' }}>FAQ</Link>
      </nav>
      <Link to="/cart" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', borderRadius: '20px', padding: '0.5rem 1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', cursor: 'pointer' }}>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23007bff' d='M17%207l-6-4l-6%204v13c0%201%201%202%202%202h8c1%200%202-1%202-2z'/%3E%3C/svg%3E" alt="cart" style={{ width: '1.3rem', height: '1.3rem' }} />
          <span style={{ fontWeight: 600, color: '#007bff', fontSize: '1rem' }}>Cart: {cart.length}</span>
        </div>
      </Link>
    </header>
  );
};

export default AppHeader;
