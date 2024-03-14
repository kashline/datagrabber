export default class Recipe{
    constructor(data){
        console.log(data)
        // this.recipe_name = recipe_name
        // this.difficulty = difficulty
        // this.length = length
        // this.ingredients = ingredients
        // this.recipe_steps = recipe_steps
    }

    getRecipe(){
        return {
            name: this.recipe_name,
            difficulty: this.difficulty,
            length: this.length,
            Ingredients: ingredients,
            RecipeSteps: recipe_steps
        }
    }

};