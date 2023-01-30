function outputToConsole(text) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById("console").appendChild(para);
    para.scrollIntoView();
}

function httpGet(endpoint_name, display_element_name) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(display_element_name).value = this.responseText;
        }
    };
    var endpoint = "http://127.0.0.1:5000/" + endpoint_name;
    xmlHttp.open("GET", endpoint, true);
    xmlHttp.send(null);
}

function httpPost(endpoint_name, input_element_name, param_name, param_value) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
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
    httpPost("post_sec_state", "second_state_input", param_name, param_value);
}

function httpGetSecondState() {
    httpGet("get_sec_state", "second_state_output");
}

function httpGetSecondIncreasedState() {
    httpGet("add_sec_state", "show_increased_sec_state");
}

function httpGetRandomNumber() {
    httpGet("","inputfield");  
}

function httpGetState() {
    httpGet("state", "display_state");
}

function httpGetStateAndIncrement() {
    httpGet("inc_state", "display_and_increment_state");
}

outputToConsole("init");

document.getElementById("random_number").onclick = function() {
    httpGetRandomNumber();
};

document.getElementById("get_state").onclick = function() {
    httpGetState();
};

document.getElementById("get_state_increment").onclick = function() {
    httpGetStateAndIncrement();
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

outputToConsole("running...");
