let favorites = [];

function SaveToLocalStorageByCityName(cityName)
{
    GetLocalStorage();
    favorites.push(cityName);
    localStorage.setItem('Favorites',JSON.stringify(favorites));
}

function SaveToLocalStorage(){
    localStorage.setItem('Favorites',JSON.stringify(favorites));
}

function GetLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData == null)
    {
        favorites = [];
    }else{
        favorites - JSON.parse(localStorageData);
    }

    //favorites = JSON.parse(localStorage.getItem('Favorites'));
    return favorites;
}

function RemoveFromLocalStorage(cityName){
    let cityIndex = favorites.indexOf(cityName);
    //found cityname in array favorites
    favorites.splice(cityIndex,1);
    SaveToLocalStorage();
}

// localStorage.setItem('people','jateen angel');
// let people = ['jateen','angel']
GetLocalStorage();
//console.log(people);
//SaveToLocalStorage();

export {SaveToLocalStorageByCityName, GetLocalStorage, RemoveFromLocalStorage}