let weatherData = [];
let city = document.getElementById('city');

function GetWeather(){
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=Sacramento,us&units=imperial&APPID=5a80bfdde52cfa00862ac559e5485d43"
    ).then(response => response.json()
    ).then(data => {
        weatherData = data;
        console.log(weatherData);
        city.textContent = "" +weatherData.city.name+ ", " +weatherData.city.country; //city name and country
        console.log(weatherData.list[0]); //current day forecast
        console.log(weatherData.list[1]); //next day forecast
        console.log(weatherData.list[2]); //third day forecast
        console.log(weatherData.list[3]); //fourth day forecast
        console.log(weatherData.list[4]); //fifth day forecast
        console.log(weatherData.list[5]); //sixth day forecast
    })
}

GetWeather();