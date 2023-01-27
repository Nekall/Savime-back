import { Sequelize, DataTypes } from "sequelize";
import db from "../server.js";

const Admin = db.define("admins", {
  admin_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Admin must have a email" },
      notEmpty: { message: "Admin email must not be empty" },
      isEmail: { message: "Must be a valid email adress" },
    },
  },
  password: { type: DataTypes.STRING, allowNull: false },
  resetToken: { type: DataTypes.STRING, allowNull: true },
});

console.log("🔨 Creating the admin table");
await Admin.sync({ alter: true }).then(() =>
  console.log("✅ Admin table successfully created.")
);

export default Admin;
