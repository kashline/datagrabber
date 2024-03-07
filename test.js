// const Sequelize = require('sequelize');
import {Sequelize} from 'sequelize';

async function test(){
    const sequelize = new Sequelize('postgresql://postgres:uYOP9g2XtF@localhost:5432/kevinashline')
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}   

export default test;