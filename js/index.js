function getResources() {
    console.log("getResources");
    $.get("/api/resources.json", function(data) {
        console.log(data);
        createTable(data);
    });
}

function goToJson(link) {
    console.log("goToJson");
    $.get(link, function(data) {
        console.log(data);
        createTable(data);
    });
}

function test(json) {
    console.log("Clicked a button-test-");
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
            tableString += "<td>" + '<button onclick="test()">test</button></td>';
            tableString += "<td>" + '<button onclick="goToJson(\'' + res.href + '\')">Go to</button></td>';
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
