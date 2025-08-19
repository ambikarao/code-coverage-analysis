import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
describe('Home Component', () => {
  test('renders home page with title and description', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Our Application')).toBeInTheDocument();
    expect(screen.getByText('This is the home page with some dummy user data.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Home />);
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('renders users section with title', () => {
    render(<Home />);
    expect(screen.getByText('Users List')).toBeInTheDocument();
  });

  test('renders all user cards with correct data', () => {
    render(<Home />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Brown')).toBeInTheDocument();
  });

  test('navigation buttons are clickable', () => {
    render(<Home />);
    const productsButton = screen.getByText('Go to Products');
    const aboutButton = screen.getByText('Go to About');
    expect(productsButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });
});