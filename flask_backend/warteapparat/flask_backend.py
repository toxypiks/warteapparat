#/usr/bin/python3

from flask import Flask, request
from flask_cors import CORS
from multiprocessing import Value
import random
import json

app = Flask(__name__)
CORS(app)
counter = Value('i',0)
sec_counter = Value('i',0)
states = {}


def increment_state_and_add_to_dict():
    with counter.get_lock():
        counter.value += 1
        states[counter.value] = False
        

        
@app.route("/")
def get_a_number():
    increment_state_and_add_to_dict()
    random_number = random.randint(0,9)
    return "{}".format(random_number)


@app.route("/state")
def get_state():
    state_count = counter.value
    return "{}".format(state_count)       


@app.route("/get_all_states")
def get_all_states():
    return "{}".format(states)


@app.route("/inc_state")
def get_state_and_increment():
    state_count = counter.value
    increment_state_and_add_to_dict()
    return "{}".format(state_count)


@app.route("/post_sec_state", methods=['POST'])
def post_to_sec_state():
    content = request.json
    value = content["2nd_state"]
    print("debug: {} json: {}".format(value,content))
    with sec_counter.get_lock():
        sec_counter.value += value
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route("/add_sec_state")
def add_to_sec_state():
    for i in range(0, 5):
        if sec_counter.value < (counter.value - 1):
            with sec_counter.get_lock():
                sec_counter.value += 1
    latest_counter = sec_counter.value
    return "{}".format(latest_counter)


@app.route("/get_sec_state")
def get_latest_sec_state():
    latest_sec_state = sec_counter.value
    return "{}".format(latest_sec_state)


@app.route("/pick_up_pizza", methods=['POST'])
def pick_up_pizza():
    req_pizza = request.json
    pizza_id = req_pizza["pizza"]
    if pizza_id in states:
        states[pizza_id] = True
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


def main():
    app.run(debug=True, port=5000, host='0.0.0.0')    


if __name__ == '__main__':
    main()
    

