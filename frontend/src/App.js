// frontend/src/App.js

import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Jewelry Catalog</h1>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((item) => (
            <li key={item.id} style={{ marginBottom: "2rem" }}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  width="250"
                  style={{ borderRadius: "8px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
