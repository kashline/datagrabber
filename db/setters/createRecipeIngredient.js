import RecipeIngredient from "../models/RecipeIngredient.js"

export default async function createRecipeIngredient(recipe_id, ingredient_id, quantity){
    try {
        await RecipeIngredient.sync().catch((err) => {
            console.log(err)
        })
        const res = await RecipeIngredient.findOrCreate({
            where: {
                recipe_id: recipe_id,
                ingredient_id: ingredient_id
            },
            defaults: {
                recipe_id: recipe_id,
                ingredient_id: ingredient_id,
                quantity: quantity
            }
        }).catch(err => {
            console.log(err)
        })
        if(res[0].quantity !== quantity){
            res[0].set({
                quantity: quantity
            })
            await res[0].save({ fields: ['quantity'] })
        }
    } catch (error) {
        console.log(`There was an error in createRecipeIngredient: ${error}`)
    }
}
