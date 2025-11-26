import React from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  const handleNavigateToAbout = () => {
    navigate('/about');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Application</h1>
      <p>This is the home page with some dummy user data.</p>
      
      <div className="navigation-buttons">
        <button onClick={handleNavigateToProducts} className="nav-button">
          Go to Products
        </button>
        <button onClick={handleNavigateToAbout} className="nav-button">
          Go to About
        </button>
      </div>

      <div className="users-section">
        <h2>Users List</h2>
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
