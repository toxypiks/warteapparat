function outputToConsole(text) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById("console").appendChild(para);
    para.scrollIntoView();
}

function clearConsole() {
    document.getElementById("console").innerHTML = "";
}

function httpGet(endpoint_name, variable_context) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            outputToConsole(variable_context + this.responseText);
        }
    };
    var endpoint = "http://127.0.0.1:5000/" + endpoint_name;
    xmlHttp.open("GET", endpoint, true);
    xmlHttp.send(null);
}

function httpPost(endpoint_name, param_name, param_value, variable_context) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            outputToConsole(variable_context + this.responseText);
        }
    };
    var endpoint = "http://127.0.0.1:5000/" + endpoint_name;
    xmlHttp.open("POST", endpoint, true);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    var param_json = "{ \"" + param_name + "\" : \"" + param_value + "\" }"
    xmlHttp.send(param_json);
}

function httpGetAllOrders() {
    httpGet("get_all_orders", "all orders: ");
}

function httpGetNumOfOrderedOrders() {
    httpGet("get_num_of_ordered_orders", "num of ordered orders: ");
}

function httpPlaceOrder() {
    httpGet("place_order", "place_order: ");
}

function httpPostChangeOrderState() {
    var param_value = document.getElementById("uuid_input").value;
    var param_name = "order_uuid";
    httpPost("change_order_state", param_name, param_value);
}

outputToConsole("init");

document.getElementById("place_order").onclick = function() {
    httpPlaceOrder();
};

document.getElementById("get_all_orders").onclick = function() {
    httpGetAllOrders();
};

document.getElementById("get_num_of_ordered_orders").onclick = function() {
    httpGetNumOfOrderedOrders();
};

document.getElementById("change_order_state").onclick = function() {
    httpPostChangeOrderState();
};

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

outputToConsole("running...");
