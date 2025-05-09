
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Sample data
PRODUCTS = [
    {
        "id": 1,
        "name": "Gold Necklace",
        "category": "necklace",
        "weight": 15.5,
        "price": 4500,
        "image": "https://via.placeholder.com/300"
    },
    {
        "id": 2,
        "name": "Diamond Ring",
        "category": "ring",
        "weight": 8.2,
        "price": 5200,
        "image": "https://via.placeholder.com/300"
    }
]

@app.route('/api/products')
def get_products():
    return jsonify(PRODUCTS)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('PORT', 5000))
