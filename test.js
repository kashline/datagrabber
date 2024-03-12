import { Sequelize } from 'sequelize';
import Recipe from './db/models/Recipe.js'

const sequelize = new Sequelize({
  username: 'postgres',
  host: 'localhost',
  database: 'kevinashline',
  port: '5432',
  password: 'uYOP9g2XtF',
  dialect: 'sqlite',
  storage: ':memory:',
 })

async function test(){
    const test = Recipe.build({name: 'Hash', difficulty: 1, length: 2})
    console.log(test)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}   

export default test;