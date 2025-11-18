import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
    <a href={to}>{children}</a>
  )
}));

describe('NotFound Component', () => {
  test('renders 404 title', () => {
    render(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  test('renders error message', () => {
    render(<NotFound />);
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<NotFound />);
    
    // Check if all links are rendered
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
    expect(screen.getByText('Go to Cart')).toBeInTheDocument();
    
    // Check if links have correct href attributes
    const homeLink = screen.getByText('Go to Home');
    expect(homeLink).toHaveAttribute('href', '/');
    
    const productsLink = screen.getByText('Go to Products');
    expect(productsLink).toHaveAttribute('href', '/products');
    
    const cartLink = screen.getByText('Go to Cart');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});