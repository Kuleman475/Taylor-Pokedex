const baseURL = "https://pokeapi.co/api/v2/";

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

export async function getPokemonByPokedexNumber(id) {
  const response = await fetch(baseURL + `pokemon/${id}`);
  const pokemon = await convertToJson(response);
   return pokemon;
}

export async function getSpeciesByPokedexNumber(id) {
  const response = await fetch(baseURL + `pokemon-species/${id}`);
  const pokemon = await convertToJson(response);
   return pokemon;
}

export async function getRegionData(id) {
  const response = await fetch(baseURL +`region/${id}`);
  const region = await convertToJson(response);
  return region;
}
