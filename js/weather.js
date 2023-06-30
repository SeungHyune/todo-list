const API_KEY = `3fa7236586d1ed0e40416f01ee0a3aef`;

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector('#weather span:first-child');
        const city = document.querySelector('#weather span:last-child');
        weather.innerText = `${parseInt(data.main.temp)}°`;
        city.innerText = data.name;
    });
}

function onGeoError(){
    alert("can`t find you. No wather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); 