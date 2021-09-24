const api = {
    key: "8b2cfb742ce1c555f42a86f9bbea7c3c",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

function convertTime(t) {

    let hours = t.getUTCHours().toString().padStart(2, 0);
    let minutes = t.getUTCMinutes().toString().padStart(2, 0);

    return `${hours} : ${minutes}`;
}

function displayResults(weather) {
    console.log(weather);

    //changing the place name
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country} `;

    //setting the date
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);


    //getting the current temp and rounding it to a whole number
    let temp = document.querySelector('.current .temp')
    {
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    }

    //feels like code
    let feels = document.querySelector('.current .feels');
    feels.innerText = `Feels like: ${Math.round(weather.main.feels_like)}°c`;

    //weather decscription
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    //the hi low temperatures
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Low ${Math.round(weather.main.temp_min)}°c / High ${Math.round(weather.main.temp_max)}°c `;

    //changing the wind speed
    let winds = document.querySelector('.windSpeed');
    winds.innerText = `Wind speed: ${weather.wind.speed} m/s`;

    //sunrise time
    let sunrise = document.querySelector('.sunrise');
    sunrise.innerText = convertTime(new Date(`${weather.sys.sunrise}` * 1000));

    //sunset time
    let sunset = document.querySelector('.sunset');
    sunset.innerText = convertTime(new Date(`${weather.sys.sunset}` * 1000));

}

