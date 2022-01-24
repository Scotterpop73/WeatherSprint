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
let injectHere = document.getElementById('injectHere');
let favBtn = document.getElementById('favBtn');

let weatherData = [];
let weatherDataLatLon = [];

let cityName = '';
let favOn;
let latitude = "";
let longitude = "";
let weatherDataUrl = "";

searchBtn.addEventListener('click', function(e){
    cityName = userCity.value;
    // console.log(cityName);
    let fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&APPID=5a80bfdde52cfa00862ac559e5485d43"
    GetFiveDay(fiveDayForecast);

});

changeImage.addEventListener('click', function(e){
    if(favOn)
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
        favOn = checkIfFavorite(obj.cityName);
        console.log(favOn);
         if (favOn) {
            changeImage.className = "favoriteImgFilled";
           
         } else {
            changeImage.className = "favoriteImg";
            
         }
         
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
        let pressure = weatherData.current.pressure*0.0295
        pressureText.textContent = ""+pressure.toFixed(2)+ " in";
        visibilityText.textContent = ""+Math.round(weatherData.current.visibility/1609)+ " mi";
        windText.textContent = ""+Math.floor(weatherData.current.wind_speed)+ " mph";
        
        //Convert sunrise and sunset time and display time
        let sunriseTime = weatherData.current.sunrise;
        let sunriseDate = new Date(sunriseTime * 1000);
        let sunriseHour = sunriseDate.getHours();
        let sunriseMinute = sunriseDate.getMinutes();
        sunriseHour = ((sunriseHour + 11) %12 +1);

        let sunsetTime = weatherData.current.sunset;
        let sunsetDate = new Date(sunsetTime * 1000);
        let sunsetHour = sunsetDate.getHours();
        let sunsetMinute = sunsetDate.getMinutes();
        sunsetHour = ((sunsetHour + 11) %12 +1 );

        sunriseText.textContent = ""+sunriseHour+ ":"+sunriseMinute+ " AM";
        sunsetText.textContent = ""+sunsetHour+ ":"+sunsetMinute+ " PM";

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

        icon1.src = "https://openweathermap.org/img/wn/" + weatherData.daily[0].weather[0].icon + ".png";
        icon2.src = "https://openweathermap.org/img/wn/" + weatherData.daily[1].weather[0].icon + ".png";
        icon3.src = "https://openweathermap.org/img/wn/" + weatherData.daily[2].weather[0].icon + ".png";
        icon4.src = "https://openweathermap.org/img/wn/" + weatherData.daily[3].weather[0].icon + ".png";
        icon5.src = "https://openweathermap.org/img/wn/" + weatherData.daily[4].weather[0].icon + ".png";
        icon6.src = "https://openweathermap.org/img/wn/" + weatherData.daily[5].weather[0].icon + ".png";

        
        let unixTimeStamp = weatherData.current.dt;
        let milliseconds = unixTimeStamp * 1000;
        let dateObject = new Date(milliseconds);

        dateText.textContent = dateObject.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric", hour12: true, hour: "numeric", minute: "numeric"});
            
        let unixTimeStamp2 = weatherData.daily[1].dt;
        let milliseconds2 = unixTimeStamp2 * 1000;
        let dateObject2 = new Date(milliseconds2);
        
        card1DayText.textContent = dateObject2.toLocaleDateString("en-US", {weekday: "long"});

        let unixTimeStamp3 = weatherData.daily[2].dt;
        let milliseconds3 = unixTimeStamp3 * 1000;
        let dateObject3 = new Date(milliseconds3);
        
        card2DayText.textContent = dateObject3.toLocaleDateString("en-US", {weekday: "long"});

        let unixTimeStamp4 = weatherData.daily[3].dt;
        let milliseconds4 = unixTimeStamp4 * 1000;
        let dateObject4 = new Date(milliseconds4);
        
        card3DayText.textContent = dateObject4.toLocaleDateString("en-US", {weekday: "long"});

        let unixTimeStamp5 = weatherData.daily[4].dt;
        let milliseconds5 = unixTimeStamp5 * 1000;
        let dateObject5 = new Date(milliseconds5);
        
        card4DayText.textContent = dateObject5.toLocaleDateString("en-US", {weekday: "long"});

        let unixTimeStamp6 = weatherData.daily[5].dt;
        let milliseconds6 = unixTimeStamp6 * 1000;
        let dateObject6 = new Date(milliseconds6);
        
        card5DayText.textContent = dateObject6.toLocaleDateString("en-US", {weekday: "long"});
         
    })
};

function checkIfFavorite(cityName){
    const favorites = GetLocalStorage();
    console.log(JSON.stringify(favorites));
    return favorites.includes(cityName.toLowerCase());
};

function makeCityFavorites(){
    
    const favorites = GetLocalStorage();
    for(let i = 0; i < favorites.length; i++){
        let a = document.createElement('a');
        a.className = "nav-link active navbarFont";
        a.ariaCurrent = "page";
        a.href = "#";
        a.textContent = favorites[i];
        let li = document.createElement('li');
        li.className = "nav-item text-center"
        li.appendChild(a);
        let hr = document.createElement('hr');
        let ul = document.createElement('ul');
        ul.className = "navbar-nav justify-content-end flex-grow-1 pe-3";
        ul.appendChild(li);
        ul.appendChild(hr);
        injectHere.appendChild(ul);
    }

    
};

favBtn.addEventListener('click', function(e){
    injectHere.innerHTML = "";
    makeCityFavorites();
});


GetLocationData();

export {cityText, GetFiveDay, GetCurrentDay};