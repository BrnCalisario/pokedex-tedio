const express = require("express")
const path = require("path")
let ejs = require('ejs')
let fs = require('fs')

const app = express()

app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/css'))

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"))
})

app.get("/pokemon/:id", (req, res) => {
    const poke_id = req.params.id
    console.log(JSON.stringify(poke_id))

    fs.readFile('pokemon.html', 'utf-8', (err, html) => {
        res.send(ejs.render(html.toString(), {poke_id: poke_id}))
    })

})


app.listen(process.env.PORT || 3000, () => console.log("Server running..."))