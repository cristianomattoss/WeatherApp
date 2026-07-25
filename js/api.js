export async function getCities() {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
    const data = await response.json();
    return data.map(city => city.nome);
}

async function getCoordinates(city) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e78d61daf65a36ac30cd35117f1d4b0d`);
    const data = await response.json();
    const {lat, lon} = data[0];
    return {latitude: lat, longitude: lon};
}

export async function getWeatherData(city) {
    const {latitude, longitude} = await getCoordinates(city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=e78d61daf65a36ac30cd35117f1d4b0d`);
    const data = await response.json();

    const {description, icon} = data.weather[0];
    const {temp: temperature, humidity} = data.main;
    const windSpeed = data.wind.speed;
    const {sunrise, sunset} = data.sys;

    const weatherData = {
        description,
        icon,
        temperature,
        humidity,
        windSpeed,
        sunrise,
        sunset
    }

    return weatherData;
}