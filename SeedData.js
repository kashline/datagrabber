import db from "./db.js"
import dbQuery from "./dbQuery.js"
import isUpdate from "./isUpdate.js"

// Tables
{
    dbQuery('CREATE TABLE IF NOT EXISTS recipes (id serial, name text, difficulty integer, length integer)')
    dbQuery('CREATE TABLE IF NOT EXISTS recipe_ingredients (id serial, recipe_id integer, ingredient_id integer, quantity text)')
    dbQuery('CREATE TABLE IF NOT EXISTS recipe_steps (id serial, recipe_id integer, step_number integer, step text)')
}

// Recipes
// (name, difficulty, length)
const recipes = [
    ['Hash', 1, 1],
    ['Sandwich Bread', 1, 3],
    ['Steak', 2, 1],
    ['Lemon Ricotta Pasta', 1, 1],
    ['Shepherd\s pie', 2, 3]
]
// Ingredients
// (name)
const ingredients = [
    'flour', 
    'water', 
    'yeast',
    'potatoes',
    'kielbasa',
    'honey mustard',
    'brown sugar',
    'salt',
    'pepper',
    'avocado oil',
    'steak',
    'angel hair pasta',
    'olive oil',
    'spinach',
    'shallot',
    'garlic',
    'parmesean',
    'ricotta',
    'lemon',
    'bacon',
    'whole milk',
    'heavy cream',
    'cheddar cheese',
    'chicken bullion',
    'peas',
    'carrots',
    'onion',
    'chicken breast',
    'garlic powder',
    'paprika',
    'butter'
]

const recipe_ingredients = {
    'Hash': [
        {'potatoes': '10 potatoes'},
        {'kielbasa': '4 sausages'},
        {'honey mustard': '1 tbsp'},
        {'brown sugar': '1 tsp'}
    ],
    'Sandwich Bread': [
        {'flour': '4 cups'},
        {'yeast': '1 tsp'},
        {'water': '1 cup'}
    ],
    'Steak': [
        {'steak': '1 steak'},
        {'salt': '3/4 tsp per 1lb'},
        {'pepper': '3/4 tsp per 1lb'}
    ],
    'Lemon Ricotta Pasta': [
        {'angel hair pasta': '12 oz'},
        {'olive oil': '1 tbsp'},
        {'spinach': '3 cups'},
        {'shallot': '1 shallot'},
        {'garlic': '4 cloves'},
        {'ricotta': '1 cup'},
        {'lemon': '3 tbsp'},
        {'parmesean': '1/2 cup'},
        {'salt': 'to taste'},
        {'pepper': 'to taste'}
    ],
    'Shepherd\s pie': [
        {'potatoes': '5 potatoes'},
        {'peas': '1 cup'},
        {'carrots': '4 carrots'},
        {'chicken bullion': '1 tbsp'},
        {'bacon': '6 strips'},
        {'flour': '1 tbsp'},
        {'onion': '1 onion'},
        {'olive oil': '1 tsp'},
        {'salt': 'to taste'},
        {'pepper': 'to taste'},
        {'water': '4 cups'},
        {'garlic powder': '1 tbsp'},
        {'paprika': '1 tsp'},
        {'whole milk': '1/2 cup'},
        {'heavy cream': '1/4 cup'},
        {'butter': '4 tbsp'},
        {'cheddar cheese': '2 cups'},
        {'chicken breast': '2 breasts'}
    ]
}

