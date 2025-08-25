import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from './Products';

describe('Products Component', () => {
  test('renders products page with title and description', () => {
    render(<Products />);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
    expect(screen.getByText('Browse our collection of products with dummy data.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<Products />);
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to About')).toBeInTheDocument();
  });

  test('renders category filter section', () => {
    render(<Products />);
    expect(screen.getByText('Filter by Category:')).toBeInTheDocument();
  });

  test('renders all products with correct data', () => {
    render(<Products />);
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.getByText('Coffee Mug')).toBeInTheDocument();
    expect(screen.getByText('Blender')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
  });

  test('category buttons are clickable', () => {
    render(<Products />);
    const allButton = screen.getByText('All');
    const electronicsButton = screen.getByText('Electronics');
    const kitchenButton = screen.getByText('Kitchen');
    const clothingButton = screen.getByText('Clothing');
    expect(allButton).toBeEnabled();
    expect(electronicsButton).toBeEnabled();
    expect(kitchenButton).toBeEnabled();
    expect(clothingButton).toBeEnabled();
  });

  test('navigation buttons are clickable', () => {
    render(<Products />);
    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');
    expect(homeButton).toBeEnabled();
    expect(aboutButton).toBeEnabled();
  });

  test('navigation functions are called when buttons are clicked', () => {
    render(<Products />);
    const homeButton = screen.getByText('Go to Home');
    const aboutButton = screen.getByText('Go to About');
    fireEvent.click(homeButton);
    fireEvent.click(aboutButton);
    expect(homeButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
  });

  test('component structure is correct', () => {
    render(<Products />);
    const mainContainer = screen.getByText('Products Page').closest('div');
    expect(mainContainer).toHaveClass('products-container');
    const navContainer = screen.getByText('Go to Home').closest('div');
    expect(navContainer).toHaveClass('navigation-buttons');
    const categoryFilter = screen.getByText('Filter by Category:').closest('div');
    expect(categoryFilter).toHaveClass('category-filter');
  });
});