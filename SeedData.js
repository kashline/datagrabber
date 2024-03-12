import CreateRecipe from "./CreateRecipe.js"

const data = [
    {
        "name": "Cheeseburger",
        "ingredients": [
            {"burger patty": "1 patty"},
            {"burger bun": "1 bun"},
            {"paprika": "1 tsp"},
            {"american cheese": "1 slice"},
            {"salt": "to taste"},
            {"pepper": "to taste"},
            {"ketchup": "1tbsp"},
            {"garlic powder": "1 tsp"}
        ],
        "difficulty": "1",
        "length": "2",
        "steps": {
            "1": "Preheat oven to 425 degrees F.",
            "2": "Season patty on both sides with salt, pepper, paprika, and garlic powder.",
            "3": "Place patty in preheated oven for 20 minutes, flipping halfway through.",
            "4": "For toasty buns, place buns in the oven with 5 minutes remaining with the outside touching the pan.",
            "5": "Take patty out of oven and assemble on bun with ketchup and any other garnishes.  Serve immediately."
        }
    },
    {
        "name": "Hash",
        "ingredients": [
            {'potatoes': '10 potatoes'},
            {'kielbasa': '4 sausages'},
            {'honey mustard': '1 tbsp'},
            {'brown sugar': '1 tsp'}
        ],
        "difficulty": "1",
        "length": "1",
        "steps": {

        }
    },
    {
        "name": "Sandwich Bread",
        "ingredients": [
            {'flour': '4 cups'},
            {'yeast': '1 tsp'},
            {'water': '1 cup'}
        ],
        "difficulty": "1",
        "length": "3",
        "steps": {

        }
    },
    {
        "name": "Steak",
        "ingredients": [
            {'steak': '1 steak'},
            {'salt': '3/4 tsp per 1lb'},
            {'pepper': '3/4 tsp per 1lb'}
        ],
        "difficulty": "2",
        "length": "2",
        "steps": {

        }
    },
    {
        "name": "Lemon Ricotta Pasta",
        "ingredients": [
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
        "difficulty": "1",
        "length": "1",
        "steps": {

        }
    },
    {
        "name": "Shepherd\s pie",
        "ingredients": [
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
        ],
        "difficulty": "2",
        "length": "3",
        "steps": {
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
    },
]

function SeedData(){
    try {
        for (let i = 0; i < data.length; i++) {
            CreateRecipe(data[i])
        }
    } catch (error) {
        console.error(error, recipe)
    }
    return true
}

export default SeedData;
