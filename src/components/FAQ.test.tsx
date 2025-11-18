import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQ from './FAQ';

describe('FAQ Component', () => {
  test('renders FAQ header', () => {
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  test('renders all FAQ questions', () => {
    render(<FAQ />);
    
    expect(screen.getByText('How do I add items to my cart?')).toBeInTheDocument();
    expect(screen.getByText('How can I view my cart?')).toBeInTheDocument();
    expect(screen.getByText('What payment methods do you accept?')).toBeInTheDocument();
    expect(screen.getByText('How do I track my order?')).toBeInTheDocument();
    expect(screen.getByText('What is your return policy?')).toBeInTheDocument();
  });

  test('toggles accordion when question is clicked', () => {
    render(<FAQ />);
    
    // Initially, answers should not be visible
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
    
    // Click on the first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    
    // Answer should now be visible
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();
    
    // Click on the same question again
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    
    // Answer should be hidden again
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
  });

  test('only one answer is shown at a time', () => {
    render(<FAQ />);
    
    // Click on the first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    
    // First answer should be visible
    expect(screen.getByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).toBeInTheDocument();
    
    // Click on another question
    fireEvent.click(screen.getByText('How can I view my cart?'));
    
    // First answer should now be hidden
    expect(screen.queryByText('Simply browse our products and click the "Add to Cart" button on any item you wish to purchase.')).not.toBeInTheDocument();
    
    // Second answer should be visible
    expect(screen.getByText('Click on the cart icon in the top right corner of the page or use the "Cart Summary" link in the navigation.')).toBeInTheDocument();
  });

  test('renders plus/minus icons correctly', () => {
    render(<FAQ />);
    
    // Initially all questions should have + icon
    const plusIcons = screen.getAllByText('+');
    expect(plusIcons).toHaveLength(5);
    
    // Click on the first question
    fireEvent.click(screen.getByText('How do I add items to my cart?'));
    
    // The first question should now have - icon
    expect(screen.getByText('−')).toBeInTheDocument();
    
    // There should be 4 + icons left
    expect(screen.getAllByText('+')).toHaveLength(4);
  });
});
