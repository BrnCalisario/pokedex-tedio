const express = require("express")
const { is } = require("type-is")

const app = express()

app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/css'))
    
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.get("/pokemon/:id", (req, res) => {
    const { id } = req.params

    
    if (id < 0 || !isNumber(id)) {
        //res.sendFile(__dirname + "notfound.html")
        res.send('<h1> 404 Not Found </h1>')
    }

    
    res.sendFile(__dirname + "/pokemon.html")
})

app.listen(process.env.PORT || 3000, () => console.log("Server running..."))





function isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    if (char.trim() === '') {
      return false;
    }
  
    return !isNaN(char);
}
