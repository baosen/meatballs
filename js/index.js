function getResources() {
    console.log("getResources");
    $.get("/api/resources.json", function(data) {
        console.log(data);
        createTable(data);
    });
}

function goToList(link) {
    console.log("goToJson");
    $.get(link, function(data) {
        console.log(data);
        printList(data);
    });
}

function test() {
    console.log("Clicked a button-test-");
}

function printList(json){

 console.log("printList");
    $('#resourceTable').empty();

    console.log("TEST");

    var key, count = 0;
    var list = Object.keys(json)[1];
    for (key in list) {
        if(list.hasOwnProperty(key)) {
            var res = list[key];
            var tableString = "<tr>";
            //console.log(res.singular);
            //console.log(key);
            tableString += "<td>" + res.name + "</td>";
            tableString += "<td>" + '<button onclick="goToList(\'' + res.href + '.json' + '\')">Go to</button></td>';
            tableString += "</tr>";
            $('#resourceTable').append(tableString);

            count++;
        }
    }
    console.log("count = " + count);
    console.log(json.length);
    /*for(var i = 0; i < count; i++) {
        var res = json.resources[i];
        var tableString = "<tr>";
        //console.log(res.singular);
        tableString += "<td>" + res.href + "</td>";
        tableString += "<td>" + '<button onclick="test()">test</button></td>';
        tableString += "<td>" + '<button onclick="goToJson(\'' + res.href + '\')">Go to</button></td>';
        tableString += "</tr>";
        $('#resourceTable').append(tableString);

    }
    */
    console.log("createTable done");
}   


function createTable(json) {
    console.log("createTable");
    $('#resourceTable').empty();

    console.log("TEST");

    var key, count = 0;
    for (key in json.resources) {
        if(json.resources.hasOwnProperty(key)) {
            var res = json.resources[key];
            var tableString = "<tr>";
            //console.log(res.singular);
            //console.log(key);
            tableString += "<td>" + res.singular + "</td>";
            tableString += "<td>" + '<button onclick="goToList(\'' + res.href + '.json' + '\')">Go to</button></td>';
            tableString += "</tr>";
            $('#resourceTable').append(tableString);

            count++;
        }
    }
    console.log("count = " + count);
    console.log(json.length);
    /*for(var i = 0; i < count; i++) {
        var res = json.resources[i];
        var tableString = "<tr>";
        //console.log(res.singular);
        tableString += "<td>" + res.href + "</td>";
        tableString += "<td>" + '<button onclick="test()">test</button></td>';
        tableString += "<td>" + '<button onclick="goToJson(\'' + res.href + '\')">Go to</button></td>';
        tableString += "</tr>";
        $('#resourceTable').append(tableString);

    }
    */
    console.log("createTable done");
}
