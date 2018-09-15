console.log("Connected to the Dallas Restaurant Tracker");
var baseURL = window.location.origin

$("#addVenue").on("click" , function(event){
    event.preventDefault();
    var data = {
        name: $("#nameInput").val().trim(),
        food: $("#foodInput").val().trim(),
        rating: $("#ratingInput").val().trim()
    }
    console.log(data);
    console.log(baseURL);
    $.ajax({
        url:baseURL + "/api/venues",
        method:"POST",
        data:data
    }).then(function(response){
        console.log(response);
        console.log("Added new venue!");
        location.reload();
    });
});

$(".visitedVenue").on("click" , function(event){
    event.preventDefault();
    var id = $(this).data("venueid");
    console.log(id);
    $.ajax({
        url:baseURL + "/api/venues/" + id,
        method:"PUT"
    }).then(function(response){
        window.location.replace("/");
    })
});