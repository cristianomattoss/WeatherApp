const cityInput = document.querySelector("#city");
const suggestions = document.querySelector("#suggestions");

const cities = [
    "Rio de Janeiro",
    "Rio Claro",
    "Rio Branco",
    "Rio Verde"
];

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
        suggestions.appendChild(divSuggestionItem);
    });
}

cityInput.addEventListener("input", () => {
    const searchText = cityInput.value
    showSuggestions(cityInput.value);
});