#/usr/bin/python3

from flask import Flask
from flask_cors import CORS
from multiprocessing import Value
import random

app = Flask(__name__)
CORS(app)
counter = Value('i',0)


def increment_state():
    with counter.get_lock():
        counter.value += 1

        
@app.route("/")
def get_a_number():
    increment_state()
    random_number = random.randint(0,9)
    return "{}".format(random_number)


@app.route("/state")
def get_state():
    state_count = counter.value
    return "{}".format(state_count)       


@app.route("/inc_state")
def get_state_and_increment():
    state_count = counter.value
    increment_state()
    return "{}".format(state_count)
