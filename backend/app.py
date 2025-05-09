from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def home():
    return "Jewelry Catalog API is running."

@app.route('/products')
def products():
    with open('products.json') as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Render uses a dynamic port
    app.run(host='0.0.0.0', port=port)
