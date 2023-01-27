function showANumber() {
    document.getElementById("inputfield").value = Math.floor(Math.random() * 10);
}

function httpGet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("inputfield").value = this.responseText;
        }
    };
    var endpoint = "http://127.0.0.1:5000/";
    xmlHttp.open("GET", endpoint, true);
    xmlHttp.send(null);
}
