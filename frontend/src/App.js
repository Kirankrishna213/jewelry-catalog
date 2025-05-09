import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload, FiShoppingCart, FiPhone, FiMail } from 'react-icons/fi';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'ring',
    weight: '',
    price: '',
    description: '',
    image: null
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`, {
          timeout: 10000
        });
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load products');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newProduct.image) {
      setError('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', newProduct.image);
    formData.append('name', newProduct.name);
    formData.append('category', newProduct.category);
    formData.append('weight', newProduct.weight);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        category: 'ring',
        weight: '',
        price: '',
        description: '',
        image: null
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add product');
      console.error('Submission Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = (productName) => {
    alert(`Inquiry received for ${productName}. We'll contact you shortly!`);
  };

  if (loading && products.length === 0) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading our exquisite jewelry collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>We're experiencing some issues</h2>
        <p>{error}</p>
        <p>Please try refreshing the page or contact support</p>
        <div className="contact-options">
          <a href="tel:+1234567890"><FiPhone /> Call Us</a>
          <a href="mailto:info@jewelryshop.com"><FiMail /> Email Us</a>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Luxury Gold Jewelry</h1>
        <p>Exquisite handcrafted pieces for every occasion</p>
      </header>

      <div className="admin-panel">
        <h2><FiUpload /> Add New Jewelry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Jewelry Name:</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Classic Gold Necklace"
            />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            >
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="bangle">Bangle</option>
              <option value="earring">Earring</option>
              <option value="bracelet">Bracelet</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Weight (grams):</label>
            <input
              type="number"
              step="0.01"
              name="weight"
              value={newProduct.weight}
              onChange={handleInputChange}
              required
              placeholder="e.g., 15.50"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>Price (per gram):</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              placeholder="e.g., 4500"
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Describe the jewelry details..."
            />
          </div>
          
          <div className="form-group">
            <label>High-Quality Image:</label>
            <div className="file-input">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {newProduct.image && (
                <span>Selected: {newProduct.image.name}</span>
              )}
            </div>
          </div>
          
          <button type="submit" className="submit-btn">
            <FiShoppingCart /> Add to Collection
          </button>
        </form>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img
                src={`${API_URL}${product.image}`}
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x300?text=Jewelry+Image';
                }}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <span className="category">{product.category}</span>
              <p className="description">{product.description}</p>
              <div className="specs">
                <p><strong>Weight:</strong> {product.weight}g</p>
                <p><strong>Price:</strong> ₹{product.price}/g</p>
                <p><strong>Total Value:</strong> ₹{(product.weight * product.price).toLocaleString()}</p>
              </div>
              <button
                className="inquiry-btn"
                onClick={() => handleInquiry(product.name)}
              >
                <FiPhone /> Make Inquiry
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
