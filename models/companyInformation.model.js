import { Sequelize, DataTypes } from "sequelize";
import db from "../server.js";

const CompanyInformation = db.define("companyInformation", {
    company_information_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
});

console.log("🔨 Creating the CompanyInformation table");
await CompanyInformation.sync({ alter: true }).then(() =>
  console.log("✅ CompanyInformation table successfully created.")
);

export default CompanyInformation;
