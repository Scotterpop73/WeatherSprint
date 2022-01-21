import GetLocationData from "./geolocation.js";
import {SaveToLocalStorageByCityName, GetLocalStorage, RemoveFromLocalStorage} from "./localStorage.js";

let cityText = document.getElementById('cityText');
let userCity = document.getElementById('userCity');
let searchBtn = document.getElementById('searchBtn');
let tempText = document.getElementById('tempText');
let dateText = document.getElementById('dateText');
let descriptionText = document.getElementById('descriptionText');
let feelsLikeTemp = document.getElementById('feelsLikeTemp');
let minMaxText = document.getElementById('minMaxText');
let humidityText = document.getElementById('humidityText');
let pressureText = document.getElementById('pressureText');
let visibilityText = document.getElementById('visibilityText');
let windText = document.getElementById('windText');
let sunriseText = document.getElementById('sunriseText');
let sunsetText = document.getElementById('sunsetText');
let card1DayText = document.getElementById('card1DayText');
let card1MaxText = document.getElementById('card1MaxText');
let card1MinText = document.getElementById('card1MinText');
let card2DayText = document.getElementById('card2DayText');
let card2MaxText = document.getElementById('card2MaxText');
let card2MinText = document.getElementById('card2MinText');
let card3DayText = document.getElementById('card3DayText');
let card3MaxText = document.getElementById('card3MaxText');
let card3MinText = document.getElementById('card3MinText');
let card4DayText = document.getElementById('card4DayText');
let card4MaxText = document.getElementById('card4MaxText');
let card4MinText = document.getElementById('card4MinText');
let card5DayText = document.getElementById('card5DayText');
let card5MaxText = document.getElementById('card5MaxText');
let card5MinText = document.getElementById('card5MinText');
let changeImage = document.getElementById('changeImage');

//const d = new Date();
let weatherData = [];
let weatherDataLatLon = [];
//let fiveDayurl = "http://api.openweathermap.org/data/2.5/forecast?q=San Francisco,us&units=imperial&APPID=5a80bfdde52cfa00862ac559e5485d43";
//let oneCallurl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid=5a80bfdde52cfa00862ac559e5485d43";
let cityName = '';
let favOn = false;
let latitude = "";
let longitude = "";
let weatherDataUrl = "";

searchBtn.addEventListener('click', function(e){
    cityName = userCity.value;
    // console.log(cityName);
    let fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&APPID=5a80bfdde52cfa00862ac559e5485d43"
    GetFiveDay(fiveDayForecast);
    
    
    //dateText.textContent = ""+d;
});

changeImage.addEventListener('click', function(e){
    if(favOn == true)
    {
        changeImage.className = "favoriteImg";
        RemoveFromLocalStorage(userCity.value);

    }else{
        changeImage.className = "favoriteImgFilled";
        SaveToLocalStorageByCityName(userCity.value);
    }
    favOn = !favOn;
});



function GetFiveDay(url){
    fetch(url).then(response => response.json()
    ).then(data => {
        weatherDataLatLon = data;
        //console.log(weatherDataLatLon);
        latitude = weatherDataLatLon.city.coord.lat;
        longitude = weatherDataLatLon.city.coord.lon;
        weatherDataUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=hourly&units=imperial&appid=5a80bfdde52cfa00862ac559e5485d43";
        GetCurrentDay(weatherDataUrl);
        //console.log(latitude);
        //console.log(longitude);
        let obj = {
            cityName: weatherDataLatLon.city.name,
            cityCountry: weatherDataLatLon.city.country,
        };

         cityText.textContent = "" +obj.cityName+ ", " +obj.cityCountry;
        
    })
};

function GetCurrentDay(weatherDataUrl){
    fetch(weatherDataUrl).then(response => response.json()
    ).then(data => {
        weatherData = data;
        console.log(weatherData);
        tempText.textContent = "" +Math.floor(weatherData.current.temp)+ "°F";
        descriptionText.textContent = "" +weatherData.current.weather[0].description;
        feelsLikeTemp.textContent = "FEELS LIKE " +Math.floor(weatherData.current.feels_like)+ "°F";
        minMaxText.textContent = "MIN: "+Math.floor(weatherData.daily[0].temp.min)+ " MAX: "+Math.floor(weatherData.daily[0].temp.max);
        humidityText.textContent = ""+weatherData.current.humidity+ "%";
        pressureText.textContent = ""+weatherData.current.pressure+ " in";
        visibilityText.textContent = ""+weatherData.current.visibility+ " mi";
        windText.textContent = ""+weatherData.current.wind_speed+ " mph";
        //sunriseText.textContent = ""+weatherData.current.sunrise;
        //sunsetText.textContent = ""+weatherData.current.sunset;
        card1MaxText.textContent = ""+Math.floor(weatherData.daily[1].temp.max)+ "°F";
        card1MinText.textContent = ""+Math.floor(weatherData.daily[1].temp.min)+ "°F";
        card2MaxText.textContent = ""+Math.floor(weatherData.daily[2].temp.max)+ "°F";
        card2MinText.textContent = ""+Math.floor(weatherData.daily[2].temp.min)+ "°F";
        card3MaxText.textContent = ""+Math.floor(weatherData.daily[3].temp.max)+ "°F";
        card3MinText.textContent = ""+Math.floor(weatherData.daily[3].temp.min)+ "°F";
        card4MaxText.textContent = ""+Math.floor(weatherData.daily[4].temp.max)+ "°F";
        card4MinText.textContent = ""+Math.floor(weatherData.daily[4].temp.min)+ "°F";
        card5MaxText.textContent = ""+Math.floor(weatherData.daily[5].temp.max)+ "°F";
        card5MinText.textContent = ""+Math.floor(weatherData.daily[1].temp.min)+ "°F";

        // for(let i = 0; i < 6; i++){
        //     if(i === 0){
        //         let unixTimeStamp = weatherData.current.dt;
        //         let milliseconds = unixTimeStamp * 1000;
        //         let dateObject = new Date(milliseconds);

        //         let monthDayYearDate = dateObject.toLocaleDateString();
        //         let dayDate = dateObject.toLocaleDateString("en-US", {weekday: "long"});

        //     }
        // }
    })
};
