const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temp-value p")
const descElement = document.querySelector(".temp-description p")
const locationElement = document.querySelector(".location p")
const notificationElement = document.querySelector(".notification")


const weather = {}
weather.temperature = {
    unit: "celsius"
}
let setPosition = (position)=>{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
let showError = (error)=>{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;

}
// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}
const displayWeather = () => {
    iconElement.innerHTML = `<imag src = "icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`
}
const KELVIN = 273;
const key = "2e15e1b77b2f79d3614c9be5d5c9b77b";

let getWeather = (latitude, longitude) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(response => response.json())
        .then(weatherData => {
            // console.log(weatherData)
            weather.temperature.value = Math.floor(weatherData.main.temp - KELVIN);
            weather.description = weatherData.weather[0].description;
            weather.iconId = weatherData.weather[0].icon;
            weather.city = weatherData.name;
            weather.country = weatherData.sys.country;
        })
        .then(() => {
            displayWeather();
        })

}
const celsiusToFahrenheit = (temp) => {
    return (temp * 9 / 5) + 32;
}
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit)
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius"
    }
})




