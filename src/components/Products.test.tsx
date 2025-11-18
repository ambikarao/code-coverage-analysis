import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from './Products';
import { CartProvider } from '../CartContext';

// Mock the Link component from react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn()
}));

describe('Products Component', () => {
  test('renders products page title', () => {
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    expect(screen.getByText('Our Products')).toBeInTheDocument();
  });

  test('renders product list', () => {
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    // Check if at least one product is rendered
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  });

  test('renders product details correctly', () => {
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    // Check if product information is displayed
    const productElements = screen.getAllByRole('article');
    expect(productElements.length).toBeGreaterThan(0);
    
    // Check if the first product has name, price, and category
    const firstProduct = productElements[0];
    expect(firstProduct).toHaveTextContent(/\$/); // Should contain price with $ symbol
    expect(firstProduct).toHaveTextContent(/Add to Cart/i); // Should have add to cart button
  });

  test('add to cart button is clickable', () => {
    render(
      <CartProvider>
        <Products />
      </CartProvider>
    );
    
    const addToCartButtons = screen.getAllByText('Add to Cart');
    expect(addToCartButtons.length).toBeGreaterThan(0);
    
    // The first button should be enabled
    expect(addToCartButtons[0]).toBeEnabled();
  });
});