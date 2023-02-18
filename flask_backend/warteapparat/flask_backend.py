#/usr/bin/python3

from flask import Flask, jsonify, request
from flask_cors import CORS
from multiprocessing import Value
import json
import uuid
import psycopg2
from datetime import datetime
from enum import Enum

app = Flask(__name__)
CORS(app)
counter = Value('i', 0)
sec_counter = Value('i', 0)
states = {}


class OrderState(Enum):
    ORDERED = 1
    PICKEDUP = 2
    INVALID = 3

    
def place_order_fn():
    current_time = datetime.now()                          
    time_stamp = current_time.timestamp()                  
    date_time = datetime.fromtimestamp(time_stamp)          
    str_date_time = date_time.strftime("%Y-%m-%d %H:%M:%S")
    conn = psycopg2.connect("dbname='warteapparatdb' user='warteapparat' host='localhost'")
    cur = conn.cursor()
    cur.execute("INSERT INTO orders (order_time, state) VALUES (%s, %s) RETURNING order_id",
                (str_date_time, 'ORDERED'))
    order_uuid = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(order_uuid)


def get_all_orders_fn():
    conn = psycopg2.connect("dbname='warteapparatdb' user='warteapparat' host='localhost'")
    cur = conn.cursor()
    cur.execute("SELECT * FROM orders")
    records = cur.fetchall()
    cur.close()
    conn.close()
    return "{}".format(records)


@app.route("/state")
def get_state():
    state_count = counter.value
    return "{}".format(state_count)       


@app.route("/get_all_orders")
def get_all_orders():
    return_json = get_all_orders_fn()
    return return_json


@app.route("/place_order")
def place_order():
    return_json = place_order_fn()
    return return_json


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
        states[pizza_id]['state'] = OrderState.PICKEDUP
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


def main():
    app.run(debug=True, port=5000, host='0.0.0.0')    


if __name__ == '__main__':
    main()
