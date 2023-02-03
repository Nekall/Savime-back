import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: 'mysql',
    port: process.env.MYSQLPORT,
  }
);

db.authenticate().then(() => {
  console.log('🔌 Connection to the database has been successfully established.');
}).catch((error) => {
  console.error('⚠️ Unable to connect to the database : ', error);
});

export default db;