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
        var table = "<tbody>";
        table += "<tr>";
            table += "<td class='resourceHeader'>" + value.displayName +  "</td>";
                table += "<div class=\"resourceButtonsAlign\">";
		            table += "<td><button class='btn' onclick='showDetails(\"" + value.singular + "\")'>Details</button></td>";
                    table += "<td>" + '<button class=\"btn btn-primary\" onclick="goToResource(\'' + value.href + '.json\', ' + index + ')">Go to:&nbsp;<span class="badge">4</span></button></td>';
                table += "</div>";
        table += "</tr>";

		table += "<tr><td><div id=\"" + value.singular + "\" style=\"display:none\">";

        table += "<table class='table'>"
            table += "<tbody>"
                for(key2 in value) {
                    var value2 = value[key2];
                    /* breaks up url's on the last slash to save space */
                    if (key2 === 'href'){
                        var url =  value2;
                        var last_part = url.substring(url.lastIndexOf('/') + 1);
                        var first_part = url.replace(last_part, "<wbr />&#8203;"); // Hack to add non-width characters for breaking up url without space etc.
                        table += "<tr><td>" + key2 + "</td><td>" +  first_part  +  last_part + "</td></tr>";
                    }else {
                        table += "<tr><td>" + key2 + "</td><td>" + value2 + "</td></tr>";
                    }// maybe do some nice formatting here...
		        }
            table += "</tbody>"
        table += "</table>"

        table += "</div></td></tr></tbody>";
        $('#resourceTable').append(table);
        displayNames.push(value.displayName);
        index++;
    }
    console.log(displayNames);
}

function getResourceObject(json) {
    return json[Object.keys(json)[1]];
}

function showResource(json) {
	$('#resourceDisplay').empty();

    var resource = getResourceObject(json);

	// Build a table displaying data of a resource.
    // Print total, mainly for testing purposes.
    var info = '<b>' + displayNames[currentIndex] + '</b><br>';
    info += "Total: " + json.pager.total;
    if (json.pager.pageCount > 1) {
        info += "  Current page: " + json.pager.page + " of " + json.pager.pageCount;
	    if(json.pager.page == 1) {
            var nextPage = json.pager.nextPage;
            //Removes the link part after a ?, the link is on the form "organisationUnits?page=3"
            //but to get a JSON-object we can not simply append .json to this. The link we need will in this example be:
            //organisationUnits.json?page=3
            nextPage = nextPage.split("\?")[0];
            nextPage += ".json?page=";
            nextPage += json.pager.page + 1;
            console.log(nextPage);
            var addString = "<button onclick=\"updateResource(\'" + nextPage + "\')\">Next page</button>";           
            console.log(addString);
            info += addString;
        } else if (json.pager.page == json.pager.pageCount) {
            var previousPage = json.pager.prevPage;
            previousPage = previousPage.split("?")[0];
            previousPage += ".json?page=";
            previousPage += json.pager.page - 1;
            var addString = "<button onclick=\"updateResource(\'" + previousPage + "\')\">Previous Page</button>";
            info += addString;
        } else if (json.pager.page == 2) {
            var previousPage = json.pager.prevPage;
            previousPage += ".json";
            var addString = "<button onclick=\"updateResource(\'" + previousPage + "\')\">Previous Page</button>";
            info += addString;
            var nextPage = json.pager.nextPage;
            nextPage = nextPage.split("\?")[0];
            nextPage += ".json?page=";
            nextPage += json.pager.page + 1;
            var addString2 = "<button onclick=\"updateResource(\'" + nextPage + "\')\">Next page</button>";    
            info += addString2;
        } else {
            var previousPage = json.pager.prevPage;
            previousPage = previousPage.split("?")[0];
            previousPage += ".json?page=";
            previousPage += json.pager.page - 1;
            var addString = "<button onclick=\"updateResource(\'" + previousPage + "\')\">Previous Page</button>";
            info += addString;
            var nextPage = json.pager.nextPage;
            nextPage = nextPage.split("\?")[0];
            nextPage += ".json?page=";
            nextPage += json.pager.page + 1;
            var addString2 = "<button onclick=\"updateResource(\'" + nextPage + "\')\">Next page</button>";    
            info += addString2;
        }
        info +="</tr>"
    } else {

    }
    $('#resourceDisplay').append(info);

	var table = "<table>";
    for (var key in resource) {
		var value = resource[key];
        table = "</tr>";
		table += "<td>" + value.name + "</td>";
        table += "<td><button class=\"btn\" onclick=\"getInstance(\'" + value.href + ".json\')\">Details</button></td>";
		table += "</tr>";
        table += "</table>";

    }

	$('#resourceDisplay').append(table);
}

function updateResource(link) {
    $.get(link, function(data) {
        console.log("updateResource");
        console.log(data);
        showResource(data);
    });
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

function getInstance(link) {
    $.get(link, function(data) {
        console.log("getInstance");
        console.log(data);
        displayInstance(data);
    });
}

function displayInstance(json) {
    console.log("displayInstance");
    
    $('#instanceDisplay').empty();

    var instance = json;

    var info = "";
    console.log(instance.name);
    info += instance.name + " ,";
    info += instance.id;

    $('#instanceDisplay').append(info);
}
