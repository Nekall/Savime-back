import { Sequelize, DataTypes } from "sequelize";
import db from "../server.js";

const Managers = db.define("managers", {
  manager_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Manager must have firstname" },
      notEmpty: { message: "Manager firstname must not be empty" },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Manager must have lastname" },
      notEmpty: { message: "Manager lastname must not be empty" },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Manager must have a email" },
      notEmpty: { message: "Manager email must not be empty" },
      isEmail: { message: "Must be a valid email adress" },
    },
  },
  password: { type: DataTypes.STRING, allowNull: false },
  resetToken: { type: DataTypes.STRING, allowNull: true },
  profilePicture: {
    type: DataTypes.TEXT,
  },
});

console.log("🔨 Creating the manager table");
await Managers.sync({ alter: true }).then(() =>
  console.log("✅ Manager table successfully created.")
);

export default Managers;
