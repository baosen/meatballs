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
    console.log(json);
    $('#resourceTable').empty();

    /* Used when testing
    console.log("json[0] = ");
    console.log(Object.keys(json)[0]);
    console.log("json[1] = ");
    console.log(Object.keys(json)[1]);
    console.log("list?");
    console.log(json[Object.keys(json)[1]]);
    */

    //Print total, mainly for testing purposes
    var info = "<tr><td>Total: " + json.pager.total + "</td></tr>";


    $('#resourceTable').append(info);

    var key, count = 0;
 
    //Takes the name from the second key in the json and then accesses it to bind list to the array it contains
    var nameOfList = Object.keys(json)[1];
    var list = json[nameOfList];
 

    for (key in list) {
        if(list.hasOwnProperty(key)) {
            var res = list[key];
            var tableString = "<tr>";
            console.log(res.name);
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