const recipe_steps = {
    'Mac & Cheese': {
        1: "Preheat oven to 350F. Lightly grease a large 3 qt or 4 qt baking dish and set aside.Combine shredded cheeses in a large bowl and set aside.",
        2: "Cook the pasta one minute shy of al dente according to the package instructions. Remove from heat, drain, and place in a large bowl.",
        3: "Drizzle pasta with olive oil and stir to coat pasta. Set aside to cool while preparing cheese sauce.",
        4: "Melt butter in a deep saucepan, dutch oven, or stock pot.",
        5: "Whisk in flour over medium heat and continue whisking for about 1 minute until bubbly and golden.",
        6: "Gradually whisk in the milk and heavy cream until nice and smooth. Continue whisking until you see bubbles on the surface and then continue cooking and whisking for another 2 minutes. Whisk in salt and pepper.",
        7: "Add two cups of shredded cheese and whisk until smooth. Add another two cups of shredded cheese and continue whisking until creamy and smooth. Sauce should be nice and thick.",
        8: "Stir in the cooled pasta until combined and pasta is fully coated with the cheese sauce.",
        9: "Pour half of the mac and cheese into the prepared baking dish. Top with remaining 2 cups of shredded cheese and then the remaining mac and cheese.",
        10: "In a small bowl, combine panko crumbs, Parmesan cheese, melted butter and paprika. Sprinkle over the top and bake until bubbly and golden brown, about 30 minutes. Serve immediately.",
    },
    'Shepherd\s pie': {
        1: "Preheat oven to 425",
        2: "In a medium saucepan, heat olive oil over medium heat.",
        3: "Peel and dice potatoes into cubes.  Coat in a thin layer of canola or avocado oil, salt, and pepper.  Place into preheated oven for 30-40 minutes or until golden brown.  If using uncooked bacon, place bacon in oven with potatoes at this step.",
        4: "Season both sides of chicken breasts with salt and pepper.  Put in oven with potatoes for 30-40 minutes.",
        5: "Peel and dice onion.  Saute in medium pan until slightly translucent.  Then add peas and carrots and season with garlic powder and paprika.",
        6: "In another medium saucepan, place water and chicken bullion over medium heat.",
        7: "In a small bowl add flour and cold water and mix until homogenous.",
        8: "Pur flour slurry into chicken bullion.  Mix until thick then bring off heat.",
        9: "When potatoes have ~5 minutes left, place bacon strips in oven if using fully cooked.",
        10: "When golden brown and cripsy bacon is achieved, remove from oven and let cool for 5 minutes",
        11: "Dice chicken and add it to the bullion mixture.",
        12: "In a large bowl, mash the potatoes until smooth.",
        13: "Mix cheddar cheese, whole milk, cream, and crumbled bacon with the potatoes.",
        14: "In a casserole dish, pour all chicken mixture in and then layer the potato mixture on top.  Be sure to cover the entire dish.",
        15: "Broil casserole dish for 10 minutes or until the potatoes have become brown and crispy.  Serve immediately."
    }
}

function SeedData(){
    try {
        Object.keys(recipes).map((key) => {
            isUpdate('recipes', recipes[key])
            db('recipes', recipes[key])
        })
        Object.keys(ingredients).map((key) => {
            db('ingredients', [ingredients[key]])
        })
        Object.keys(recipe_ingredients).map(async (recipe) => {
            const recipe_id = await dbQuery(`SELECT id FROM recipes WHERE name = '${recipe}'`)
            console.log(recipe)
            Object.keys(recipe_ingredients[recipe]).map(async (ingredient) => {
                const ingredient_id = await dbQuery(`SELECT id FROM ingredients WHERE name = '${Object.keys(recipe_ingredients[recipe][ingredient])[0]}'`)
                
                if (recipe_id && ingredient_id){
                    console.log(recipe_id)
                    // db('recipe_ingredients', [recipe_id[0].id, ingredient_id[0].id, Object.values(recipe_ingredients[recipe][ingredient])[0]])
                }
            })
        })
        Object.keys(recipe_steps).map(async (recipe) => {
            const recipe_id = await dbQuery(`SELECT id FROM recipes WHERE name = '${recipe}'`)
            if (recipe_id){
                Object.keys(recipe_steps[recipe]).map((step) => {
                    // db('recipe_steps', [recipe_id[0].id, step, recipe_steps[recipe][step]])
                })
            }
        })
    } catch (error) {
        console.error(error, recipe)
    }
    
    return true
}

export default SeedData;
