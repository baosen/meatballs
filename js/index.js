function getResources() {
	$('#resourceDisplay').empty();
    $('#resourceTable').empty();
    $('#instanceDisplay').empty();
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
		            table += "<td><button class='btn btn-default' onclick='showDetails(\"" + value.singular + "\")'>Details</button></td>";
                    table += "<td>" + '<button class=\"btn btn-primary\" onclick="goToResource(\'' + value.href + '.json\', ' + index + ')">View</button></td>';
                table += "</div>";
        table += "</tr>";

		table += "<tr><td colspan=\"3\" ><div id=\"" + value.singular + "\" style=\"display:none\">";

        table += "<table class='table resourceList'>"
            table += "<tbody>"
                for(key2 in value) {
                    var value2 = value[key2];
                    /* breaks up url's on the last slash to save space */
                    if (key2 === 'href'){
                        var url =  value2;
                        var last_part = url.substring(url.lastIndexOf('/') + 1);
                        var first_part = url.replace(last_part, "<wbr />");
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
    var info = '<h3 class=\"headerText\">' + displayNames[currentIndex] + '</h3>';
    info += "<p class=\"paginator\"> Total: " + json.pager.total;
    if (json.pager.pageCount > 1) {
        info += "  Current page: " + json.pager.page + " of " + json.pager.pageCount + "&nbsp;";
	    if(json.pager.page == 1) {
            var nextPage = json.pager.nextPage;
            //Removes the link part after a ?, the link is on the form "organisationUnits?page=3"
            //but to get a JSON-object we can not simply append .json to this. The link we need will in this example be:
            //organisationUnits.json?page=3
            nextPage = nextPage.split("\?")[0];
            nextPage += ".json?page=";
            nextPage += json.pager.page + 1;
            console.log(nextPage);
            var addString = "<button class=\"btn btn-info resourceButtonsAlign\" onclick=\"updateResource(\'" + nextPage + "\')\">Next page</button>";
            console.log(addString);
            info += addString;
        } else if (json.pager.page == json.pager.pageCount) {
            var previousPage = json.pager.prevPage;
            previousPage = previousPage.split("?")[0];
            previousPage += ".json?page=";
            previousPage += json.pager.page - 1;
            var addString = "<button class=\"btn btn-info btnSpacer resourceButtonsAlign\" onclick=\"updateResource(\'" + previousPage + "\')\">Previous Page</button>";
            info += addString;
        } else if (json.pager.page == 2) {
            var nextPage = json.pager.nextPage;
            nextPage = nextPage.split("\?")[0];
            nextPage += ".json?page=";
            nextPage += json.pager.page + 1;
            var addString2 = "<button class=\"btn btn-info resourceButtonsAlign\" onclick=\"updateResource(\'" + nextPage + "\')\">Next page</button>";
            info += addString2;
            var previousPage = json.pager.prevPage;
            previousPage += ".json";
            var addString = "<button class=\"btn btn-info btnSpacer resourceButtonsAlign\" onclick=\"updateResource(\'" + previousPage + "\')\">Previous Page</button>";
            info += addString;

        } else {

            var nextPage = json.pager.nextPage;
            nextPage = nextPage.split("\?")[0];
            nextPage += ".json?page=";
            nextPage += json.pager.page + 1;
            var addString2 = "<button class=\"btn btn-info resourceButtonsAlign\" onclick=\"updateResource(\'" + nextPage + "\')\">Next page</button>";
            info += addString2;
            var previousPage = json.pager.prevPage;
            previousPage = previousPage.split("?")[0];
            previousPage += ".json?page=";
            previousPage += json.pager.page - 1;
            var addString = "<button class=\"btn btn-info btnSpacer resourceButtonsAlign\" onclick=\"updateResource(\'" + previousPage + "\')\">Previous Page</button>";
            info += addString;
        }

        info +="</p>"
    } else {

    }
    $('#resourceDisplay').append(info);

	var table = "<table class=\"table table-striped resourceList\">";

    table += "<tbody><tr class=\"resourceHeader\">";
    for (var key in resource) {
		var value = resource[key];
		table += "<td class=\"column2\">" + value.name + "</td>";
        table += "<td><button class='btn btn-default resourceButtonsAlign\' onclick='showDetails(\"" + value.id + "\")'>Details</button></td>";
        table += "<td><button class='btn-primary btn resourceButtonsAlign\' onclick=\"getInstance(\'" + value.href + ".json\')\">View</button></td>";
		table += "</tr>";

        table += "<tr><td><div id =\"" + value.id + "\" style=\"display:none\">";
        table += "<table class='table'>";
        table += "<tbody>";

        for(key2 in value) {
            var value2 = value[key2];
            if(key2 === 'href') {
                var url = value2;
                var last_part = url.substring(url.lastIndexOf('/') + 1);
                var first_part = url.replace(last_part, "<wbr />");
                table += "<tr><td>" + key2 + "</td><td>" + first_part + last_part + "</td></tr>";
            } else {
                table += "<tr><td>" + key2 + "</td><td>" + value2 + "</td></tr>";
            }
        }
            table += "</tbody>";
            table += "</table>";

            table += "</div></td></tr>";
    }
    table += "</tbody></table>";
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
    $('html, body').animate({scrollTop: 0}, 'fast');
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
    $('html, body').animate({scrollTop: 0}, 'fast');
}

function displayInstance(json) {
    console.log("displayInstance");
    
    $('#instanceDisplay').empty();

    var instance = json;

    var info = "";
    console.log(instance.name);
    info += "<h3 class=\"headerText\">" + instance.name + '</h3>';

    info += "<p class=\"instanceId\">Instance id: " + instance.id + "</p>";

    $('#instanceDisplay').append(info);

    var str = JSON.stringify(instance, null, "\n");
    var indentation = -1;
    var array = str.split("\n");
    console.log("array:");
    console.log(array);
    var toPrint = "<table class=\"table table-striped resourceList\" ><tbody><tr> ";

    for (line in array) {
        if (array[line] === "") {

        } else if (array[line] === "{") {
            console.log("Indentation +1");
            indentation += 1;
        } else if (array[line] === "}" || array[line] === "}," ) {
            indentation -= 1;
            console.log("Indentation -1");
        } else {
            if (array[line].substr(array[line].length - 1) === "{"){
                console.log("At end of line, Indentation +1");
                toPrint += "<td style='border-top: 1px solid #ddd'>";
                for (var i = 0; i < indentation; i += 1) {
                    toPrint += "&nbsp";
                    toPrint += "&nbsp";
                    toPrint += "&nbsp";
                    toPrint += "&nbsp";
                }
                indentation += 1;
                toPrint += array[line].substr(0, array[line].length - 1) + "</td></tr>";
            } else {
                toPrint += "<td style='border-top: 1px solid #ddd'>";
                for (var i = 0; i < indentation; i += 1) {
                    toPrint += "&nbsp";
                    toPrint += "&nbsp";
                    toPrint += "&nbsp";
                    toPrint += "&nbsp";
                }
                toPrint += array[line].split('"').join(' ') + "</td></tr>";
            }
        }
    }
    toPrint += " </tbody></table>";
    console.log(toPrint);
    $('#instanceDisplay').append(toPrint);
}

