$(document).ready(function(){

    $.ajax({
        url: "/api",
        method: "GET"
    }).then(function(response){
        console.log(response);
        for(var i = 0; i < response.length; ++i){
        var row = $("div");
        row.append($("<h2>").text(response[i].title));
        row.append($("<img>").attr("src" , response[i].imgSrc));
        row.append($("<h7>").text(response[i].links));
        row.append($("<br>"));
        row.append($("<br>"));
        row.append($("<button class='comment btn btn-primary' id=" + i + ">").text("Comment"));
        row.append("\t");
        row.append($("<button class='delete btn btn-danger' id=" + i + ">").text("Delete"));
        $("#trends").append(row);
    }
    });

})