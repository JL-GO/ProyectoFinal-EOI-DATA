from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from routes import ruta_casas
from db import db

app = Flask(__name__)

@app.get("/")
def root():
  return "¡Backend de productos funcionando!"

CORS(app)

app.register_blueprint(ruta_casas, url_prefix='/casas')

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///casas.db"
db.init_app(app)

with app.app_context():
    db.create_all() # Creamos las tablas en la BD

app.run(host="0.0.0.0")


