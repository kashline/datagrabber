import Recipe from './db/models/Recipe.js';
import Ingredient from './db/models/Ingredient.js';
import RecipeStep from './db/models/RecipeStep.js';

async function GetRecipe(name){
    let res = {
        name: name,
        difficulty: "",
        length: "",
        ingredients: [],
        steps: []
    }
    const dataName = await Recipe.findAll({
        where: {
            name: name
        },
        include: [
        {
            model: Ingredient
        },
        {
            model: RecipeStep
        }
    ]
    })
    res.name = dataName[0].name
    res.difficulty = dataName[0].difficulty
    res.length = dataName[0].length

    dataName[0].dataValues.Ingredients.forEach(element => {
        res.ingredients.push({[element.dataValues.name]: element.dataValues.RecipeIngredient.dataValues.quantity})
    });
    dataName[0].dataValues.RecipeSteps.forEach(element => {
        res.steps.push({[element.dataValues.step_number]: element.dataValues.step})
    })
    return dataName[0].toJSON()
}

export default GetRecipe;
