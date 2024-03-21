import createRecipe from '../db/setters/createRecipe.js';
import createIngredient from '../db/setters/createIngredient.js';
import createRecipeIngredient from '../db/setters/createRecipeIngredient.js';
import createRecipeSteps from '../db/setters/createRecipeSteps.js';

/**
 * Grabs a random recipe from themealdb, aggregates the quantities, and writes to the database.
 */
async function MealScraper(){
    const recipe = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json()
    const recipeData = {
        mealdb_id: recipe.meals[0].idMeal,
        image: recipe.meals[0].strMealThumb,
        video: recipe.meals[0].strYoutube,
        name: recipe.meals[0].strMeal,
        steps: recipe.meals[0].strInstructions.split(/\r?\n/).filter((e) => {
            if(e !== ''){
                return e
            }
        }),
        ingredients: []
    }
    recipeData.difficulty = Math.round(recipeData.steps.length * 0.7 + recipeData.ingredients.length * 0.3)
    recipeData.length = recipeData.steps.length
    try {
        const recipeModel = await createRecipe(recipeData.name, recipeData.difficulty, recipeData.length, recipeData.mealdb_id, recipeData.image, recipeData.video)
        recipeData.recipe_id = recipeModel.dataValues.id
    } catch (error) {
        console.log(error)
    }
    for (let i = 0; i < recipeData.steps.length; i++) {
        await createRecipeSteps(recipeData.recipe_id, i, recipeData.steps[i])
    }
    aggregateRecipeIngredients(recipe, recipeData)
}

/**
 * 
 * @param {Object} recipe JSON Recipe response from themealdb.
 * @param {*} recipeData 
 * Aggregates the quantity of ingredients and writes all ingredients and ingredient/recipe associations to the database.
 */
async function aggregateRecipeIngredients(recipe, recipeData){
    let aggregated = {}
    for (let i = 1; i <= 20; i++) {
        const ingredient = eval(`recipe.meals[0].strIngredient${i}`)
        const quantity = eval(`recipe.meals[0].strMeasure${i}`)
        if (!(ingredient === '' || ingredient === null)){
            const ingredient_id = await createIngredient(ingredient)
            if (aggregated[ingredient_id.dataValues.id]){
                aggregated[ingredient_id.dataValues.id].quantity = `${aggregated[ingredient_id.dataValues.id].quantity} + ${quantity}`
            } else {
                aggregated[ingredient_id.dataValues.id] = {
                    recipe_id: recipeData.recipe_id,
                    quantity: quantity
                }
            }
        }
    }
    Object.keys(aggregated).map(async (key) => {
        try {
            await createRecipeIngredient(aggregated[key].recipe_id, key, aggregated[key].quantity)
        } catch (error) {
            console.log(`Error in aggregate quantities: ${error} \\n ${aggregated}`)
        }
        
    })
}

export default MealScraper
