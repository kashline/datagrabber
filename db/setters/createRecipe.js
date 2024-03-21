import Recipe from "../models/Recipe.js"

export default async function createRecipe(name, difficulty, length, mealdb_id, image, video){
    try {
        await Recipe.sync().catch((err) => {
            console.log(err)
        })
        const res = await Recipe.findOrCreate({
            where: {name: name},
            defaults: {
                name: name, 
                difficulty: difficulty, 
                length: length,
                mealdb_id: mealdb_id,
                image: image,
                video: video
            }
        }).catch(err => {
            console.log(err)
        })
        if (res[0]._options.isNewRecord){
            console.log(`New recipe! ${res[0].name}`)
        }
        if(res[0].difficulty != difficulty || res[0].length != length || res[0].mealdb_id != mealdb_id || res[0].image != image || res[0].video != video){
            res[0].set({ 
                difficulty: difficulty, 
                length: length,
                mealdb_id: mealdb_id,
                image: image,
                video: video
            })
            await res[0].save()
        }
        return res[0]
    } catch (error) {
        console.log(`There was an error in createRecipe: ${error}`)
    }
}
