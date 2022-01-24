
function SaveToLocalStorageByCityName(cityName)
{
    let favorites = GetLocalStorage();
    
    favorites.push(cityName.toLowerCase());
    SaveToLocalStorage(favorites);
}

function SaveToLocalStorage(favorites){
    localStorage.setItem('Favorites',JSON.stringify(favorites));
}

function GetLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData == null)
    {
       return [];
    }
        return JSON.parse(localStorageData);
}

function RemoveFromLocalStorage(cityName){
    const favorites = GetLocalStorage();
    let cityIndex = favorites.indexOf(cityName);

    //found cityname in array favorites
    favorites.splice(cityIndex,1);
    SaveToLocalStorage(favorites);
}

// localStorage.setItem('people','jateen angel');
// let people = ['jateen','angel']
//GetLocalStorage();
//console.log(people);
//SaveToLocalStorage();

export {SaveToLocalStorageByCityName, GetLocalStorage, RemoveFromLocalStorage}