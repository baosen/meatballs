function getResources() {
    console.log("getResources");
    $.get("/api/resources.json", function(data) {
        console.log(data);
        createTable(data);
    });
}

function createTable(json) {
    console.log("createTable");
    //$('#resourceTable').empty();

    console.log("TEST");

    var key, count = 0;
    for (key in json.resources) {
        if(json.resources.hasOwnProperty(key)) {
            count++;
        }
    }
    console.log("count = " + count);
    console.log(json.length);
    for(var i = 0; i < count; i++) {
        var res = json.resources[i];
        var tableString = "<tr>";
        //console.log(res.singular);
        tableString += "<td>" + res.singular + "</td>";
        tableString += "</tr>";
        $('#resourceTable').append(tableString);

    }

    console.log("createTable done");
}
