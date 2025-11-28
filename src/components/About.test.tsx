import React from 'react';
import { render, screen } from '@testing-library/react';
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

  test('team member cards display correct information', () => {
    render(<About />);

    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('Mike Chen')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
  });

  test('renders company mission section', () => {
    render(<About />);

    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  test('navigation buttons are clickable', () => {
    render(<About />);

    const homeButton = screen.getByText('Go to Home');
    const productsButton = screen.getByText('Go to Products');

    expect(homeButton).toBeEnabled();
    expect(productsButton).toBeEnabled();
  });
});
