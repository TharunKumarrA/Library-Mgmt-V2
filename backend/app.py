from flask import Flask
from endpoints import ep
from flask_cors import CORS
import secrets
import os

secret_key = secrets.token_hex(32)

app = Flask(__name__)
upload_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
if not os.path.exists(upload_folder):
    os.makedirs(upload_folder)
app.config['UPLOAD_FOLDER'] = upload_folder
print(f"Upload folder: {upload_folder}") 

app.secret_key = secret_key

CORS(app, resources={r"/api/*": {"origins": "*"}}) 
app.register_blueprint(ep)

if __name__ == '__main__':
    app.run(debug=True)