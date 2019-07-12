var sports= ["Football", "Baseball", "Basketball", "Soccer", "Golf"];

function makeButtons() {
  $("#buttons-view").empty();
  for (let i = 0; i < sports.length; i++) {
    var buttonBuilder = $("<button>");
    buttonBuilder.addClass("sportsBtn");
    buttonBuilder.attr("data-sport", sports[i]);
    buttonBuilder.text(sports[i]);
    $("#buttons-view").append(buttonBuilder);
  };
};
$("#add-sports").click(function(e){
  e.preventDefault();
  var userSport = $("#sports-input").val().trim();
  sports.push(userSport);
  makeButtons();  
});

function giphySearch() {
  $("#sports-images").empty();
  var apiKey = "api_key=BNL3mZRIw0qoOhOBwua4UPr3wEBFagsz";
  var sportsClick = $(this).attr("data-sport");
  var queryUrl = "https://api.giphy.com/v1/gifs/search?" + apiKey + "&q=" + sportsClick + "&limit=10&rating=pg"
  console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var arrayOfGifs= response.data
    for (let j = 0; j < arrayOfGifs.length; j++) {
      var currentGif = arrayOfGifs[j];
      console.log(arrayOfGifs[j].images.fixed_height_still.url);
      var imageHolder = $("<div class= 'gif'>");
      var gifRating = currentGif.rating;
      var p = $("<p>").text("Rating: "+ gifRating);
      imageHolder.append(p);
      var imageUrl = currentGif.images.fixed_height_still.url;
      var sportsImage = $("<img>").attr("src", imageUrl);
      imageHolder.append(sportsImage);
      $("#sports-images").prepend(imageHolder);
      
    };
  });
};
makeButtons();
$(document).on("click", ".sportsBtn", giphySearch);



$(".gif").on("click", function() {
  console.log(this);

  var state = $(this).attr("data-state");
  var animatedUrl = $(this).attr("data-animate");
  var stillUrl = $(this).attr("data-still");

  if (state === "still") {
    $(this).attr("src", animatedUrl);
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", stillUrl);
    $(this).attr("data-state", "still");
  }
});