var movies = ["Kill Bill Vol 1", "Clueless", "Super Troopers", "Ghostbusters", "Futurama", "Game of Thrones"];


function showButtons() {
    $("#buttons").empty();
    for (var i = 0; i < movies.length; i++) {
        var buttonGif = $("<button class='movieGifs btn btn-outline-light'data-name='"+movies[i]+"'>");
        buttonGif.text(movies[i]);
        $("#buttons").append(buttonGif);
      
        var buttonInfo = $("<button class='movieInfo btn btn-outline-light'data-name='"+movies[i]+"'>");
        buttonInfo.text("Info");
        /* buttonInfo.append("<p style='font-size:10px; margin:0;'>"+movies[i]+"</p><span style='font-size:10px; margin:0;'>Info</span>"); */
        $("#buttons").append(buttonInfo);
        $("#buttons").append(buttonInfo);
        /* $("#buttons").append("<div class='col-md-2'><p class='movieGifs'><button class='movieGifs btn btn-outline-light'data-name='"+movies[i]+"'>"+movies[i]+"</button></p><p><button class='movieInfo btn btn-outline-light'data-name='"+movies[i]+"'>Info</button></p></div>") */
    }
}

$("#add-movie").on("click", function(event) {
    event.preventDefault();
    
    var movie = $("#movie-input").val().trim();
    if (movie == "") {
        return false;
      }
    else if (movies.indexOf(movie) === -1) {
        movies.push(movie);
        showButtons();
    }
    else{
        alert("This movie/show has already been added to the list!")
    }
    
});

function showGifs() {
    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var results = response.data
        for (var i = 0; i < results.length; i++) {
          $("#movies-display").prepend("<div class='col-md-4'><p id='rating'>Rating: <span class='text-uppercase'>"+results[i].rating+"</span></p><div style='font-size:13px'>Click to animate!</div><img src='"+results[i].images.fixed_height_still.url+"' class='gif img-fluid' data-still='"+results[i].images.fixed_height_still.url+"' data-animate='"+results[i].images.fixed_height.url+"' data-state='still'></div>")
        
         }

      });
}

function gifAnimate() {
    var dataState = $(this).attr("data-state")
      console.log(dataState)

      if(dataState==="still"){
        var url= $(this).attr("data-animate")
        $(this).attr("src",url)
        $(this).attr("data-state","animate")
      }
      console.log(dataState)

      if(dataState==="animate"){
        var url= $(this).attr("data-still")
        $(this).attr("src",url)
        $(this).attr("data-state","still")
      }
      console.log(dataState)
}

function showMovieInfo() {
    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=11573e66";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        
        $("#movies-display").prepend("<div class='col-md-4'><h4>"+response.Title+"</h4><span>("+response.Type+")</span><p>Rated "+response.Rated+"</p><p>Year Released: "+response.Year+"</p><p style='font-size:15px'>Plot: "+response.Plot+"</p><img src='"+response.Poster+"'></div>");
});
}

$(document).on("click", ".movieGifs", showGifs);
$(document).on("click", ".gif", gifAnimate);
$(document).on("click", ".movieInfo", showMovieInfo);
showButtons();