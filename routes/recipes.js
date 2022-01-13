const express = require('express');
const router = express.Router();
const data = require('./../data.json')


router.get("/", (req, res, next) => {
    const namesArr = []
    data.recipes.forEach((recipe) => namesArr.push(recipe.name))
    res.status(200).send({recipeNames: namesArr})
})






module.exports = router;