import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartSummary from './CartSummary';
import { useCart } from '../CartContext';

// Mock the useCart hook
jest.mock('../CartContext', () => ({
  useCart: jest.fn(),
}));

describe('CartSummary Component', () => {
  const mockProduct1 = { 
    id: 1, 
    name: 'Product 1', 
    price: 10, 
    description: 'Description 1', 
    category: 'Category 1', 
    inStock: true 
  };
  
  const mockProduct2 = { 
    id: 2, 
    name: 'Product 2', 
    price: 20, 
    description: 'Description 2', 
    category: 'Category 2', 
    inStock: false 
  };

  const mockAddToCart = jest.fn();
  const mockClearCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty cart state correctly', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);

    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
    expect(screen.getByText('Total items: 0')).toBeInTheDocument();
    expect(screen.getByText('Total price: $0.00')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('renders cart with single item correctly', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);

    expect(screen.getByText('Total items: 1')).toBeInTheDocument();
    expect(screen.getByText('Total price: $10.00')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Category: Category 1')).toBeInTheDocument();
    expect(screen.getByText('Status: In Stock')).toBeInTheDocument();
    expect(screen.getByText('Subtotal: $10.00')).toBeInTheDocument();
  });

  test('renders cart with multiple items correctly', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1, mockProduct1, mockProduct2],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);

    expect(screen.getByText('Total items: 3')).toBeInTheDocument();
    expect(screen.getByText('Total price: $40.00')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    // Use getAllByText instead of getByText since there are multiple elements with the same text
    const subtotalElements = screen.getAllByText(/Subtotal: \$/); 
    expect(subtotalElements).toHaveLength(2);
  });

  test('increments quantity when + button is clicked', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct1);
  });

  test('decrements quantity when - button is clicked', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1, mockProduct1],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  test('removes all of a product when Remove All button is clicked', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct1, mockProduct1, mockProduct2],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);

    const removeAllButtons = screen.getAllByText('Remove All');
    fireEvent.click(removeAllButtons[0]); // Remove all of mockProduct1

    expect(mockClearCart).toHaveBeenCalled();
    // Should only add back mockProduct2
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct2);
  });

  test('handles out of stock products correctly', () => {
    (useCart as jest.Mock).mockReturnValue({
      cart: [mockProduct2],
      addToCart: mockAddToCart,
      clearCart: mockClearCart
    });

    render(<CartSummary />);
    
    expect(screen.getByText('Status: Out of Stock')).toBeInTheDocument();
  });
});
