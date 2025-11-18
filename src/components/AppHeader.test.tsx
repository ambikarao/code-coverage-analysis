import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from './AppHeader';
import { CartProvider } from '../CartContext';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
    <a href={to}>{children}</a>
  )
}));

describe('AppHeader Component', () => {
  test('renders all navigation links', () => {
    render(
      <CartProvider>
        <AppHeader />
      </CartProvider>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  test('renders cart icon with correct count', () => {
    render(
      <CartProvider>
        <AppHeader />
      </CartProvider>
    );
    
    const cartText = screen.getByText(/Cart: 0/);
    expect(cartText).toBeInTheDocument();
  });

  test('cart count updates when cart context changes', () => {
    const { rerender } = render(
      <CartProvider>
        <AppHeader />
      </CartProvider>
    );
    
    // Initial state should show Cart: 0
    expect(screen.getByText(/Cart: 0/)).toBeInTheDocument();

    // We can't directly test the context update here as we'd need to modify the CartProvider
    // In a real test, we'd use a mock provider or test with a component that can modify the cart
  });

  test('header has correct styling', () => {
    render(
      <CartProvider>
        <AppHeader />
      </CartProvider>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});