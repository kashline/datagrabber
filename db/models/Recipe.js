import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'

/**
 * Model for a recipe.  Contains the name, difficulty, length, mealdb_id, image url, and video url.
 */
export default class Recipe extends Model {}

Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  difficulty: {
    type: DataTypes.INTEGER
  },
  length: {
    type: DataTypes.INTEGER
  },
  mealdb_id: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING
  },
  video: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Recipe'
});
