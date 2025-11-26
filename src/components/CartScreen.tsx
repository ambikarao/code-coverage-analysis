import React from 'react';
import { useCart } from '../CartContext';

// Constants
const INITIAL_TOTAL = 0;
const CART_TITLE = 'Your Cart';
const EMPTY_CART_MESSAGE = 'Your cart is empty.';
const PRICE_LABEL = 'Price: $';
const CATEGORY_LABEL = 'Category: ';
const STATUS_LABEL = 'Status: ';
const IN_STOCK_TEXT = 'In Stock';
const OUT_OF_STOCK_TEXT = 'Out of Stock';
const TOTAL_LABEL = 'Total: $';

const CartScreen = () => {
  const { cart } = useCart();

  // Null safety for cart
  if (!cart) {
    return <div>Error: Cart not available</div>;
  }

  const total = cart.reduce((sum, product) => sum + (product?.price || 0), INITIAL_TOTAL);

  return (
    <div className="cart-container">
      <h2>{CART_TITLE}</h2>

      {cart.length === 0 ? (
        <p>{EMPTY_CART_MESSAGE}</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{PRICE_LABEL}{product.price}</p>
                <p>{CATEGORY_LABEL}{product.category}</p>
                <p>{STATUS_LABEL}{product.inStock ? IN_STOCK_TEXT : OUT_OF_STOCK_TEXT}</p>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            {TOTAL_LABEL}{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
