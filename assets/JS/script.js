const formEl = document.querySelector(".form-outline")
;
const searchEl = document.getElementById("form1");
const searchBtn = document.getElementById("searchBtn")

const currentFore = document.getElementById("current-forecast");

const conditionsEl = document.getElementById("conditions")
const fiveDayEl = document.getElementById("forecast");

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
    let fiveDayFore = "https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&cnt=10" + "&units=imperial" + apiKey
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

    currentFore.prepend(location);
    conditionsEl.appendChild(temp);
    conditionsEl.appendChild(wind);
    conditionsEl.appendChild(humid);
}

function displayFiveDay (data) {
console.log(data.list.length);
    for (var i=0; i< data.list.length; i++) {
    let date = new Date(data.list[i].dt_txt,).toLocaleDateString();

    let forecastEl = document.createElement("div")
    forecastEl.setAttribute("class","col")
    forecastEl.innerHTML = date;

    fiveDayEl.appendChild(forecastEl);
    



    }
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
})