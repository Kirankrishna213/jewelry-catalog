import React, { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Jewelry Catalog</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc' }}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              {product.image && (
                <img src={product.image} alt={product.name} width="200" style={{ borderRadius: '8px' }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
