import { Sequelize, DataTypes } from "sequelize";
import db from "../server.js";

const Employees = db.define("employees", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Employee must have firstname" },
      notEmpty: { message: "Employee firstname must not be empty" },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Employee must have lastname" },
      notEmpty: { message: "Employee lastname must not be empty" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Employee must have a email" },
      notEmpty: { message: "Employee email must not be empty" },
      isEmail: { message: "Must be a valid email adress" },
    },
  },
  password: { type: DataTypes.STRING, allowNull: false },
});

console.log('🔨 Creating the employee table');
await Employees.sync({ alter: true }).then(()=>console.log("✅ Employee table successfully created."));

export default Employees;
