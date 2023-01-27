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

function httpGetRandomNumber() {
    httpGet("","inputfield");  
}

function httpGetState() {
    httpGet("state", "display_state");
}
