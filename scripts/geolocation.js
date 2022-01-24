import{cityText, GetFiveDay, GetCurrentDay} from "./app.js";

function success(position){
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    cityText.textContent = "Users Location";
    let dataUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=hourly&units=imperial&appid=5a80bfdde52cfa00862ac559e5485d43";

    GetCurrentDay(dataUrl); 
}

function error(err){
    console.warn(err);
    let fiveDayForecast = "http://api.openweathermap.org/data/2.5/forecast?q=sacramento,us&units=imperial&APPID=5a80bfdde52cfa00862ac559e5485d43"

    GetFiveDay(fiveDayForecast);
}

let options = {
    enableHighAccuracy: true,
    timeout: 5000, 
    maximumAge:0
}

function GetLocationData(){

    //Navigator
    navigator.geolocation.getCurrentPosition(success,error,options);
}

export default GetLocationData;