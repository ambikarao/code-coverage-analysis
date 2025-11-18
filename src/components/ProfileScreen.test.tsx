import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileScreen from './ProfileScreen';

describe('ProfileScreen Component', () => {
  test('renders profile information', () => {
    render(<ProfileScreen />);
    
    // Check if user information is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    // Check if avatar is rendered
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', expect.stringContaining('John+Doe'));
  });

  test('renders initial order count', () => {
    render(<ProfileScreen />);
    expect(screen.getByText('Orders placed:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders order history list', () => {
    render(<ProfileScreen />);
    
    // Check if order history heading is displayed
    expect(screen.getByText('Order History')).toBeInTheDocument();
    
    // Check if order history items are displayed
    expect(screen.getByText('Order #1')).toBeInTheDocument();
    expect(screen.getByText('Order #2')).toBeInTheDocument();
    expect(screen.getByText('Order #3')).toBeInTheDocument();
    expect(screen.getByText('Order #4')).toBeInTheDocument();
    expect(screen.getByText('Order #5')).toBeInTheDocument();
  });

  test('place order button increases order count', () => {
    render(<ProfileScreen />);
    
    // Check initial order count
    expect(screen.getByText('5')).toBeInTheDocument();
    
    // Click the place order button
    fireEvent.click(screen.getByText('Place Mock Order'));
    
    // Check if order count increased
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  test('place order button adds new order to history', () => {
    render(<ProfileScreen />);
    
    // Check initial order history
    expect(screen.queryByText('Order #6')).not.toBeInTheDocument();
    
    // Click the place order button
    fireEvent.click(screen.getByText('Place Mock Order'));
    
    // Check if new order was added to history
    expect(screen.getByText('Order #6')).toBeInTheDocument();
  });

  test('place order button works multiple times', () => {
    render(<ProfileScreen />);
    
    // Click the place order button multiple times
    fireEvent.click(screen.getByText('Place Mock Order')); // Order #6
    fireEvent.click(screen.getByText('Place Mock Order')); // Order #7
    
    // Check if order count increased correctly
    expect(screen.getByText('7')).toBeInTheDocument();
    
    // Check if both new orders were added to history
    expect(screen.getByText('Order #6')).toBeInTheDocument();
    expect(screen.getByText('Order #7')).toBeInTheDocument();
  });
});