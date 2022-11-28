async function getPokemons() {
    const req = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    const res = await req.json()

    var pokemons = res.results
    //console.log(pokemons)
    return pokemons
}

async function renderPokemons(pokeList) {
    
    $("#field").empty()

    for(var pokeResponse of pokeList) {
        
        var pokemon = await getSinglePokemon(pokeResponse.url)

        var box = $("<a>").addClass("pokebox")
        var pokeName = $("<h1>").text(capitalize(pokemon.name))
        box.append(pokeName)

        var imgUrl = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

        var pokeImage = $("<img>").attr("src", imgUrl)
        box.append(pokeImage)

        box.attr("href", "pokemon/" + pokemon.id)

        $("#field").append(box)
    }
}

function renderError() {
    
    $("#field").empty()

    var errorDiv = $("<div>").addClass("error-box")
    errorDiv.append($<"<p>").text("Nenhum pokemon encontrado :( ")
    $("#field").append(errorDiv)
}

async function getSinglePokemon(url) {
    const req = await fetch(url)
    const res = await req.json()
    return res
}

async function searchPokemon() {
    var input = $("#search-input").val()

    var pokemons = await getPokemons()

    if (input.length < 1) {
        renderPokemons(pokemons)
        return
    }

    var filteredSearch = pokemons.filter( p => p.name.includes(input))

    if (filteredSearch.length == 0) {
        renderError()
        return
    }

    renderPokemons(filteredSearch)
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

var start = async () => {
    renderPokemons(await getPokemons())
}

start()

