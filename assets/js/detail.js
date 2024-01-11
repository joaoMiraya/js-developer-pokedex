
const pokemonDetails = document.getElementById('pokemonDetails')


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon pokedetails ${pokemon.type}">
           <span class="name-detail">${pokemon.name}</span>

            <div class="detail">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            </li>

            <div class="obs-detail">
            <ul class="types-detail">
                        ${pokemon.types.map((type) =>
        `<li class="type ${type}">${type}</li>`).join('')}
            </ul>
            <ul class="stats">
                        ${pokemon.stats.map((stat) =>
            `<li class="type ${stat.stat.name}">
           <p>${stat.stat.name}</p>
           <p>${stat.base_stat}</p>
            </li>`).join('')
        }
            </ul>
            <ul class="abilities-detail  ${pokemon.type}">
            <h3>Principais habilidades:</h3>
            ${pokemon.abilities.map((ability) =>
            `<li class="type">${ability.ability.name}</li>`).join('')}
</ul>
            </div>
    `;
}

function loadPokemonItens() {
    const url = window.location.href;
    const pokemonNumber = url.split('=').pop();
    pokeApi.getPokemon(pokemonNumber).then((pokemon = []) => {
        console.log(pokemon)
        const newHtml = convertPokemonToLi(pokemon)
        pokemonDetails.innerHTML += newHtml
    })
}
loadPokemonItens()
