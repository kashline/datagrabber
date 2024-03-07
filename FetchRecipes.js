import dbQuery from './dbQuery.js'

/**
 * 
 * @typedef {Object} fullQuery
 * @property {string} text - baseQuery plus props and WHERE/AND where appropriate.
 * @property {Array} value - Array containing the values mapped from props
 */

/**
 * 
 * @param {*} param0 
 */
async function Fetchrecipes({...props}){
    const baseQuery = 'SELECT * FROM recipes'
    let queryProps = []
    Object.keys(props).map((key) => {
        if (!(props[key] === '[]')){
            queryProps.push(`{"${key}": ${props[key]}}`)
        }
    })
    const query = addWhereAnd(baseQuery, queryProps)
    const selectRes = await dbQuery(query)
    let ids = []
    Object.keys(selectRes).map((key) => {
        ids.push(selectRes[key].id)
    })
    const res = await joinTables(ids)
    if (res){
        return res
    } else {
    }
}

async function joinTables(ids){
    const res = await dbQuery(
        {
            text: `SELECT * FROM ingredients INNER JOIN (SELECT ingredient_id FROM recipe_ingredients INNER JOIN recipes ON recipe_id = ANY ($1::int[])) recipe_ingredients ON ingredient_id=ingredients.id`,
            values: [ids]
        }
    )
    return res
}

/**
 * Concatenates baseQuery with props, returning an object containing the structured SQL query and values in correct order
 * @param {*} baseQuery 
 * @param {*} props 
 * @returns {fullQuery} 
 */
function addWhereAnd(baseQuery, props){
    let fullQuery = ''
    let values = []
    if (JSON.stringify(props) === '[]'){
        fullQuery = baseQuery
    } else {
        for (let i = 0; i < props.length; i++) {
            const key = Object.keys(JSON.parse(props[i]))[0]
            if (i === 0){
                fullQuery = baseQuery + ` WHERE ${Object.keys(JSON.parse(props[i]))[0]} = ANY ($1::int[])`
                values.push(JSON.parse(props[i])[key])
            } else {
                fullQuery = fullQuery + ` AND ${Object.keys(JSON.parse(props[i]))[0]} = ANY ($${i+1}::int[])`
                values.push(JSON.parse(props[i])[key])
            }
        }
    }
    return ({
        text: fullQuery,
        values: values
    })
}

export default (Fetchrecipes);