function getResources() {
    $.get("/api/resources", function(data) {
        createTable(data);
    });
}

function createTable(json) {
    $('#resourceTable').empty();

    for(var i = 0; i < json.length; i++) {
        var res = json[i];
        var tableString = "<tr>";
        tableString += "<td>" + student.displayName + "</td>";
        tableString += "</tr>";
        $('resourceTable').append(tableString);
    }
}
