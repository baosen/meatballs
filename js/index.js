function getResources() {
    $.get("/api/resources", function(data) {
        createTable(data);
    });
}
