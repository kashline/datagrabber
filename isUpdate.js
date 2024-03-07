import dbQuery from "./dbQuery.js";

async function isUpdate(table, data){
    let query
    switch (table) {
        case 'recipes':
            query = {
                text: `SELECT name FROM ${table} WHERE name=$1`,
                values: [data[0]]
            }
            let res = await dbQuery(query)
            return (res[0] !== undefined && res[0].hasOwnProperty('name'))
        case 'ingredients':
            text = `INSERT INTO ${table} (name) SELECT${args} WHERE NOT EXISTS (SELECT * FROM ${table} WHERE name=$1)`
            break;
        case 'recipe_ingredients':
            text = `INSERT INTO ${table} (recipe_id, ingredient_id, quantity) SELECT${args} WHERE NOT EXISTS (SELECT * FROM ${table} WHERE recipe_id=$1 AND ingredient_id=$2)`
            break;
        case 'recipe_steps':
            text = `INSERT INTO ${table} (recipe_id, step_number, step) SELECT${args} WHERE NOT EXISTS (SELECT * FROM ${table} WHERE recipe_id=$1 AND step_number=$2)`
            break;
        default:
            break;
    }
    return false
}

export default isUpdate;
