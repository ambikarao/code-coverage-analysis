import React from 'react';
import { useCart } from '../CartContext';

const CartScreen: React.FC = () => {
  const { cart } = useCart();

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((product, idx) => (
              <li key={idx} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #eee', borderRadius: '10px', background: '#f9f9f9' }}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem', fontWeight: 700, fontSize: '1.2rem', textAlign: 'right' }}>
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
