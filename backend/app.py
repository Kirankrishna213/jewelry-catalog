from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

PRODUCTS = [
    {
        "id": 1,
        "name": "Classic Gold Necklace",
        "category": "necklace",
        "weight": 15.5,
        "price": 4500,
        "image": "https://i.imgur.com/5R5hW9L.jpg"
    },
    {
        "id": 2, 
        "name": "Diamond Ring",
        "category": "ring",
        "weight": 8.2,
        "price": 5200,
        "image": "https://i.imgur.com/8LJjUdW.jpg"
    }
]

@app.route('/api/products')
def get_products():
    return jsonify(PRODUCTS)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
