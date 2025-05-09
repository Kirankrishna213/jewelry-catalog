import React, { useState, useEffect } from 'react';
import axios from 'react-icons/fi';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 15000;

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async (retry = 0) => {
    try {
      const healthCheck = await axios.get(`${API_URL}/api/health`, {
        timeout: 5000
      });
      
      if (healthCheck.data.status === 'healthy') {
        const response = await axios.get(`${API_URL}/api/products`, {
          timeout: API_TIMEOUT
        });
        setProducts(response.data);
        setError(null);
      }
    } catch (err) {
      if (retry < 3) {
        setTimeout(() => {
          setRetryCount(retry + 1);
          fetchData(retry + 1);
        }, 5000);
      } else {
        setError({
          message: 'Service is temporarily unavailable',
          details: 'Our jewelry catalog is taking longer to load. Please try again later.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [retryCount]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading our exquisite collection...</p>
        {retryCount > 0 && (
          <p className="retry-notice">
            Attempt {retryCount + 1} of 3
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>{error.message}</h2>
        <p>{error.details}</p>
        <div className="action-buttons">
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
          <a href="mailto:support@yourjewelryshop.com">
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Premium Gold Jewelry</h1>
        <p>Exquisite handcrafted pieces</p>
      </header>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img 
                src={`${API_URL}${product.image}`} 
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.jpg';
                }}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">₹{(product.price * product.weight).toLocaleString()}</p>
              <button className="inquiry-btn">
                Make Inquiry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
