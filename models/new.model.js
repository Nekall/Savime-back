import { Sequelize, DataTypes } from "sequelize";
import db from "../server.js";

const New = db.define("news", {
  new_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { message: "News must have a title" },
      notEmpty: { message: "News title must not be empty" },
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { message: "News must have a content" },
      notEmpty: { message: "News content must not be empty" },
    },
  },
});

console.log("🔨 Creating the news table");
await New.sync({ alter: true }).then(() =>
  console.log("✅ News table successfully created.")
);

export default New;
