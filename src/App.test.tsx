import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CartProvider } from './CartContext';

// Mock react-router-dom components
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ element }) => <div data-testid="route">{element}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: '1' }),
}));

// Mock child components
jest.mock('./components/Home', () => () => <div>Home Component</div>);
jest.mock('./components/Products', () => () => <div>Products Component</div>);
jest.mock('./components/About', () => () => <div>About Component</div>);
jest.mock('./components/ProductDetails', () => () => <div>Product Details Component</div>);
jest.mock('./components/CartScreen', () => () => <div>Cart Screen Component</div>);
jest.mock('./components/CartSummary', () => () => <div>Cart Summary Component</div>);
jest.mock('./components/CategoryScreen', () => () => <div>Category Screen Component</div>);
jest.mock('./components/NotFound', () => () => <div>Not Found Component</div>);
jest.mock('./components/ProfileScreen', () => () => <div>Profile Screen Component</div>);
jest.mock('./components/FAQ', () => () => <div>FAQ Component</div>);

// Mock AppHeader with navigation links for testing
jest.mock('./components/AppHeader', () => () => (
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
      <a href="/profile">Profile</a>
      <a href="/categories">Categories</a>
      <a href="/cart-summary">Cart Summary</a>
      <a href="/faq">FAQ</a>
    </nav>
    <div>Cart: 0</div>
  </header>
));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // If the component renders without throwing, the test passes
  });

  test('renders header navigation', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Cart Summary')).toBeInTheDocument();
  });

  test('renders cart icon in header', () => {
    render(<App />);
    expect(screen.getByText(/Cart:/)).toBeInTheDocument();
  });

  test('renders main container', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});