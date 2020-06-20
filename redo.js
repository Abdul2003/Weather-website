
//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value");
const descriptionElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");
const tempLowElement = document.querySelector(".low-temperature")
const tempHighElement = document.querySelector(".high-temperature");

 

//SEARCH BOX & API KEY
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;
    const API_KEY = 'e955815ab3dfe6264aea41611bd607ec';
    const api =  `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&exclude=hourly,minutely,daily&appid=${API_KEY}`
    
    //APP data
    const weather = {};

    weather.temperature = {
        unit: "celcius"
    }


    //APP CONSTS AND VARS
    const KELVIN = 273;

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })

        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp -
                KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.tempLow = Math.floor(data.main.temp_min - KELVIN);
            weather.tempHigh = Math.floor(data.main.temp_max - KELVIN);
        })
        .then(function () {
            displayWeather();
        });

    //DISPLAY WEATHER TO UI
    function displayWeather() {
        iconElement.innerHTML = `<img src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather.iconId}.svg"/>`;
        tempElement.innerHTML = `${weather.temperature.value}°C`;
        descriptionElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
        tempLowElement.innerHTML = ` <img src="icons/icon/low.svg"><span>Low:</span>${weather.tempLow}°C`;
        tempHighElement.innerHTML = ` <img src="icons/icon/high.svg"><span>High:</span>${weather.tempHigh}°C`;
    }

    //C to F conversion
    function celciusToFahrenheit(temperature, ) {
        return (temperature * 9 / 5) + 32;
    }


    //WHEN THE USER CLICKS ON BUTTON 
    var btn = document.getElementById("mybutton");
    btn.addEventListener("click", function () {
        if (weather.temperature.value === undefined || weather.tempLow === undefined || weather.tempHigh === undefined) return;

        // inside the event listener
        if (weather.temperature.unit == "celcius" || weather.tempLow.unit == "celcius" || weather.tempHigh.unit == "celcius") {
            fahrenheit = celciusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit)

            fahLow = celciusToFahrenheit(weather.tempLow);
            fahLow = Math.floor(fahLow)

            fahHigh = celciusToFahrenheit(weather.tempHigh);
            fahHigh = Math.floor(fahHigh)
            // change to F
            tempElement.innerHTML = `${fahrenheit}°F`;
            tempLowElement.innerHTML = `<img src="icons/icon/low.svg"><span>Low:</span>${fahLow}°F`;
            tempHighElement.innerHTML = `<img src="icons/icon/high.svg"><span>High:</span>${fahHigh}°F`;
            weather.temperature.unit = "fahrenheit";


        } else {
            // change to C
            tempElement.innerHTML = `${weather.temperature.value}°C`;
            tempLowElement.innerHTML = `<img src="icons/icon/low.svg"><span>Low:</span>${weather.tempLow}°C`;
            tempHighElement.innerHTML = `<img src="icons/icon/high.svg"><span>High:</span>${weather.tempHigh}°C`;
            weather.temperature.unit = "celcius";

        };

    }
    );

})
