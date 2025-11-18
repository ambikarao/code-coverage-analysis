import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart, Product } from './CartContext';

// Mock component to test the context
const TestComponent = () => {
  const { cart, addToCart, clearCart } = useCart();
  
  const testProduct: Product = {
    id: 999,
    name: 'Test Product',
    description: 'Test Description',
    price: 19.99,
    category: 'Test',
    inStock: true
  };
  
  return (
    <div>
      <div data-testid="cart-count">{cart.length}</div>
      <div data-testid="cart-items">
        {cart.map(item => <div key={`${item.id}-${item.name}`}>{item.name}</div>)}
      </div>
      <button onClick={() => addToCart(testProduct)}>Add Test Product</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  test('provides initial empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
  
  test('can add items to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText('Add Test Product');
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
  
  test('can add multiple items to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText('Add Test Product');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
  });
  
  test('can clear cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    // Add items first
    const addButton = screen.getByText('Add Test Product');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    
    // Then clear them
    const clearButton = screen.getByText('Clear Cart');
    fireEvent.click(clearButton);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  });
});