const baseURL = "https://pokeapi.co/api/v2/";
pokemon();

 async function pokemon(){
  const array = Array(100).fill(1).map((n, i) => n + i);
  let pokemonArray = [];
  let valuearray = new Array;

  array.forEach(element => {
    let pokemonNum = getPokemonByPokedexNumber(element);

    let myPromise = new Promise(function(myResolve, myReject){
      myResolve(pokemonNum);
      myReject(pokemonNum);
    });

    myPromise.then(
       function(value) {
        let container = document.querySelector(".pokemonContainer");
   let template = pokemonTemplate(value);
  renderPokemonTemplate(template, container);
        },


      function(error) {  }
    );


  });


          
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
   <h3 id="pokemonName">${pokemon.name}</h3>
   <h4 id="pokemonNumber">${pokemon.id}</h4>
   <p id="pokemonAbility">${pokemon.abilities[0].ability.name}</p>
   <img id="pokemonImage" src="${getImage(pokemon)}">
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