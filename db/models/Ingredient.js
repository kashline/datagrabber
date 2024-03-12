import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'

export default class Ingredient extends Model {}

Ingredient.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Ingredient'
});
