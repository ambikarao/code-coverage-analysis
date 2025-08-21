import React from 'react';
import { render } from '@testing-library/react';
import CategoryScreen from './CategoryScreen';
import { CartProvider } from '../CartContext';

describe('CategoryScreen', () => {
  it('renders without crashing', () => {
    render(
      <CartProvider>
        <CategoryScreen />
      </CartProvider>
    );
  });
});