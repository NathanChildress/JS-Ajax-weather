//window.alert("JS is loaded");
const weatherKey = "9e24ad0816246dd3df9f48963557230e"
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const weatherURL = "http://api.openweathermap.org/data/2.5/weather?"
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?"
//put the data here for now
let myWeather, myForecast, apiURL, forecastDebug;
const weatherArgs = {
    units: 'imperial',
    exclude: ['hourly','daily'],
    cnt: '3',
}

function urlBuilder (url, key, args = []) {
    return (`${url}${args}&exclude=hourly&units=imperial&appid=${key}`)
}

$("form").on("submit", handleGetData);

function handleGetData(evt) {
    evt.preventDefault();
    let $userInput = $("input[type='text']");
    $.ajax({
        url: `${urlBuilder(forecastURL,weatherKey,`zip=${$userInput.val()}`)}`
    }).then (
        (data) => {
            apiURL = `${urlBuilder(forecastURL,weatherKey,`zip=${$userInput.val()}`)}`
            myForecast = data
            $("card").remove()
            renderForecast(myForecast)
            console.log(`My data is ${data}`)

        },
        (error) => {
            console.log("ERROR is: ", error)
        }
        
    )
    $.ajax({
        url: `${urlBuilder(weatherURL,weatherKey,`zip=${$userInput.val()}`)}`
    }).then (
        (data) => {
            apiURL = `${urlBuilder(forecastURL,weatherKey,`zip=${$userInput.val()}`)}`
            myWeather = data

            renderWeather(data)
            console.log(`My data is ${data}`)

        },
        (error) => {
            console.log("ERROR is: ", error)
        }
    )
}
//TODO: clean this up so it has a matching card with the forecast, except maybe a little bigger.
function renderWeather(weatherData) {
    $("#location").html(weatherData.name)
    $("#temperature").html(weatherData.main.temp)
    $("#feels").html(weatherData.main.feels_like)
    $("#weather").html(weatherData.weather[0].description)
    $("#weatherIcon").attr("src",`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
    $("#weatherIcon").removeClass("hideMe")
    $("#weatherIcon").addClass("showMe")
}

//We're going to need to add some builders and operators to handle a forecast
function renderForecast (forecastData) {
    forecastData.list.forEach((foreCast) => renderForecastCard(foreCast)); 
}


//TODO: Refactor Current Weather and Forecast buildier into the same function.
function renderForecastCard (foreDay) {
    forecastDebug = foreDay
//we can use bootstrap to handle creating the cards for us with this basic template:
let $myCard = $(`<div class="card" style="width: 18rem;">
    <img src="http://openweathermap.org/img/wn/${foreDay.weather[0].icon}@2x.png" class="card-img-top" alt="...">
    <div class="card-body">
      <ul class="list-group list-group-flush">
          <li class="list-group-item">Day & Time: ${foreDay.dt_txt}</li>
          <li class="list-group-item">temperature:${foreDay.main.temp}</li>
          <li class="list-group-item">feels like: ${foreDay.main.feels_like}</li>
          <li class="list-group-item">Weather: ${foreDay.weather[0].description}</li>
    </ul>
    </div>
  </div>`)

let $myCol =$(".foreColumn");
$myCard.appendTo($myCol);
}


