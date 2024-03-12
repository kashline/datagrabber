import Recipe from './db/models/Recipe.js';
import Ingredient from './db/models/Ingredient.js';
import RecipeIngredient from './db/models/RecipeIngredient.js';
import RecipeSteps from './db/models/RecipeSteps.js';

async function GetRecipe(name){
    let res = {
        name: name,
        difficulty: "",
        length: "",
        ingredients: [],
        steps: []
    }
    const dataName = await Recipe.findAll({
        where: {name: name},
        include: Ingredient, RecipeIngredient
    })
    dataName[0].dataValues.Ingredients.forEach(element => {
        // console.log(element.dataValues)
    });
    // console.log(dataName[0].dataValues.Ingredients)
    // if (dataName.length > 1){
    //     console.log(`Something is seriously wrong, multiple results to unique ID select`)
    // }
    // res.name = dataName[0].dataValues.name
    // res.difficulty = dataName[0].dataValues.difficulty
    // res.length = dataName[0].dataValues.length
    // const dataIngredients = await RecipeIngredient.findAll({where: {recipe_id: dataName[0].dataValues.id}})
    // console.log(dataIngredients)
}

export default GetRecipe;
