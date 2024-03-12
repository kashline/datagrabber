import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'
import Ingredient from './Ingredient.js';
import Recipe from './Recipe.js';

export default class RecipeIngredient extends Model {}

RecipeIngredient.init({
  quantity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Recipe,
        key: 'id'
    }
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Ingredient,
        key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'RecipeIngredient'
});

Recipe.belongsToMany(Ingredient, {through: "RecipeIngredients", foreignKey: "recipe_id"})
Ingredient.belongsToMany(Recipe, {through: "RecipeIngredients", foreignKey: "ingredient_id"})
