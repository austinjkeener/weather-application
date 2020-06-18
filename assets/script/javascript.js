/**
 * Weather application script
 */

// Global variables
var city
var storage = [];
// below this line is what i am using to get the current weather conditions
// var queryURL ='https://api.openweathermap.org/data/2.5/weather?q=&appid=5c3e3f0f93f71de6ee35b8c58f101473';
// below is the url that is going to be used to grab the uvi rating
// var queryURL2 = 'https://api.openweathermap.org/data/2.5/uvi?appid=5c3e3f0f93f71de6ee35b8c58f101473&lat=-29.25351&lon=-92.50555';
// Function definitions
// var queryURL3 = 'https://api.openweathermap.org/data/2.5/forecast?q=Atlanta,Georgia&appid=5c3e3f0f93f71de6ee35b8c58f101473';

// this is me calling queryURL api so that I can get information from it
// $.ajax({
//     url: queryURL,
//     method: 'GET'
//   }).then(function(response){
//   //these strings contain information about the weather condition of the city.
//   console.log(response);
//   var weatherImage = $("<img>");
//   $(weatherImage).css("width","100px");
//   var iconCode = response.weather[0].icon;
//   var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
//   weatherImage.attr("src",iconUrl);
//   $(".mycard").append(weatherImage);
//     var weather = $("<p>");
//     $(weather).text("");
//     $(".weather").append(response.name);
//     $(".weather").append(response.weather[0].main);
//     $(".weather").append(moment().format('MMMM Do YYYY, h:mm:ss a'));
//     $(".weather").append("Feels like " + response.main.feels_like);
//     $(".weather").append("The humidity is " + response.main.humidity);
//     $(".weather").append("The humidity is " + response.wind.speed);
//     $(".weather").css("float","");
//     console.log(response.name);
//     console.log(response.weather[0].main);
//     console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
//     console.log("Feels like " + response.main.feels_like);
//     console.log("The humidity is " + response.main.humidity);
//     console.log("The wind speed is " + response.wind.speed);
// })

// this ajax request is getting the uvi information from the queryURL2. I need to remove console.log and append into the 'today' card on web page.
// $.ajax({
//   url: queryURL2,
//   method: 'GET'
// }).then(function(response){
//   var weather = $("<p>");
//   $(weather).text("");
//   $(".weather").append("Your UVI rating is " + response.value);
// })

//this ajax request is for getting the five day forecast
var queryURL3 = 'https://api.openweathermap.org/data/2.5/forecast?q=Atlanta,Georgia&appid=5c3e3f0f93f71de6ee35b8c58f101473';
$.ajax({
  url: queryURL3,
  method: 'GET'
}).then(function(response){
  // console.log("The current five day forecast is below.")
  // console.log(response.list[0].dt_txt);
  // console.log(response.list[0]);
  // console.log(response.list[8].dt_txt);
  // console.log(response.list[8]);
  // console.log(response.list[16].dt_txt);
  // console.log(response.list[16]);
  // console.log(response.list[24].dt_txt);
  // console.log(response.list[24]);
  // console.log(response.list[32].dt_txt);
  // console.log(response.list[32]);
})

function fiveDay(fiveDay){
  console.log(fiveDay);
  var queryURL3 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fiveDay + '&appid=5c3e3f0f93f71de6ee35b8c58f101473';
$.ajax({
  url: queryURL3,
  method: 'GET'
}).then(function(response){
  console.log(response);
  $(".five-day").append("The current five day forecast is below.")
  $(".five-day").append(response.list[0].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[0]);
  $(".five-day").append(response.list[8].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[8]);
  $(".five-day").append(response.list[16].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[16]);
  $(".five-day").append(response.list[24].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[24]);
  $(".five-day").append(response.list[32].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[32]);
})

}

//uvi function
//this is going to be a function for uvi. it is going to show a color that appears when the uvi button is clicked that changes depending on what the current uvi rating is
function uviCaller(){
  // $(".uvi").prepend("<h3>UVI index</h3>");
  var green = $(".green").css("background-color", "#00ff00");
  var yellow = $(".yellow").css("background-color", "#ffff00");
  var orange = $(".orange").css("background-color", "#ffa500");
  var red = $(".red").css("background-color", "#ff0000");
  //   if (response.value <= 2){
  //   return (green);
  // } else if (response.value >= 3 && <= 5){
  //   return (yellow);
  // }else if (response.value >= 6 && <= 7) {
  //   return (orange);
  // } else if (response.value >= 8 && <= 10) {
  //   return (red);
  // }
}

function submitBtn(){
  var submitBtn = document.querySelector(".submitbtn");
  submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    var searchApi = $(".form-control").val().trim(); //.trim removes blank space within string while using 
    console.log(searchApi);
    city = searchApi;
    storage.push(city);
    localStorage.setItem("store",JSON.stringify(storage));
    getWeather(city);
    fiveDay(city);
  })
}

function getStorage(){
  $("#history").empty();
  var storageArray = JSON.parse(localStorage.getItem("store"));
  console.log(storageArray);
  for(i=0;i<storageArray.length;i++){
    var historyLi = $("<li>").text(storageArray[i]);
    $("#history").append(historyLi);
  }
}

console.log(localStorage);
function getWeather(city){
  var queryURL ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=5c3e3f0f93f71de6ee35b8c58f101473';
  $.ajax(
    {
    url: queryURL,
    method: "GET"
    }
  ).then(function(response){
    $(".weather").empty();
    console.log(response);
    var weather = $("<p>").text(response.name);
    $(".weather").append(weather);
    $(".weather").append(response.name);
    $(".weather").append(response.weather[0].main);
    $(".weather").append(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $(".weather").append("Feels like " + response.main.feels_like);
    $(".weather").append("The humidity is " + response.main.humidity);
    $(".weather").append("The wind speed is " + response.wind.speed);
    $(".weather").css("float","");
    uvi(response.coord.lat, response.coord.lon);
  })
}

function uvi(lat,lon){
console.log(lat,lon);
var queryURL2 = 'https://api.openweathermap.org/data/2.5/uvi?appid=5c3e3f0f93f71de6ee35b8c58f101473&lat=' + lat + '&lon=' + lon;
$.ajax({
  url: queryURL2,
  method: 'GET'
}).then(function(response){
  console.log(response);
  var weather = $("<p>");
  $(weather).text("");
  $(".weather").append("Your UVI rating is " + response.value);
})
}
// Function calls
uviCaller();
submitBtn();
getStorage();
// Event listeners