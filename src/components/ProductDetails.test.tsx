import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import productsData from './productsData';

// Mock the CartContext
const mockAddToCart = jest.fn();
jest.mock('../CartContext', () => ({
  useCart: jest.fn(() => ({
    addToCart: mockAddToCart,
  })),
}));

describe('ProductDetails Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders product details for existing product', () => {
    const testProduct = productsData[0]; // Get the first product from productsData
    
    render(
      <MemoryRouter initialEntries={[`/products/${testProduct.id}`]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Check if the product details are displayed correctly
    expect(screen.getByText(testProduct.name)).toBeInTheDocument();
    expect(screen.getByText(testProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${testProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(`Category: ${testProduct.category}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${testProduct.inStock ? 'In Stock' : 'Out of Stock'}`)).toBeInTheDocument();
    
    // Check if the "Add to Cart" button is present
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  test('displays "Product not found" for non-existent product', () => {
    render(
      <MemoryRouter initialEntries={['/products/9999']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Product not found.')).toBeInTheDocument();
  });

  test('calls addToCart function when "Add to Cart" button is clicked', () => {
    const testProduct = productsData[0]; // Get the first product from productsData
    
    render(
      <MemoryRouter initialEntries={[`/products/${testProduct.id}`]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Click the "Add to Cart" button
    fireEvent.click(screen.getByText('Add to Cart'));
    
    // Check if addToCart function was called with the correct product
    expect(mockAddToCart).toHaveBeenCalledWith(testProduct);
  });
});
