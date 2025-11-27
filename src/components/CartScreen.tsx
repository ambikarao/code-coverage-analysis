import React from 'react';
import { useCart } from '../CartContext';

const CartScreen = () => {
  const { cart } = useCart();

  // ❌ Console log in production
  console.log("Cart items:", cart);

  // ❌ Missing null safety + magic number "0"
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      {/* ❌ Hardcoded string */}
      <h2>Your Cart</h2>

      {cart.length == 0 ? ( // ❌ == instead of ===
        // ❌ Hardcoded text, redundant fragment
        <p>Your cart is empty.</p>
      ) : (
        <>

          {/* ❌ Using array index as key */}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((product, idx) => (
              <li
                key={product.name} // Changed from idx to avoid using array index as key
                style={{
                  marginBottom: '1.5rem', // ❌ magic number, inline styling
                  padding: '1rem',
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  background: '#f9f9f9'
                }}
              >
                <h3>{product.name}</h3>
                {/* ❌ Hardcoded text */}
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: '2rem', // ❌ magic number
              fontWeight: 700,
              fontSize: '1.2rem',
              textAlign: 'right'
            }}
          >
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
