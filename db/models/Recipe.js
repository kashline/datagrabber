import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'

export default class Recipe extends Model {}

Recipe.init({
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
  }
}, {
  sequelize,
  modelName: 'Recipe'
});
