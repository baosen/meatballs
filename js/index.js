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

    for(var i = 0; i < json.length; i++) {
        var res = json[i];
        var tableString = "<tr>";
        tableString += "<td>" + res.singular + "</td>";
        tableString += "</tr>";
        $('resourceTable').append(tableString);
        //document.getElementById("resourceTable").innerHTML =

    }

    console.log("createTable done");
}
