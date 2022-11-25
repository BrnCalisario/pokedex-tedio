async function geraPokemons() {
    const req = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=155")
    const res = await req.json()

    var pokemons = res.results

    for(var pokeResponse of pokemons) {
        
        var pokemon = await getPokemon(pokeResponse.url)

        var box = $("<div></div>").addClass("pokebox")
        var pokeName = $("<h1>").text(capitalize(pokemon.name))
        box.append(pokeName)
        
        var imgUrl = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

        var pokeImage = $("<img>").attr("src", imgUrl)
        box.append(pokeImage)
        
        $("#field").append(box)
    }
}

async function getPokemon(url) {
    console.log(url)
    const req = await fetch(url)
    const res = await req.json()

    console.log(res)
    return res
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)



$("body").on("load", geraPokemons())