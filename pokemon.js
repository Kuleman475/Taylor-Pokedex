const baseURL = "https://pokeapi.co/api/v2/";
pokemon();

 async function pokemon(){

  let pokemonArray = [];
  for(let p = 152; p <= 251; p++) {
    let pokemonNum = getPokemonByPokedexNumber(p);
    pokemonArray.push(pokemonNum);
  }

Promise.all(pokemonArray).then( results => {
  results.map((result) => {
      let container = document.querySelector(".pokemonContainer");
  let template = pokemonTemplate(result);
 renderPokemonTemplate(template, container);
  })
})

 }


function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

 async function getPokemonByPokedexNumber(id) {
  const response = await fetch(baseURL + `pokemon/${id}`);
  const pokemon = await convertToJson(response);
   return pokemon;
}

 async function getSpeciesByPokedexNumber(id) {
  const response = await fetch(baseURL + `pokemon-species/${id}`);
  const pokemon = await convertToJson(response);
   return pokemon;
}

 async function getRegionData(id) {
  const response = await fetch(baseURL +`region/${id}`);
  const region = await convertToJson(response);
  return region;
}


 function pokemonTemplate(pokemon) {
   return `<div class="pokemonCard">
   <a href="./pokemonPage.html?pokemon=${pokemon.id}">
   <h3 id="pokemonName">${pokemon.name}</h3>
   <h4 id="pokemonNumber">${pokemon.id}</h4>
   <p id="pokemonAbility">${pokemon.abilities[0].ability.name}</p>
   <img id="pokemonImage" src="${getImage(pokemon)}">
   </a>
   </div>`;
}
function getImage(pokemon){
  if(pokemon.sprites.other.home.front_default == null){
    return`${pokemon.sprites.front_default}`;
  }
 else { return `${pokemon.sprites.other.home.front_default}` }
}

function renderPokemonTemplate(template, container) {
  const card = document.createElement("div");
  card.innerHTML = template;
  container.appendChild(card);
}