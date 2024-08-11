from flask import Flask
from flask_cors import CORS
import secrets
import os
from extensions import cache

secret_key = secrets.token_hex(32)

app = Flask(__name__)

# Initialize cache with a simple in-memory cache
cache.init_app(app, config={
    'CACHE_TYPE': 'simple',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_THRESHOLD': 1000  # Maximum number of items the cache will store
})

upload_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)
app.config['UPLOAD_FOLDER'] = upload_folder
print(f"Upload folder: {upload_folder}") 

app.secret_key = secret_key

CORS(app, resources={r"/api/*": {"origins": "*"}}) 

from endpoints import ep
app.register_blueprint(ep)

if __name__ == '__main__':
    app.run(debug=True)