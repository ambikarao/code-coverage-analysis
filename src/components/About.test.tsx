import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
  test('renders about page with title and description', () => {
    render(<About />);
    
    expect(screen.getByText('About Our Company')).toBeInTheDocument();
    expect(screen.getByText('Learn more about our team and company statistics.')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(<About />);
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
    expect(screen.getByText('Go to Products')).toBeInTheDocument();
  });

  test('renders company statistics section', () => {
    render(<About />);
    
    expect(screen.getByText('Company Statistics')).toBeInTheDocument();
  });

  test('renders all team members with correct data', () => {
    render(<About />);
    
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Mike Chen')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('David Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Lisa Thompson')).toBeInTheDocument();
    expect(screen.getByText('James Miller')).toBeInTheDocument();
  });

  test('navigation buttons are clickable', () => {
    render(<About />);
    
    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');
    
    fireEvent.click(homeButton);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    fireEvent.click(productsButton);
    expect(screen.getByText('Products Page')).toBeInTheDocument();
  });
});
