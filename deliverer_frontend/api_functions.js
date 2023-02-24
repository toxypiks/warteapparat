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

function httpPostNumberOfReadyPizzas() {
    var param_value = document.getElementById("number_ready_pizzas").value;
    var param_name = "number_ready_pizzas"
    httpPost("add_ready_pizzas", param_name, param_value);
}

outputToConsole("init");

document.getElementById("send_number_of_ready_pizzas").onclick = function() {
    httpPostNumberOfReadyPizzas();
}

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

outputToConsole("running...");
