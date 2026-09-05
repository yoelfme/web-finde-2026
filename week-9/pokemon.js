document.addEventListener('DOMContentLoaded', () => {
    // const searchInput = document.querySelector('#search')
    // const searchButton = document.querySelector('#btn-search')

    // El usuario ingresa el nombre del pokemon y presiona: 'Enter'
    const searchInput = document.getElementById('search')

    searchInput.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
            const pokemonName = searchInput.value.trim()

            searchPokemon(pokemonName).then(pokemon => {
                if (pokemon) {
                    // Mostrar el pokemon en la tarjeta
                    document.getElementById('pokemon-name').textContent = pokemon.name
                    document.getElementById('pokemon-weight').textContent = `Peso: ${pokemon.weight} kg`
                    document.getElementById('pokemon-height').textContent = `Altura: ${pokemon.height} cm`
                    document.getElementById('pokemon-image').src = pokemon.image
                } else {
                    document.getElementById('pokemon-name').textContent = 'Sin resultados'
                    document.getElementById('pokemon-weight').textContent = 'Peso: -- kg'
                    document.getElementById('pokemon-height').textContent = 'Altura: -- cm'
                    document.getElementById('pokemon-image').src = ''
                }
            })
        }
    })
})


async function searchPokemon(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    const request = await fetch(url)
    
    if (!request.ok) {
        return null;
    }

    const data = await request.json()

    return {
        height: data.height,
        weight: data.weight,
        image: data.sprites.other['official-artwork'].front_default,
        name: data.name
    }
}