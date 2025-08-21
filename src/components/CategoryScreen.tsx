import React from 'react';
import productsData from './productsData';
import { useCart } from '../CartContext';

const CategoryScreen: React.FC = () => {
  const categories = Array.from(new Set(productsData.map(p => p.category)));
  const [selected, setSelected] = React.useState<string>(categories[0] || '');
  const filtered = selected ? productsData.filter(p => p.category === selected) : [];
  const { addToCart } = useCart();
  return (
    <div>
      <h2>Product Categories</h2>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        {categories.map((cat, idx) => (
          <li key={idx}>
            <button onClick={() => setSelected(cat)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: selected === cat ? '2px solid #007bff' : '1px solid #ccc', background: selected === cat ? '#e3f0ff' : '#fff' }}>{cat}</button>
          </li>
        ))}
      </ul>
      {selected && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Products in {selected}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filtered.map((p, idx) => (
              <li key={idx} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #eee', borderRadius: '10px', background: '#f9f9f9' }}>
                <h4>{p.name}</h4>
                <p>{p.description}</p>
                <p>Price: ${p.price}</p>
                <p>Status: {p.inStock ? 'In Stock' : 'Out of Stock'}</p>
                <button onClick={() => addToCart(p)} disabled={!p.inStock} style={{ marginTop: '0.5rem' }}>
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryScreen;
