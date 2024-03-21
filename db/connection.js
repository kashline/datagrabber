import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  username: 'postgres',
  host: 'localhost',
  database: 'kevinashline',
  port: '5432',
  password: 'uYOP9g2XtF',
  dialect: 'postgres',
  logging: false
 })

export default sequelize
