export async function getCities() {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
    const data = await response.json();
    return data.map(city => city.nome);
}