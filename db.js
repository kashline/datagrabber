// db.js
import dbQuery from "./dbQuery.js";
import isUpdate from "./isUpdate.js";

async function db(table, data){
    let args = ''
    let text = ''
    if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
            i === data.length-1 ? args = `${args} $${i+1}` : args = `${args} $${i+1},`
        }
    }
    switch (table) {
        case 'recipes':
            if (isUpdate(table, data)){
                console.log(args)
                text = `UPDATE ${table} SET name=$1, difficulty=$2, length=$3`
            } else {
                text = `INSERT INTO ${table} (name, difficulty, length) SELECT${args} WHERE NOT EXISTS (SELECT * FROM ${table} WHERE name=$1)`
            }
            break;
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
    const query = {
        text: text,
        values: data
    }
    const res = await dbQuery(query)
}

export default db;
