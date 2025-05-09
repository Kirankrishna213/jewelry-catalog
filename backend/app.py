from flask import Flask, jsonify
from flask_cors import CORS
import os
import time

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {"origins": "*"},
    r"/uploads/*": {"origins": "*"}
})

# Health check endpoint
@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "timestamp": time.time()
    })

# Products endpoint with simulated delay for testing
@app.route('/api/products')
def get_products():
    # Simulate database query
    time.sleep(2)
    
    return jsonify([
        {
            "id": 1,
            "name": "Classic Gold Necklace",
            "category": "necklace",
            "weight": 15.5,
            "price": 4500,
            "image": "/uploads/necklace.jpg"
        },
        {
            "id": 2,
            "name": "Diamond Ring",
            "category": "ring", 
            "weight": 8.2,
            "price": 5200,
            "image": "/uploads/ring.jpg"
        }
    ])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, threaded=True)
