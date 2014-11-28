function getResources() {
	$('#resourceDisplay').empty();
    $('#resourceTable').empty();

    $.get("/api/resources.json", function(data) {
        fillResourceTable(data);
    });
}

var displayNames = [];
var currentIndex; // hack.

function displayEntries(object) {
    var index = 0;
    for (var key in object) {
        var value = object[key];
        var table = "<tr>";
        table += "<td>" + value.displayName + "</td>";
		table += "<td><button onclick='showDetails(\"" + value.singular + "\")'>Details</button></td>";
        table += "<td>" + '<button onclick="goToResource(\'' + value.href + '.json\', ' + index + ')">Go to</button></td>';
        table += "</tr>";

		table += "<tr><td><div id=\"" + value.singular + "\" style=\"display:none\">";

		for(key2 in value) {
			var value2 = value[key2];
			table += "<p>" + key2 + ": " + value2 + "</p>"; // maybe do some nice formatting here...
		}
		table += "</div></td></tr>";
        $('#resourceTable').append(table);
        displayNames.push(value.displayName);
        index++;
    }
    console.log(displayNames);
}

function getResourceObject(json) {
    return Object.keys(json)[1];
}

function showResource(json) {
	$('#resourceDisplay').empty();

    var resource = json[getResourceObject(json)];

	// Build a table displaying data of a resource.
    // Print total, mainly for testing purposes.
    var info = '<b>' + displayNames[currentIndex] + '</b><br>';
    info += "<tr><td>Total: " + json.pager.total + "</td></tr>";
	$('#resourceDisplay').append(info);

	var table = "<tr>";
    for (var key in resource) {
		var value = resource[key];
		table += "<td>" + value.name + "</td>";
		table += "</tr>";
    }
	table += '<td><button onclick="alert(\'Not implemented yet...\')">Next page</button></td>';

	$('#resourceDisplay').append(table);
}

function goToResource(link, index) {
    currentIndex = index;

    $.get(link, function(data) {
        showResource(data);
    });
}

function fillResourceTable(json) {
	displayEntries(json.resources);
}

function showDetails(id) {
	var idString = "#" + id;
	$(idString).slideToggle("slow");
}
