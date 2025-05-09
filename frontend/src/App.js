import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://jewelry-catalog-1.onrender.com/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="app">
      <h1>Gold Jewelry Collection</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
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
