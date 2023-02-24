function outputToConsole(text) {
    var para = document.createElement("p");
    var node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById("console").appendChild(para);
    para.scrollIntoView();
}


function tableOutputToConsole(json_data) {
    var datensaetze = json_data;
    var tbl = document.createElement("table");
    var tblh_tr = document.createElement("tr");
    var tblBody = document.createElement("tbody");
    var tblh_order_id = document.createElement("th");
    var tblh_timestamp = document.createElement("th");
    var tblh_order_state = document.createElement("th");
    var tblheader = document.createElement("thead");

    const order_id_text = document.createTextNode("Order ID");
    const order_timestamp_text = document.createTextNode("Order Time");
    const order_state_text = document.createTextNode("Order State");

    tblh_order_id.appendChild(order_id_text);
    tblh_timestamp.appendChild(order_timestamp_text);
    tblh_order_state.appendChild(order_state_text);

    tblh_tr.appendChild(tblh_order_id);
    tblh_tr.appendChild(tblh_timestamp);
    tblh_tr.appendChild(tblh_order_state);

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

function httpGet(endpoint_name, variable_context) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // ToDo: für verschiede anfragen verschiedenes Handling
            // register handler
            if(variable_context == "all orders: ") {
                var json_data = JSON.parse(this.responseText);
                tableOutputToConsole(json_data);
            } else {
                outputToConsole(variable_context + this.responseText);
            }          
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
            var jsonResponse = JSON.parse(this.responseText);
            // ToDo
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

function httpGetChangeOrderToInvalid() {
    httpGet("change_order_state_to_invalid", "changed_orders: ");
}

function httpGetClearDataFromTable() {
    httpGet("clear_data_from_table", "is cleared: ");
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
    httpGetChangeOrderToInvalid();
};

document.getElementById("clear_table").onclick = function() {
    httpGetClearDataFromTable();
};

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

outputToConsole("running...");
