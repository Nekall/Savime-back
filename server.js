import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQLHOST,
  }
);

db.authenticate().then(() => {
  console.log('🔌 Connection to the database has been successfully established.');
}).catch((error) => {
  console.error('⚠️ Unable to connect to the database : ', error);
});

export default db;