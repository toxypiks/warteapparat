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
    var param_json = "{ \"" + param_name + "\" : " + param_value + " }"
    xmlHttp.send(param_json);
}

function httpPostInputNumber() {
    var param_value = document.getElementById("second_state_input").value;
    var param_name = "2nd_state";
    httpPost("post_sec_state", param_name, param_value);
}

function httpGetAllOrders() {
    httpGet("get_all_orders", "all orders: ");
}

function httpGetSecondState() {
    httpGet("get_sec_state", "second state: ");
}

function httpGetSecondIncreasedState() {
    httpGet("add_sec_state", "increased second state: ");
}

function httpGetState() {
    httpGet("state", "state: ");
}

function httpPlaceOrder() {
    httpGet("place_order", "place_order: ");
}

function httpPostPizzaId() {
    var param_value = document.getElementById("post_pizza_id").value;
    var param_name = "pizza";
    httpPost("pick_up_pizza", param_name, param_value);
}

outputToConsole("init");

document.getElementById("get_state").onclick = function() {
    httpGetState();
};

document.getElementById("place_order").onclick = function() {
    httpPlaceOrder();
};

document.getElementById("get_all_orders").onclick = function() {
    httpGetAllOrders();
};

document.getElementById("post_input_number").onclick = function() {
    httpPostInputNumber();
};

document.getElementById("get_second_state").onclick = function() {
    httpGetSecondState();
};

document.getElementById("get_second_increased_state").onclick = function() {
    httpGetSecondIncreasedState();
};

document.getElementById("pick_up_pizza").onclick = function() {
    httpPostPizzaId();
};

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

outputToConsole("running...");
