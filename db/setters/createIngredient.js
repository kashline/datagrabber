import Ingredient from "../models/Ingredient.js"

export default async function createIngredient(name){
    name = name.toLowerCase().trim()
    try {
        await Ingredient.sync().catch((err) => {
            console.log(err)
        })
        const res = await Ingredient.findOrCreate({
            where: {
                name: name
            },
            name: name
        }).catch(err => {
            console.log(err)
        })
        return await res[0].save()
    } catch (error) {
        console.log(`There was an error in createIngredient: ${error}`)
    }
}
