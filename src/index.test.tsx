import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders the root element', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('renders the App component correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText(/learn more/i)).toBeInTheDocument();
  });

  // New tests for index.tsx
  test('renders the root element with correct id', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveAttribute('id', 'root');
  });
});