function outputToConsole(text) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById("console").prepend(para);
    para.scrollIntoView();
}


function tableOutputToConsole(json_data, row_header) {
    var datensaetze = json_data;
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var tblheader = document.createElement("thead");
    var tblh_tr = document.createElement("tr");

    for (let x = 0; x < row_header.length; x++) {
        const row_header_text = document.createTextNode(row_header[x]);
        var tblh_element = document.createElement("th");
        tblh_element.appendChild(row_header_text);
        tblh_tr.appendChild(tblh_element);
    }

    tblheader.appendChild(tblh_tr);
    tbl.appendChild(tblheader);
    
    for(let i = 0; i < datensaetze.length; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < datensaetze[i].length; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(datensaetze[i][j] );
            cell.appendChild(cellText);                       
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute("border", "2");
    tbl.setAttribute("id","output_table");
    document.getElementById("console").prepend(tbl);
}
    

function clearConsole() {
    document.getElementById("console").innerHTML = "";
}

function httpGet(endpoint_name, variable_context, response_handler) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response_handler(this.responseText);         
        }
    };
    var endpoint = "http://127.0.0.1:5000/" + endpoint_name;
    xmlHttp.open("GET", endpoint, true);
    xmlHttp.send(null);
}

function httpPost(endpoint_name, param_name, param_value, variable_context, response_handler) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response_handler(this.responseText);
        }
    };
    var endpoint = "http://127.0.0.1:5000/" + endpoint_name;
    xmlHttp.open("POST", endpoint, true);
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    var param_json = "{ \"" + param_name + "\" : \"" + param_value + "\" }";
    xmlHttp.send(param_json);
}

function httpGetNextOrders() {
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        var table_header = ["Order ID", "time to wait"];
        tableOutputToConsole(json_data, table_header);
    };
    httpGet("get_timestamp_ten_last_orders_debug", "all orders: ", response_handler);
}

outputToConsole("init");

document.getElementById("display_next_orders").onclick = function() {
    httpGetNextOrders();
};

//document.getElementById("clear_console").onclick = function() {
//    clearConsole();
//};

outputToConsole("running...");
