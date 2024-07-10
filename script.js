document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector('.search-button');
    const searchBar = document.querySelector('.searchbar');
    const temperature = document.querySelector('.temperature');
    const city = document.querySelector('.city');
    const humidity = document.querySelector('.percent');
    const windSpeed = document.querySelector('.speed');
    const skyImage = document.querySelector('.sky');
    const humidityImage = document.querySelector('.humid');
    const windImage = document.querySelector('.wind');

    const weatherIcons = {
        'Thunderstorm': 'Icons/thunderstorm.png',
        'Drizzle': 'Icons/drizzle.png',
        'Rain': 'Icons/rain.png',
        'Snow': 'Icons/snow.png',
        'Clear': 'Icons/clear.png',
        'Clouds': 'Icons/clouds.png',
        'Mist': 'Icons/fog.png',
        'Smoke': 'Icons/smoke.png',
        'Haze': 'Icons/haze.png',
        'Dust': 'Icons/dust.png',
        'Fog': 'Icons/fog.png',
        'Sand': 'Icons/sand.png',
        'Ash': 'Icons/ash.png',
        'Squall': 'Icons/squall.png',
        'Tornado': 'Icons/tornado.png'
    };

    const apiKey = 'a06e61a76f245f9d1f17b1da56682527';
    
    async function fetchWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    }

    function updateUI(data) {
        temperature.textContent = `${data.main.temp}°C`;
        city.textContent = data.name;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} km/h`;

        const weatherCondition = data.weather[0].main;
        skyImage.src = weatherIcons[weatherCondition] || 'default.png';
    }

    searchButton.addEventListener('click', async () => {
        const city = searchBar.value;
        if (city) {
            const data = await fetchWeather(city);
            updateUI(data);
        }
    });
});
