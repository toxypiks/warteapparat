#/usr/bin/python3

from flask import Flask
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def get_a_number():
    random_number = random.randint(0,9)
    return "{}".format(random_number)
