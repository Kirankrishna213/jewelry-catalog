/* Base Styles */
:root {
  --gold: #D4AF37;
  --dark-gold: #996515;
  --light-gold: #F0E68C;
  --bg-color: #f9f5f0;
  --text-color: #333;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Playfair Display', serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

/* Loading States */
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.spinner {
  border: 5px solid rgba(0,0,0,0.1);
  border-top: 5px solid var(--gold);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: #fff8f8;
  color: #d9534f;
}

.error-screen h2 {
  margin-bottom: 1rem;
}

/* App Layout */
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--gold);
}

.header h1 {
  color: var(--dark-gold);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.header p {
  font-style: italic;
  color: #666;
  font-size: 1.1rem;
}

/* Product Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.image-container {
  height: 300px;
  overflow: hidden;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .image-container img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  color: var(--dark-gold);
  font-size: 1.3rem;
}

.category {
  display: inline-block;
  background-color: var(--light-gold);
  color: var(--dark-gold);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  text-transform: capitalize;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.specs {
  margin: 1.5rem 0;
}

.specs p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.specs strong {
  color: var(--dark-gold);
}

.inquiry-btn {
  background: none;
  border: 2px solid var(--gold);
  color: var(--dark-gold);
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  width: 100%;
  font-family: inherit;
  font-size: 0.9rem;
}

.inquiry-btn:hover {
  background-color: var(--gold);
  color: white;
}

/* Admin Panel */
.admin-panel {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.admin-panel h2 {
  color: var(--dark-gold);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--dark-gold);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
  background-color: var(--gold);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: var(--dark-gold);
}

/* Responsive Design */
@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-panel {
    padding: 1.5rem;
  }
}
