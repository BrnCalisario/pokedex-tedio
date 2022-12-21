async function getPokemons() {
    const req = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    const res = await req.json()

    var pokemons = res.results
    return pokemons
}

async function getPokemonsByType(typeValue) {

    const req = await fetch("https://pokeapi.co/api/v2/type/" +  typeValue)
    const res = await req.json()

    var pokemons = res.pokemon.filter(p => p.pokemon.url.split('/')[6] <= 151)
    return pokemons.map(p => p.pokemon)
}
    
async function getSinglePokemon(url) {
    const req = await fetch(url)
    const res = await req.json()
    return res
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

async function searchPokemon() {
    var input = $("#search-input").val()

    $("#search-btn").prop("disabled", true)
    var pokemons = await getPokemons()

    var filteredSearch = pokemons.filter( p => p.name.includes(input.toLowerCase()))

    if (filteredSearch.length == 0) {
        renderError()
        $("#search-btn").prop("disabled", false)
        return
    }

    renderPokemons(filteredSearch).then( () => {
            $("#search-btn").prop("disabled", false)
        }
    )
}

function disableAllBtn(state) {
    $("#btn-list > button").each(function () {
        $(this).prop("disabled", state)
    })
}


function renderError() {
    $("#field").empty()
    var errorDiv = $("<div>").addClass("error-box")
    errorDiv.append($<"<p>").text("Nenhum pokemon encontrado :( ")
    $("#field").append(errorDiv)
}

const colorList = (element) => {
    colors = {
        "All": "gray",
        "Normal": "#A8A77A",
        "Fire": "#EE8130",
        "Grass": "#7AC74C",
        "Water": "#6390F0",
        "Ground": "#E2BF65",
        "Eletric": "#F7D02C",
        "Ice": "#96D9D6",
        "Fighting": "#C22E28",
        "Flying": "#A98FF3",
        "Psychic": "#F95587",
        "Bug": "#A6B91A",
        "Rock": "#B6A136",
        "Ghost": "#735797",
        "Poison": "#A33EA1",
        "Dark": "#705746",
        "Steel": "#B7B7CE",
    }

    return colors[element]
}

const applyBtnColor = () => {
    $("#btn-list > button").each(function () { 
        let element = $(this).prop("innerHTML")
        $(this).css("background-color", colorList(element))
    })
}

const btnFunction = () => {
    
    
    $("#btn-list > button").each(function () {
        let button = $(this)

        if (button.val() == 0) {
            return
        }

        button.click(async function () {
            //button.prop("disabled", true)
            disableAllBtn(true)
            let filtered = await getPokemonsByType(button.val())
            console.log(filtered)
            await renderPokemons(filtered).then(() => disableAllBtn(false))
            
        })
    })

    $("#btn-all").click( async () => {
        disableAllBtn(true)
        renderPokemons(await getPokemons()).then(() => disableAllBtn(false))
    })
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

var start = async () => {
    renderPokemons(await getPokemons())  
    applyBtnColor()
    btnFunction()
}

start()


