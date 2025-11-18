import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders FAQ page with title', () => {
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  test('renders all FAQ questions', () => {
    render(<FAQ />);
    
    // Check if all questions are rendered
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  test('accordion is closed by default', () => {
    render(<FAQ />);
    
    // Check that no answers are visible by default
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
    expect(screen.queryByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).not.toBeInTheDocument();
  });

  test('clicking a question shows its answer', () => {
    render(<FAQ />);
    
    // Click the first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    
    // Check that the answer is now visible
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();
  });

  test('clicking an open question closes it', () => {
    render(<FAQ />);
    
    // First, open a question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();
    
    // Now click it again to close it
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
  });

  test('only one answer can be open at a time', () => {
    render(<FAQ />);
    
    // Open the first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();
    
    // Now open the second question
    fireEvent.click(screen.getByText('How can I view my cart?'));
    
    // First answer should be closed
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
    
    // Second answer should be open
    expect(screen.getByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).toBeInTheDocument();
  });
});