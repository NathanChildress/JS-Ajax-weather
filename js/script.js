//window.alert("JS is loaded");
const weatherKey = "9e24ad0816246dd3df9f48963557230e"
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const weatherURL = "http://api.openweathermap.org/data/2.5/weather?"
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?"
//put the data here for now
let myWeather;
let apiURL;
const weatherArgs = {
    units: 'imperial',
    exclude: ['hourly','daily'],
    cnt: '3',
}

function urlBuilder (url, key, args = []) {
    return (`${url}${args}&units=imperial&appid=${key}`)
}

let myString = "String here" + weatherKey + "another string"
let myString2 = `String here ${weatherKey} another string`


$("form").on("submit", handleGetData);

function handleGetData(evt) {
    evt.preventDefault();
    let $userInput = $("input[type='text']");
    $.ajax({
        url: `${urlBuilder(forecastURL,weatherKey,`zip=${$userInput.val()}`)}`
    }).then (
        (data) => {
            apiURL = `${urlBuilder(forecastURL,weatherKey,`zip=${$userInput.val()}`)}`
            myWeather = data

            renderForecast(data)
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

function renderWeather(weatherData) {
    $("#location").html(weatherData.name)
    $("#temperature").html(weatherData.main.temp)
    $("#feels").html(weatherData.main.feels_like)
    $("#weather").html(weatherData.weather[0].description)
    $("#weatherIcon").attr("src",`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
    $("weatherIcon").toggle('slow')
}

function renderWeather(weatherData) {
    $("#location").html(weatherData.name)
    $("#temperature").html(weatherData.main.temp)
    $("#feels").html(weatherData.main.feels_like)
    $("#weather").html(weatherData.weather[0].description)
    $("#weatherIcon").attr("src",`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
    $("weatherIcon").toggle('slow')
}

//We're going to need to add some builders and operators to handle a forecast

//we can use bootstrap to handle creating the cards for us with this basic template:
{/* 
    <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  </div>
</div> 
*/}

