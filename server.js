//all you need to do to make a server is these 5 lines of code
const express = require('express')
const app = express();

app.listen(3000, () => {
    console.log("We live on port 3000")
})
///////////

//all you need to do to run a get request
//state your route and then res signifying response
//followed by a status code, then your json response

// app.use()
app.use('/recipes', require('./routes/recipes'))

// app.get("/recipes", (req, res, next) => {
//     res.status(200).json(data.recipes)
// })

// app.post("/add", )


