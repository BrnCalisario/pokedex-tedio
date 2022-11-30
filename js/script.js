async function getPokemons() {
    const req = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    const res = await req.json()

    var pokemons = res.results
    return pokemons
}

async function getPokemonsByType(typeValue) {

    const req = await fetch("https://pokeapi.co/api/v2/type/" +  typeValue)
    const res = await req.json()

    var pokemons = res.pokemon.filter(p => p.pokemon.url.split('/')[6] <= 600)
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



const applyBtnColor = () => {
    $("#btn-list > button").each(function () { 
        let element = $(this).prop("innerHTML")
        switch(element) {
            case "Normal":
                break
            case "Fire":
                $(this).css("background-color", "#d9372b")
                break
            case "Grass":
                $(this).css("background-color", "#49b85a")
                break
            case "Water":
                $(this).css("background-color", "#2b8bd9")
                break
            case "Ground":
                $(this).css("background-color", "#d9742b")
        }
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


