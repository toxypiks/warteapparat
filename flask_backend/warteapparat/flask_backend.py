#/usr/bin/python3

import json
import psycopg2
from datetime import datetime
from enum import Enum
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from multiprocessing import Value


class DateEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


app = Flask(__name__)
CORS(app)

ready_pizzas = Value('i', 0)


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
    cur.execute("INSERT INTO orders (order_time, state) VALUES ('{}', '{}') RETURNING order_id"
                .format(str_date_time, 'ORDERED'))
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
    return json.dumps(records, cls=DateEncoder)


def get_num_of_ordered_orders_fn():
    conn = psycopg2.connect("dbname='warteapparatdb' user='warteapparat' host='localhost'")
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM orders WHERE state = 'ORDERED'")
    records = cur.fetchall()
    cur.close()
    conn.close()
    return "{}".format(records)
    

def change_order_state_fn(order_uuid):
    conn = psycopg2.connect("dbname='warteapparatdb' user='warteapparat' host='localhost'")
    cur = conn.cursor()                                                                    
    cur.execute("UPDATE orders SET state = 'PICKEDUP' WHERE order_id = '{}';".format(order_uuid))
    conn.commit()
    cur.close()                                                                            
    conn.close()                                                                           
    return "ok"


def change_order_state_to_invalid_fn():
    conn = psycopg2.connect("dbname='warteapparatdb' user='warteapparat' host='localhost'")
    cur = conn.cursor()                                                                    

    cur.execute("UPDATE orders SET state = 'INVALID' WHERE state = 'ORDERED' AND (EXTRACT (EPOCH FROM (CURRENT_TIMESTAMP - order_time))) > 300")

    conn.commit()
    cur.close()  
    conn.close()                                                                            
    return "ok"


def clear_data_in_table_fn():
    conn = psycopg2.connect("dbname='warteapparatdb' user='warteapparat' host='localhost'")
    cur = conn.cursor()                                                                    
    cur.execute("DELETE FROM orders")
    conn.commit()
    cur.close()  
    conn.close()                                                                            
    return "ok"

@app.route("/get_all_orders")
def get_all_orders():
    orders_json = get_all_orders_fn()
    return Response(orders_json, mimetype='application/json')


@app.route("/get_num_of_ordered_orders")
def get_num_of_ordered_orders():
    return_json = get_num_of_ordered_orders_fn()
    return return_json


@app.route("/place_order")
def place_order():
    return_json = place_order_fn()
    return return_json


@app.route("/change_order_state", methods=['POST'])
def change_order_state():
    req_uuid = request.json
    order_uuid = req_uuid["order_uuid"]
    change_order_state_fn(order_uuid)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

# deliverer frontend endpoint
@app.route("/add_ready_pizzas", methods=['POST'])
def add_ready_pizzas():
    req_number = request.json
    number_of_pizzas = req_number["number_ready_pizzas"]
    with ready_pizzas.get_lock():
        ready_pizzas.value += int(number_of_pizzas)
    return "{}".format(ready_pizzas)


@app.route("/change_order_state_to_invalid")
def change_order_state_to_invalid():
    return_json = change_order_state_to_invalid_fn()
    return return_json


@app.route("/clear_data_from_table")
def clear_data_from_table():
    return_json = clear_data_in_table_fn()
    return return_json


def main():
    app.run(debug=True, port=5000, host='0.0.0.0')    


if __name__ == '__main__':
    main()
