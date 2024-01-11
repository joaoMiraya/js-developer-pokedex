
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function handlePokemonCardClick(pokemonNumber) {
    window.location.href = `/pokemon-details.html?number=${pokemonNumber}`;
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-pokemon="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}


//RESPONSAVEL PRO CRIAR OS CARDS
document.addEventListener('DOMContentLoaded', function () {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.addEventListener('click', function (event) {
        const liElement = event.target.closest('li[data-pokemon]');
        if (liElement) {
                        const pokemonNumber = liElement.dataset.pokemon;
            console.log(pokemonNumber);
            pokeApi.getPokemon(pokemonNumber).then(pokemon => {
                const pokemonLiElement = convertPokemonToLi(pokemon);
                pokemonList.innerHTML += pokemonLiElement;
            });
            /* handlePokemonCardClick(pokemonNumber) */
        }
    });
});


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        console.log(pokemons)
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)
/* 
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonNumber = urlParams.get('number');

    if (pokemonNumber) {
        getPokemonDetails(pokemonNumber);
    }
});
 */
/* function getPokemonDetails(number) {
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${number}/` })
        .then(displayPokemonDetails);
} */


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})