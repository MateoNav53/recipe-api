const express = require('express')
const app = express();
app.use(express.json())

require('dotenv').config();

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log(`We live on port ${port}`)
})

app.use('/recipes', require('./routes/recipes'))



