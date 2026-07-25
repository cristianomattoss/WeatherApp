export async function getCities() {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
    const data = await response.json();
    return data.map(city => city.nome);
}

export async function getCoordinates(city) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e78d61daf65a36ac30cd35117f1d4b0d`);
    const data = await response.json();
    const {lat, lon} = data[0];
    console.log(lat, lon);
    return {latitude: lat, longitude: lon};
}