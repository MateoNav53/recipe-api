const express = require('express');
const router = express.Router();
let data = require('../data.json')
const fs = require('fs')

//get all information on all recipes
router.get("/all", (req, res, next) => {
    res.status(200).json(data)
})

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
    res.status(200).json({details: {ingredients: recipeDetails.ingredients, numSteps: recipeDetails.instructions.length}})
})

router.post("/", (req, res) => {
    const newRecipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    }

    const duplicate = data.recipes.find((item) => item.name === newRecipe.name)
    if(duplicate){
        res.status(400).json({error: "Recipe already exists"})
    } else {
        let newRecipeData = JSON.stringify(newRecipe, null, 2);
        const fileData = JSON.parse(fs.readFileSync('data.json'))
        fileData.recipes.push(JSON.parse(newRecipeData))
        fs.writeFileSync('data.json', JSON.stringify(fileData, null, 2));
        res.status(201).json("new recipe added!" + newRecipeData)
    }
    
})

module.exports = router;