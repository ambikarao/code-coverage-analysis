import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileScreen from './ProfileScreen';

describe('ProfileScreen Component', () => {
  test('renders profile information', () => {
    render(<ProfileScreen />);
    
    // Check if profile info is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  });

  test('displays initial order count and history', () => {
    render(<ProfileScreen />);
    
    // Check initial order count
    expect(screen.getByText('Orders placed:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Check order history items
    expect(screen.getByText('Order History')).toBeInTheDocument();
    expect(screen.getByText('Order #1')).toBeInTheDocument();
    expect(screen.getByText('Order #2')).toBeInTheDocument();
    expect(screen.getByText('Order #3')).toBeInTheDocument();
    expect(screen.getByText('Order #4')).toBeInTheDocument();
    expect(screen.getByText('Order #5')).toBeInTheDocument();
  });

  test('increments order count and adds to history when "Place Mock Order" button is clicked', () => {
    render(<ProfileScreen />);
    
    // Get the initial order count
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Click the "Place Mock Order" button
    const placeOrderButton = screen.getByText('Place Mock Order');
    fireEvent.click(placeOrderButton);
    
    // Check if order count is incremented
    expect(screen.getByText('6')).toBeInTheDocument();
    
    // Check if a new order is added to the history
    expect(screen.getByText('Order #6')).toBeInTheDocument();
    
    // Click the button again
    fireEvent.click(placeOrderButton);
    
    // Check if order count is incremented again
    expect(screen.getByText('7')).toBeInTheDocument();
    
    // Check if another new order is added to the history
    expect(screen.getByText('Order #7')).toBeInTheDocument();
  });
});
