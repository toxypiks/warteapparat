function outputToConsole(text) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById("console").appendChild(para);
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
    document.getElementById("console").appendChild(tbl);
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

function httpGetAllOrders() {
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        var table_header = ["Order ID", "Order Time", "Order State"];
        tableOutputToConsole(json_data, table_header);
    };
    httpGet("get_all_orders", "all orders: ", response_handler);
}

function httpGetNumOfOrderedOrders() {
    var variable_context = "num of ordered orders: ";
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        outputToConsole(variable_context + json_data);
    };
    httpGet("get_num_of_ordered_orders", variable_context, response_handler );
}

function httpPlaceOrder() {
    var variable_context = "place_order: ";
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        outputToConsole(variable_context + json_data);
    };
    httpGet("place_order", variable_context, response_handler);
}

function httpPostChangeOrderState() {
    var param_value = document.getElementById("uuid_input").value;
    var param_name = "order_uuid";
    var variable_context = "pizza state changed to picked up: ";
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        outputToConsole(variable_context + json_data);
    };
    httpPost("change_order_state", param_name, param_value,variable_context, response_handler);
}

function httpPostChangeOrderToInvalid() {
    var param_value = document.getElementById("time_limit_input").value;
    var param_name = "time_limit_for_pickup";
    var variable_context = "time limit to pick up pizza: ";
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        outputToConsole(variable_context + json_data);
    };
    httpPost("change_order_state_to_invalid", param_name, param_value, variable_context, response_handler);
}

function httpGetClearDataFromTable() {
    var variable_context = "is cleared: ";
    var response_handler = (response_text) => {
        var json_data = JSON.parse(response_text);
        outputToConsole(variable_context + json_data);
    };
    httpGet("clear_data_from_table", variable_context, response_handler);
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

document.getElementById("change_state_to_invalid").onclick = function() {
    httpPostChangeOrderToInvalid();
};

document.getElementById("clear_table").onclick = function() {
    httpGetClearDataFromTable();
};

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

outputToConsole("running...");
