
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   axios.get(`${process.env.PROXY_API}/api/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Jewelry Catalog</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            <img src={product.image} alt={product.name} width="100%" />
            <h3>{product.name}</h3>
            <p>Weight: {product.weight}g</p>
            <p>Price: ₹{product.price}/g</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
