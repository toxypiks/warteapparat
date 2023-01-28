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

function httpPost(endpoint_name, input_element_name) {
    var xmlHttp = new XMLHttpRequest();
    var param = document.getElementById(input_element_name).value;
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
    var endpoint = "http://127.0.0.1:5000/" + endpoint_name;
    xmlHttp.open("POST", endpoint, true);
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttp.send(param);
}

function httpPostInputNumber() {
    httpPost("post_sec_state", "second_state_input");
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
