/**
 * Weather application script
 */

// Global variables
// This is our API key]
var APIKey = '5c3e3f0f93f71de6ee35b8c58f101473';
// Here we are building the URL we need to query the database
var queryURL ='https://api.openweathermap.org/data/2.5/weather?'
+ 'q=Atlanta,Georgia&appid=5c3e3f0f93f71de6ee35b8c58f101473'

// Function definitions

// this is me calling the api so that I can get information from it
$.ajax({
    url: queryURL,
    method: 'GET'
  })

// this is where the data I want from the api will go
.then(function(response){
    console.log(queryURL);
    console.log(response);
})

// Function calls
// Event listeners