import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders header navigation', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
  });

  test('renders cart icon in header', () => {
    render(<App />);
    expect(screen.getByText(/Cart:/)).toBeInTheDocument();
  });

  test('renders main container', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
