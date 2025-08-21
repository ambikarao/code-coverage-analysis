import React from 'react';
import { useCart } from '../CartContext';

const CartSummary: React.FC = () => {
  const { cart, addToCart, clearCart } = useCart();

  // Group products by id and count quantity
  const grouped = cart.reduce<{ [id: number]: { product: typeof cart[0]; quantity: number } }>((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1;
    } else {
      acc[item.id] = { product: item, quantity: 1 };
    }
    return acc;
  }, {});
  const groupedArr = Object.values(grouped);

  // Remove all of a product from cart
  const removeProduct = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    clearCart();
    newCart.forEach((item) => addToCart(item));
  };

  // Decrement quantity
  const decrement = (id: number) => {
    let removed = false;
    const newCart = cart.filter((item) => {
      if (!removed && item.id === id) {
        removed = true;
        return false;
      }
      return true;
    });
    clearCart();
    newCart.forEach((item) => addToCart(item));
  };

  // Increment quantity
  const increment = (product: typeof cart[0]) => {
    addToCart(product);
  };

  const total = groupedArr.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  return (
    <div>
      <h2>Cart Summary</h2>
      <p>Total items: {cart.length}</p>
      <p>Total price: ${total.toFixed(2)}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {groupedArr.map(({ product, quantity }) => (
          <li key={product.id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #eee', borderRadius: '10px', background: '#f9f9f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              </div>
              <div>
                <button onClick={() => decrement(product.id)} style={{ marginRight: '0.5rem' }}>-</button>
                <span style={{ fontWeight: 600 }}>{quantity}</span>
                <button onClick={() => increment(product)} style={{ marginLeft: '0.5rem' }}>+</button>
              </div>
              <div style={{ marginLeft: '2rem', fontWeight: 600 }}>
                Subtotal: ${(product.price * quantity).toFixed(2)}
              </div>
              <button style={{ marginLeft: '2rem', color: 'red' }} onClick={() => removeProduct(product.id)}>Remove All</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartSummary;
