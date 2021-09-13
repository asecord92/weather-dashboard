const formEl = document.querySelector(".form-outline")
;
const searchEl = document.getElementById("form1");
const searchBtn = document.getElementById("searchBtn")

const currentFore = document.getElementById("current-forecast");

const conditionsEl = document.getElementById("conditions")
const fiveDayEl = document.getElementById("forecast");
const recentSearEl = document.getElementById("recent-search");

function getDailyWeather(city) {
    let apiKey = "&appid=f61e4700116459fd4c0d7558aa5d0ec1"
    let weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + apiKey

    console.log(weatherApi);
    fetch(weatherApi).then((response) => { 
        if (response.ok) {
            response.json().then((data)=>{
                displayWeather(data, city);

            });
        };
    });

}

function getFiveDay(city) {
    let apiKey = "&appid=f61e4700116459fd4c0d7558aa5d0ec1"
    let fiveDayFore = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&units=imperial" + apiKey
    console.log(fiveDayFore);
    fetch(fiveDayFore).then((response) => { 
        if (response.ok) {
            response.json().then((data)=>{
                displayFiveDay(data);

            });
        };
    });



}
function displayWeather(data) {
    let today = new Date().toLocaleDateString();
    
    //figure out icon thing

    let location = document.createElement("h3");
    location.innerHTML = data.name+ " " + today 
    let temp = document.createElement("li");
    temp.setAttribute("class","list-group-item");
    temp.innerHTML = "Temp: " + data.main.temp + "&#176; F"

    let wind =  document.createElement("li");
    wind.setAttribute("class","list-group-item");
    wind.innerHTML = "Wind: " + data.wind.speed + " MPH";

    let humid =  document.createElement("li");
    humid.setAttribute("class","list-group-item");
    humid.innerHTML = "Humidity: " + data.main.humidity + " &#37;"; 

    let uvIn =  document.createElement("li");
    uvIn.setAttribute("class","list-group-item");

    conditionsEl.prepend(location);
    conditionsEl.appendChild(temp);
    conditionsEl.appendChild(wind);
    conditionsEl.appendChild(humid);

    recentSearch(data);
}

function displayFiveDay (data) {
    data.length = []
    for (var i=0; i< data.list.length; i++) {
    let date = data.list[i].dt_txt.split(" ")
    if (date[1] === "15:00:00"){
    let forecastEl = document.createElement("div")
    forecastEl.setAttribute("class","col five")
    forecastEl.innerHTML = date[0] +"<br> Temp: " + data.list[i].main.temp + "&#176; F <br> Wind: " + data.list[i].wind.speed + " MPH <br> Humidity: " + data.list[i].main.humidity + " &#37;";

    fiveDayEl.appendChild(forecastEl);
    }
    }
}

function recentSearch (data) {
    let recentCity = document.createElement("button");
    recentCity.setAttribute("type", "button");
    recentCity.setAttribute("class", "list-group-item list-group-item-action");
    recentCity.innerText = data.name
    recentSearEl.appendChild(recentCity);

}


function formSubmit (e) {
    let city = searchEl.value.split(' ').join('+');
    console.log(city);
    if (city) {
        getDailyWeather(city);
        getFiveDay(city);
        searchEl.value = "";
        
    }
}; 


searchBtn.addEventListener("click",(e) => {
    formSubmit(e);
    conditionsEl.innerText = "";
    fiveDayEl.innerText = "";
    
})