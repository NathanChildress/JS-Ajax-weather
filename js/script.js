//window.alert("JS is loaded");
const weatherKey = "9e24ad0816246dd3df9f48963557230e"
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const weatherURL = "http://api.openweathermap.org/data/2.5/weather?"
//put the data here for now
let myWeather;

function urlBuilder (url, key, args = []) {
    return (`${url}${args}&appid=${key}`)
}



$("form").on("submit", handleGetData);

function handleGetData(evt) {
    evt.preventDefault();
    let $userInput = $("input[type='text']");
    $.ajax({
        url: `${urlBuilder(weatherURL,weatherKey,`zip=${$userInput.val()}`)}`
    }).then (
        (data) => {
            myWeather = data
            render(data)
            console.log(`My data is ${data}`)

        },
        (error) => {
            console.log("ERROR is: ", error)
        }
    )
}

function render(weatherData) {
    $("#location").html(weatherData.name)
    $("#temperature").html(weatherData.main.temp)
    $("#feels").html(weatherData.main.feels_like)
    $("#weather").html(weatherData.weather[0].description)
    $("#weatherIcon").attr("src",`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`)
    $("weatherIcon").attr("hidden", false)
}