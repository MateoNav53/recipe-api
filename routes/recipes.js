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

//add new recipes to data.json
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

//update recipe details
router.put("/", (req, res) => {
    const foundRecipe = data.recipes.find((recipe) => recipe.name === req.body.name)
    //if recipe doesn't exist, return a 404 error
    if(!foundRecipe){
        res.status(404).json({error: 'Recipe does not exist: ' + req.body.name})
    } else {
        //put request data in a new object
        const updatedRecipe = {
            name: req.body.name,
            instructions: [req.body.instructions],
            ingredients: [req.body.ingredients]
        }
        //json.stringify the recipe data
        let newRecipeData = JSON.stringify(updatedRecipe, null, 2);
        //create a variable to read data.json
        const fileData = JSON.parse(fs.readFileSync('data.json'))
        //edit the targeted data in data.json
        for(let i=0;i < data.recipes.length;i++){
            if(data.recipes[i].name === updatedRecipe.name){
                fileData.recipes.slice(i, 1, JSON.parse(newRecipeData))
                fs.writeFileSync('data.json', JSON.stringify(fileData, null, 2))
                res.status(200).json('recipe updated:' + JSON.parse(newRecipeData))
            }
        }
    }
})

module.exports = router;