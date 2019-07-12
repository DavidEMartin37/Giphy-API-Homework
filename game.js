
var sports= ["Football", "Baseball", "Basketball", "Soccer", "Hockey", "Golf", "Tennis"];

function makeButtons() {
  $("#buttons-view").empty();
  for (let i = 0; i < sports.length; i++) {
    var buttonBuilder = $("<button>");
    buttonBuilder.addClass("sportsBtn");
    buttonBuilder.addClass("btn-sm");
    buttonBuilder.addClass("btn-primary");
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
    
    $("#sports").empty();
    for (let j = 0; j < arrayOfGifs.length; j++) {
      var currentGif = arrayOfGifs[j];
      console.log(arrayOfGifs[j].images.fixed_height_still.url);
      var imageHolder = $("<div class= 'ml-4 float-left gif'>");
      
      var gifRating = currentGif.rating;
      var p = $("<p>").text("Rating: "+ gifRating);
      imageHolder.append(p);
      var animate = currentGif.images.fixed_height.url;
      var still = currentGif.images.fixed_height_still.url;
      var sportsImage = $("<img>");
      sportsImage.addClass("sports-image");
      sportsImage.attr("src", still);
      sportsImage.attr("data-still", still);
      sportsImage.attr("data-animate", animate);
      sportsImage.attr("data-state", "still");
      imageHolder.append(sportsImage);
      $("#sports").append(imageHolder);
      
      
      
      
      
      
    };
  });
};
makeButtons();
$(document).on("click", ".sportsBtn", giphySearch);



$(document).on("click", ".sports-image", function(){
  if ($(this).attr("data-state") === "still") {
    console.log("was still")
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    console.log("was animate")
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}
});

