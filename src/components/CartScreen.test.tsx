import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartScreen from './CartScreen';
import { useCart } from '../CartContext';

// Mock useCart hook
jest.mock('../CartContext', () => ({
  useCart: jest.fn()
}));

describe('CartScreen Component', () => {
  const mockProduct1 = { 
    id: 1, 
    name: 'Test Product 1', 
    price: 10, 
    description: 'This is a test product 1', 
    category: 'Category 1', 
    inStock: true 
  };

  const mockProduct2 = { 
    id: 2, 
    name: 'Test Product 2', 
    price: 20, 
    description: 'This is a test product 2', 
    category: 'Category 2', 
    inStock: false 
  };

  test('renders empty cart message when cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
    });

    render(<CartScreen />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart items when cart has items', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1, mockProduct2],
    });

    render(<CartScreen />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.queryByText('Your cart is empty.')).not.toBeInTheDocument();

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test product 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Category: Category 1')).toBeInTheDocument();
    expect(screen.getByText('Status: In Stock')).toBeInTheDocument();

    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('This is a test product 2')).toBeInTheDocument();
    expect(screen.getByText('Price: $20')).toBeInTheDocument();
    expect(screen.getByText('Category: Category 2')).toBeInTheDocument();
    expect(screen.getByText('Status: Out of Stock')).toBeInTheDocument();

    expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
  });

  test('calculates total price correctly', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1, mockProduct2],
    });

    render(<CartScreen />);

    expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
  });
});
