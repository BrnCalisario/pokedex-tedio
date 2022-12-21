const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(__dirname + '/js'))
app.use(express.static(path.join(__dirname, '/css')))


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params

  if (!isNumber(id)) {
    //res.sendFile(__dirname + "notfound.html")
    res.send('<h1> 404 Not Found </h1>')
  }

  res.sendFile(__dirname + "/pokemon.html")
})

function isNumber(str) {
  var pattern = /^\d+\.?\d*$/
  return pattern.test(str)

}

app.listen(process.env.PORT || 3000, () => console.log("Server running..."))


