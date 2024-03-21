import Recipe from '../db/models/Recipe.js';
import createRecipe from '../db/setters/createRecipe.js';
import createIngredient from '../db/setters/createIngredient.js';
import createRecipeIngredient from '../db/setters/createRecipeIngredient.js';
import createRecipeSteps from '../db/setters/createRecipeSteps.js';

export const CreateRecipe = async function ({...data}){
    try {
        const recipe = await createRecipe(data.name, data.difficulty, data.length, null)
        Object.keys(data.ingredients).map(async (key) => {
            const ingredient = await createIngredient(Object.keys(data.ingredients[key])[0])
            await createRecipeIngredient(recipe.dataValues.id, ingredient.dataValues.id, Object.values(data.ingredients[key])[0])
        })
        Object.keys(data.steps).map(async (step_number) => {
            await createRecipeSteps(recipe.dataValues.id, step_number, data.steps[step_number])
        })
        return {
            status: 200,
            recipe: await Recipe.findAll({where: {name: data.name}})
        }
    } catch (error) {
        console.log(`There was an issue creating the Recipe: ${error}`)
        return false
    }
}
