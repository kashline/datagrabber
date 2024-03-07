import db from "./db.js"
import dbQuery from "./dbQuery.js"

async function NewRecipe({...data}){
    // Create recipe
    db('recipes', [data.name, data.difficulty, data.length])
    
    // Create each ingredient
    Object.keys(data.ingredients).map((key) => {
        db('ingredients', [Object.keys(data.ingredients[key])[0]])
    })

    // Gather recipe ID to build relationships
    const recipe_id = await dbQuery(`SELECT id FROM recipes WHERE name = '${data.name}'`)

    // Create recipe_ingredients relationship using recipe ID and ingredient ID
    Object.keys(data.ingredients).map(async (ingredient) => {
        const ingredient_id = await dbQuery(`SELECT id FROM ingredients WHERE name = '${Object.keys(data.ingredients[ingredient])[0]}'`)
        db('recipe_ingredients', [recipe_id[0].id, ingredient_id[0].id, Object.values(data.ingredients[ingredient])[0]])
    })

    // Create recipe_steps and relationship to recipe ID
    Object.keys(data.steps).map((step) => {
        db('recipe_steps', [recipe_id[0].id, step, data.steps[step]])
    })
}

export default NewRecipe;