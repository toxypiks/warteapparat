#/usr/bin/python3

from flask import Flask
from flask_cors import CORS
from multiprocessing import Value
import random

app = Flask(__name__)
CORS(app)
counter = Value('i',0)

@app.route("/")
def get_a_number():
    with counter.get_lock():
        counter.value += 1
    random_number = random.randint(0,9)
    return "{}".format(random_number)

@app.route("/state")
def get_state():
    state_count = counter.value
    return "{}".format(state_count)
