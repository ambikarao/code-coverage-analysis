import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import ProductDetails from './components/ProductDetails';
import { CartProvider } from './CartContext';
import AppHeader from './components/AppHeader';
import CartScreen from './components/CartScreen';
import CartSummary from './components/CartSummary';
import CategoryScreen from './components/CategoryScreen';
import NotFound from './components/NotFound';
import ProfileScreen from './components/ProfileScreen';
import FAQ from './components/FAQ';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <AppHeader />
          <main className="main-content">
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/cart-summary" element={<CartSummary />} />
                <Route path="/categories" element={<CategoryScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
