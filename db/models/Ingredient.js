import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js'

export default class Ingredient extends Model {}

Ingredient.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Ingredient'
});
