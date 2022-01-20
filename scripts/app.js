let weatherData = [];
let city = document.getElementById('city');

function GetWeather(){
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=San Francisco,us&units=imperial&APPID=5a80bfdde52cfa00862ac559e5485d43"
    ).then(response => response.json()
    ).then(data => {
        weatherData = data;
        console.log(weatherData);
        city.textContent = "" +weatherData.city.name+ ", " +weatherData.city.country; //city name and country
        // console.log(Math.floor(weatherData.list[0].main.temp)); //current day forecast
        // console.log(Math.floor(weatherData.list[1].main.temp)); //next day forecast
        // console.log(Math.floor(weatherData.list[2].main.temp)); //third day forecast
        // console.log(Math.floor(weatherData.list[3].main.temp)); //fourth day forecast
        // console.log(Math.floor(weatherData.list[4].main.temp)); //fifth day forecast
        // console.log(Math.floor(weatherData.list[5].main.temp)); //sixth day forecast
        // console.log(weatherData.city.sunrise); //sunrise
        // console.log(weatherData.city.sunset); //sunset
        // console.log(Math.floor(weatherData.list[0].wind.speed)); //wind speed
        // console.log(weatherData.list[0].weather[0].description); //description of weather
        // console.log(weatherData.list[0].main.pressure); //pressure
        // console.log(weatherData.list[0].main.humidity); //humidity

        let obj = {
            cityName: weatherData.city.name,
            cityCountry: weatherData.city.country,
            currentDayTemp: Math.floor(weatherData.list[0].main.temp),
            nextDayTemp: Math.floor(weatherData.list[8].main.temp),
            thirdDayTemp: Math.floor(weatherData.list[16].main.temp),
            fourthDayTemp: Math.floor(weatherData.list[24].main.temp),
            fifthDayTemp: Math.floor(weatherData.list[32].main.temp),
            sixthDayTemp: Math.floor(weatherData.list[36].main.temp),
            sunrise: weatherData.city.sunrise,
            sunset: weatherData.city.sunset,
            wind: Math.floor(weatherData.list[0].wind.speed),
            weatherDescription: weatherData.list[0].weather[0].description,
            pressure: weatherData.list[0].main.pressure,
            humidity: weatherData.list[0].main.humidity
        };
        console.log(obj);
    })
}

GetWeather();