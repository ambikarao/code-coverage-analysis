import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as CartContextModule from './CartContext';

// Mock the CartContext module
jest.mock('./CartContext', () => {
  const originalModule = jest.requireActual('./CartContext');
  return {
    ...originalModule,
    useCart: jest.fn(() => ({
      cart: [],
      addToCart: jest.fn(),
      clearCart: jest.fn(),
    })),
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  test('renders header navigation', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
  });

  test('renders cart icon in header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Cart:/)).toBeInTheDocument();
  });

  test('renders main container', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});