import React from 'react';

const ProfileScreen: React.FC = () => {
  const [orders, setOrders] = React.useState<number>(5); // mock value
  const [history, setHistory] = React.useState<string[]>(['Order #1', 'Order #2', 'Order #3', 'Order #4', 'Order #5']);

  const placeOrder = () => {
    setOrders(orders + 1);
    setHistory([...history, `Order #${orders + 1}`]);
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <img src="https://ui-avatars.com/api/?name=John+Doe&background=007bff&color=fff&size=80" alt="avatar" style={{ borderRadius: '50%', marginRight: '1.5rem' }} />
        <div>
          <h2 style={{ margin: 0, fontSize: '2rem', color: '#2d3748' }}>John Doe</h2>
          <p style={{ margin: 0, color: '#555' }}>john@example.com</p>
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Orders placed: <span style={{ color: '#007bff' }}>{orders}</span></p>
        <button onClick={placeOrder} style={{ background: 'linear-gradient(90deg,#6a82fb,#fc5c7d)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>Place Mock Order</button>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Order History</h3>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {history.map((order, idx) => (
            <li key={idx} style={{ background: '#f8f9fa', marginBottom: '0.5rem', padding: '0.7rem 1rem', borderRadius: 8, color: '#333', fontWeight: 500 }}>{order}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileScreen;
