import React from 'react';
import { render, screen } from '@testing-library/react';
import CartScreen from './CartScreen';
import { CartProvider } from '../CartContext';

describe('CartScreen Component', () => {
  test('renders cart screen with empty cart message', () => {
    render(
      <CartProvider>
        <CartScreen />
      </CartProvider>
    );
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items when cart is not empty', () => {
    const mockCart = [
      { name: 'Laptop', description: 'High performance laptop', price: 999.99, category: 'Electronics', inStock: true },
      { name: 'Headphones', description: 'Noise cancelling headphones', price: 199.99, category: 'Electronics', inStock: true }
    ];
    render(
      <CartProvider value={{ cart: mockCart }}>
        <CartScreen />
      </CartProvider>
    );
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
  });
});