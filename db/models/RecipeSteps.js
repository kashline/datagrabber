import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'
import Ingredient from './Ingredient.js';
import Recipe from './Recipe.js';

export default class RecipeSteps extends Model {}

RecipeSteps.init({
  step: {
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
  step_number: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'RecipeSteps'
});

Recipe.hasMany(RecipeSteps)
