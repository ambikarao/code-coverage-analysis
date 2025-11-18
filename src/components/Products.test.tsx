import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Products from './Products';
import { CartContext } from '../CartContext';

// Create mock for CartContext
const mockAddToCart = jest.fn();
const mockContextValue = {
  cart: [],
  addToCart: mockAddToCart,
  clearCart: jest.fn()
};

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Products Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders products page heading and description', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockContextValue}>
          <Products />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockContextValue}>
          <Products />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('navigates to home when "Go to Home" button is clicked', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockContextValue}>
          <Products />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const homeButton = screen.getByText('Go to Home');
    fireEvent.click(homeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('calls addToCart when "Add to Cart" button is clicked', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={mockContextValue}>
          <Products />
        </CartContext.Provider>
      </BrowserRouter>
    );
    
    const addToCartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addToCartButtons[0]);
    
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });
});
