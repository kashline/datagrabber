import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'
import Recipe from './Recipe.js';

export default class RecipeStep extends Model {}

RecipeStep.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
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
  modelName: 'RecipeStep'
});

Recipe.hasMany(RecipeStep, {foreignKey: 'recipe_id'})
RecipeStep.belongsTo(Recipe, {foreignKey: 'recipe_id'})
