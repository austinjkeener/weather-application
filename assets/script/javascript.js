/**
 * Weather application script
 */

// Global variables
// below this line is what i am using to get the current weather conditions
var queryURL ='https://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia&appid=5c3e3f0f93f71de6ee35b8c58f101473';
// below is the url that is going to be used to grab the uvi rating
var queryURL2 = 'https://api.openweathermap.org/data/2.5/uvi?appid=5c3e3f0f93f71de6ee35b8c58f101473&lat=-29.25351&lon=-92.50555';
// Function definitions

// this is me calling queryURL api so that I can get information from it
$.ajax({
    url: queryURL,
    method: 'GET'
  })

// this is where the data I want from queryAPI will go. I need to remove console.log and append into the 'today' card on web page.
.then(function(response){
  //these strings contain information about the weather condition of the city.
    console.log(response.name);
    console.log(response.weather[0].main);
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    console.log("Feels like " + response.main.feels_like);
    console.log("The humidity is " + response.main.humidity);
    console.log("The wind speed is " + response.wind.speed);
})

// this ajax request is getting the uvi information from the queryURL2. I need to remove console.log and append into the 'today' card on web page.
$.ajax({
  url: queryURL2,
  method: 'GET'
}).then(function(response){
  //these strings contain information about the weather condition of the city.
  console.log("Your UVI rating is " + response.value); 
})

//uvi function
//this is going to be a function for uvi. it is going to show a color that appears when the uvi button is clicked that changes depending on what the current uvi rating is
function uviCaller(){
  $(".uvi").prepend("<h3>UVI index</h3>");
  $(".green").css("background-color", "#00ff00");
  $(".yellow").css("background-color", "#ffff00");
  $(".orange").css("background-color", "#ffa500");
  $(".red").css("background-color", "#ff0000");
}
// Function calls
uviCaller();
// Event listeners