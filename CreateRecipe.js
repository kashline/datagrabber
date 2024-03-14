import Recipe from './db/models/Recipe.js';
import Ingredient from './db/models/Ingredient.js';
import RecipeIngredient from './db/models/RecipeIngredient.js';
import RecipeStep from './db/models/RecipeStep.js';

async function CreateRecipe({...data}){
    try {
        await syncAll().catch((err) => {
            console.log(err)
        })
        const recipe = await createRecipe(data.name, data.difficulty, data.length)
        Object.keys(data.ingredients).map(async (key) => {
            const ingredient = await createIngredient(Object.keys(data.ingredients[key])[0])
            await createRecipeIngredient(recipe[0].dataValues.id, ingredient.dataValues.id, Object.values(data.ingredients[key])[0])
        })
        Object.keys(data.steps).map(async (step_number) => {
            await createRecipeSteps(recipe[0].dataValues.id, step_number, data.steps[step_number])
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

async function createRecipe(name, difficulty, length){
    try {
        await Recipe.sync().catch((err) => {
            console.log(err)
        })
        const res = await Recipe.findOrCreate({
            where: {name: name},
            name: name, 
            difficulty: difficulty, 
            length: length
        })
        if(res[0].difficulty != difficulty || res[0].length != length){
            console.log(`Data difference detected in ${res[0].name}: ${res[0].difficulty} ${difficulty}, ${res[0].length} ${length}`)
            res[0].set({ 
                difficulty: difficulty, 
                length: length
            })
            res = await res[0].save()
        }
        return res
    } catch (error) {
        console.log(`There was an error in createRecipe: ${error}`)
    }
}

async function createIngredient(name){
    try {
        await Ingredient.sync().catch((err) => {
            console.log(err)
        })
        const res = await Ingredient.findOrCreate({
            where: {
                name: name
            },
            name: name
        })
        return await res[0].save()
    } catch (error) {
        console.log(`There was an error in createIngredient: ${error}`)
    }
}

async function createRecipeIngredient(recipe_id, ingredient_id, quantity){
    try {
        await RecipeIngredient.sync().catch((err) => {
            console.log(err)
        })
        const res = await RecipeIngredient.findOrCreate({
            where: {
                recipe_id: recipe_id,
                ingredient_id: ingredient_id,
                quantity: quantity
            },
            recipe_id: recipe_id,
            ingredient_id: ingredient_id,
            quantity: quantity
        })
        if(recipe_id !== res[0].recipe_id || ingredient_id !== res[0].ingredient_id){
            res[0].set({
                recipe_id: recipe_id,
                ingredient_id: ingredient_id,
                quantity: quantity
            })
            await res[0].save()
        }
    } catch (error) {
        console.log(`There was an error in createRecipeIngredient: ${error}`)
    }
}

async function createRecipeSteps(recipe_id, step_number, step){
    try {
        await RecipeStep.sync()
        const res = await RecipeStep.findOrCreate({
            where: {
                recipe_id: recipe_id,
                step_number: step_number,
                step: step
            },
            recipe_id: recipe_id,
            step_number: step_number,
            step: step
        })
        if(recipe_id !== res[0].recipe_id || step_number !== res[0].step_number || step !== res[0].step){
            res[0].set({
                recipe_id: recipe_id,
                step_number: step_number,
                step: step
            })
            await res[0].save()
        }
        return res
    } catch (error) {
        console.log(`There was an error in createRecipeSteps: ${error}`)
    }
}

// sync all models 
async function syncAll(){
    try {
        await Recipe.sync()
        await Ingredient.sync()
        await RecipeIngredient.sync()
        await RecipeStep.sync()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default CreateRecipe;
