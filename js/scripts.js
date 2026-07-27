import { getCities, getWeatherData } from "./api.js";
const cityInput = document.querySelector("#city");
const suggestions = document.querySelector("#suggestions");
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector("#search-btn");
const weatherSummary = document.querySelector(".weather-summary");
const weatherCard = document.querySelector(".weather-card");

const summaryCityName = document.querySelector("#summary-city-name");
const summaryDescription = document.querySelector("#summary-description");
const summaryWeatherIcon = document.querySelector("#weather-summary-icon");
const summaryTemperature = document.querySelector("#summary-temperature");
const feelsLike = document.querySelector("#feels-like");

const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

let cities = [];

try {
    cities = await getCities();
} catch (error) {
    console.error("Erro ao carregar cidades:", error);
}

function showSuggestionsContainer() {
    suggestions.classList.remove("hide");
}

function hideSuggestionsContainer(){
    suggestions.classList.add("hide");  
}

function showSuggestions(searchText) {
    suggestions.innerHTML = "";

    if (searchText.trim() === "") {
        hideSuggestionsContainer();
        return;
    }
    
    const citiesFiltered = cities.filter(city => city.toLowerCase().includes(searchText.toLowerCase()));
    
    if (citiesFiltered.length === 0) {
        hideSuggestionsContainer();
        return;
    }

    citiesFiltered.forEach(city => {
        const divSuggestionItem = document.createElement("div");
        divSuggestionItem.classList.add("suggestion-item");
        divSuggestionItem.textContent = city;

        divSuggestionItem.addEventListener("click", () => {
            cityInput.value = city;
            hideSuggestionsContainer();
        });

        suggestions.appendChild(divSuggestionItem);
    });

    showSuggestionsContainer();
}

function renderWeather(weatherData) {
    summaryCityName.textContent = cityInput.value;
    summaryDescription.textContent = weatherData.description;
    summaryTemperature.textContent = `${Math.round(weatherData.temperature)}°C`;
    summaryWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
    feelsLike.textContent = `${Math.round(weatherData.feelsLike)}°C`;

    humidity.textContent = `${weatherData.humidity}%`;
    wind.textContent = `${weatherData.windSpeed} m/s`;
    
    const date = new Date(weatherData.sunrise * 1000);
    sunrise.textContent = date.toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"});

    const sunsetDate = new Date(weatherData.sunset * 1000);
    sunset.textContent = sunsetDate.toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"});

    weatherSummary.classList.remove("hide");
    weatherCard.classList.remove("hide");
}

/* EVENTS */
cityInput.addEventListener("input", () => {
    const searchText = cityInput.value
    showSuggestions(searchText);
});

cityInput.addEventListener("focus", () => {
    if (cityInput.value.trim() !== "") {
        showSuggestions(cityInput.value);
    }
});

document.addEventListener("click", (event) => {
    if (!searchBox.contains(event.target)) {
        hideSuggestionsContainer();
    }
});

searchBtn.addEventListener("click", async () => {
    const weatherData = await getWeatherData(cityInput.value);
    renderWeather(weatherData);
})

