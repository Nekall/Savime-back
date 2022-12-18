import { Sequelize, DataTypes } from "sequelize";
import Employees from "./employee.model.js";
import db from "../server.js";

const Documents = db.define("documents", {
  document_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "Document must have a name" },
      notEmpty: { message: "Document name must not be empty" },
    },
    unique: true
  },
  document: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { message: "Document cannot be null" },
      notEmpty: { message: "Document cannot be empty" },
    },
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

console.log("🔨 Creating the documents table");
await Documents.sync({ alter: true }).then(() =>
  console.log("✅ Documents table successfully created.")
);

export default Documents;
