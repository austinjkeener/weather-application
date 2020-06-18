/**
 * Weather application script
 */

// Global variables
var city
var storage = [];

// This is the function that is defining my five day forecast
function fiveDay(fiveDay){
  // this is the api that is being used to get information from the open weather map servers
  var queryURL3 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fiveDay + '&appid=5c3e3f0f93f71de6ee35b8c58f101473';
  // this is the ajax request that is being used to call the servers so that I can set up parameters in the .then call back function to specify what information that I want on my website.
$.ajax({
  url: queryURL3,
  method: 'GET'
}).then(function(response){
  // this is a list of all of the parameters that i want specified to go onto my website. they are being appended to a div called five-day which is where the information is being displayed to the user
  $(".five-day").append("The current five day forecast is below.")
  $(".five-day").append(response.list[0].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[8].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[16].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[24].dt_txt.split(' ')[0]);
  $(".five-day").append(response.list[32].dt_txt.split(' ')[0]);
})

}

//this has been programmed to show the colors of the uvi spectrum on the web page. It correllates with the html page where the actual UVI index is being displayed
function uviCaller(){
$(".green").css("background-color", "#00ff00");
$(".yellow").css("background-color", "#ffff00");
$(".orange").css("background-color", "#ffa500");
$(".red").css("background-color", "#ff0000");
}

// this is the programming for the submit button at the top of the web page. All of the ajax information is tied into this function so that when it is clicked, the defined parameters and variables are called and run to generate the information that i have specified in the algorithims used in my script
function submitBtn(){
  // assigning the submit button class to a variable
  var submitBtn = document.querySelector(".submitbtn");
  // using the submit buton variable to add a click event and callback function to my script. the callback function trims and inserts the search params defined by the user, and converts them to an object for storage.
  submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    // this is defining what happens when the user enters information into the search box at the top of the page.
    var searchApi = $(".form-control").val().trim(); //.trim removes blank space within a string
    city = searchApi;
    storage.push(city);
    // this is where i am turning my search parameters into indexes for an array so that they can be stored in localStorage
    localStorage.setItem("store",JSON.stringify(storage));
    // here i am calling the getWeather function which shows me the information defined for the current day, and the fiveDay function which shows me the information defined within the function that comes from the information stored where i can see it in my console.log within an object
    getWeather(city);
    fiveDay(city);
  })
}

// this is where i am changing my stored information into information that can be put onto the webpage itself.
function getStorage(){
  // i am emptying out the div using the .empty function
  $("#history").empty();
  // json parse is allowing me to get the objects stored within the storage array
  var storageArray = JSON.parse(localStorage.getItem("store"));
  // this is a for loop that is being used to comb through the storageArray
  for(i=0;i<storageArray.length;i++){
    // i am defining a variable that is going to create list elements showing user input content
    var historyLi = $("<li>").text(storageArray[i]);
    //I am appending the li elements with user input into the history ordered list elements on the web page to show at the top next to the search bar
    $("#history").append(historyLi);
  }
}

//this is the function that shows the 'today forecast'
function getWeather(city){
  // query url that is used to get the information from the remote server
  var queryURL ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=5c3e3f0f93f71de6ee35b8c58f101473';
  // this is the ajax request that is being used to call the remote servers to get information from them using the provided url with my api key
  $.ajax(
    {
    url: queryURL,
    method: "GET"
    }
    // this is defining what happens after the call is made to the remote serer through ajax
  ).then(function(response){
    // empty weather div
    $(".weather").empty();
    // paragraph tag with city name
    var weather = $("<p>").text(response.name);
    // these are specified search params within the object to pull information requested in assignment
    $(".weather").append(weather);
    $(".weather").append(response.name);
    $(".weather").append(response.weather[0].main);
    $(".weather").append(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $(".weather").append("Feels like " + response.main.feels_like);
    $(".weather").append("The humidity is " + response.main.humidity);
    $(".weather").append("The wind speed is " + response.wind.speed);
    $(".weather").css("float","");
    // i am tying the uvi function to this function so that lat and lon works by using the ajax request in this function to get the actual coordinates, and then plugging them in down below in uvi();
    uvi(response.coord.lat, response.coord.lon);
    // this is where i am getting the weather icon from openweathermap
      var weatherImage = $("<img>");
      //some dynamic styling to the weather icon and where i am calling the weather icon from the api.
  $(weatherImage).css("width","100px");
  var iconCode = response.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
  weatherImage.attr("src",iconUrl);
  $(".mycard").append(weatherImage);
  })
}

// this is the function that is defining the uvi rating
function uvi(lat,lon){
  // this is the query url that has my api key and defines what I want to search for on their website. I have also concatonated the lat and lon into the url. the information that defines those two variables comes from the getWeather(); function.
var queryURL2 = 'https://api.openweathermap.org/data/2.5/uvi?appid=5c3e3f0f93f71de6ee35b8c58f101473&lat=' + lat + '&lon=' + lon;
// ajax request to get the actual information from the remote server
$.ajax({
  url: queryURL2,
  method: 'GET'
  // below is what is to happen after the information has been received.
}).then(function(response){
  // this is saying that it is going to write text on the web page that shows what the current uvi index is above the color rating scale
  $(".weather").append("Your UVI rating is " + response.value);
})
}
// Function calls
// these are the functions being called
uviCaller();
submitBtn();
getStorage();
// Event listeners