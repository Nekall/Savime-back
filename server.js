import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

db.authenticate().then(() => {
  console.log('🔌 Connection to the database has been successfully established.');
}).catch((error) => {
  console.error('⚠️ Unable to connect to the database : ', error);
});

export default db;