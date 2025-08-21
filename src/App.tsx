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

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App" style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)', display: 'flex', flexDirection: 'column' }}>
          <AppHeader />
          <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
            <div style={{ width: '100%', maxWidth: '1100px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', padding: '2.5rem 2rem', minHeight: 'calc(100vh - 120px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/cart-summary" element={<CartSummary />} />
                <Route path="/categories" element={<CategoryScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
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
