#/usr/bin/python3

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def get_a_number():
    return "10"
