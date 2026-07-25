import { getCities } from "./api.js";
const cityInput = document.querySelector("#city");
const suggestions = document.querySelector("#suggestions");
const searchBox = document.querySelector(".search-box");

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