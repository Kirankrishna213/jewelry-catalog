import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'ring',
    weight: '',
    price: '',
    description: '',
    image: null
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', newProduct.image);
    formData.append('name', newProduct.name);
    formData.append('category', newProduct.category);
    formData.append('weight', newProduct.weight);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchProducts();
      setNewProduct({
        name: '',
        category: 'ring',
        weight: '',
        price: '',
        description: '',
        image: null
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Premium Gold Jewelry Collection</h1>
        <p>Exquisite handcrafted pieces for every occasion</p>
      </header>

      <div className="admin-panel">
        <h2>Add New Jewelry</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <select name="category" value={newProduct.category} onChange={handleInputChange}>
              <option value="ring">Ring</option>
              <option value="necklace">Necklace</option>
              <option value="bangle">Bangle</option>
              <option value="earring">Earring</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Weight (grams):</label>
            <input type="number" step="0.01" name="weight" value={newProduct.weight} onChange={handleInputChange} required />
          </div>
          
          <div className="form-group">
            <label>Price (per gram):</label>
            <input type="number" step="0.01" name="price" value={newProduct.price} onChange={handleInputChange} required />
          </div>
          
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={newProduct.description} onChange={handleInputChange} />
          </div>
          
          <div className="form-group">
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          
          <button type="submit" className="submit-btn">Add Jewelry</button>
        </form>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img 
                src={`${process.env.REACT_APP_API_URL}${product.image}`} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/300x300?text=Jewelry+Image'
                }}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="description">{product.description}</p>
              <div className="specs">
                <p><strong>Weight:</strong> {product.weight}g</p>
                <p><strong>Price:</strong> ₹{product.price}/g</p>
                <p><strong>Total:</strong> ₹{(product.weight * product.price).toLocaleString()}</p>
              </div>
              <button className="inquiry-btn">Make Inquiry</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
