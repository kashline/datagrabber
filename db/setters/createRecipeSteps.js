import RecipeStep from "../models/RecipeStep.js"

export default async function createRecipeSteps(recipe_id, step_number, step){
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
        }).catch(err => {
            console.log(err)
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