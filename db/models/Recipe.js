import { Sequelize, DataTypes, Model } from 'sequelize';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

class Recipe extends Model {}

Recipe.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  length: {
    type: DataTypes.INTEGER
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Recipe' // We need to choose the model name
});

export default Recipe;

// the defined model is the class itself
console.log(Recipe === sequelize.models.Recipe); // true
