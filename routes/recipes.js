const express = require('express');
const router = express.Router();
const data = require('./../data.json')

//get all recipe names
router.get("/", (req, res, next) => {
    const namesArr = []
    data.recipes.forEach((recipe) => namesArr.push(recipe.name))
    res.status(200).json({recipeNames: namesArr})
})

//get the ingredients and number of steps for a recipe given a recipe name in req.params
router.get("/details/:recipeName", (req, res) => {
    const recipeDetails = data.recipes.find((recipe) => recipe.name === req.params.recipeName)
    if(!recipeDetails){
        res.json('Recipe not found, or spelled incorrectly')
    }
    res.status(200).json({details: {"ingredients": recipeDetails.ingredients, "numSteps": recipeDetails.instructions.length}})
})



module.exports = router;