import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const { FRONT_LINK } = process.env;

// Routes
import employeeRoutes from "./routes/employee.route.js";
import managerRoutes from "./routes/manager.route.js";
import globalRoutes from "./routes/global.route.js";
import adminRoutes from "./routes/admin.route.js";
import documentRoutes from "./routes/document.route.js";
import newsRoutes from "./routes/new.route.js";
import companyInformationRoutes from "./routes/companyInformation.route.js"

// Associations
import Documents from "./models/document.model.js";
import Employees from "./models/employee.model.js";

const app = express();
app.use(cors({ credentials: true, origin: FRONT_LINK }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config Header
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*",
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//############### Routes #############
//app.get('/', (req, res) => res.send('<h1>Welcome on Savime ! 🚀</h1>'));
app.use("/", globalRoutes);
app.use("/employees", employeeRoutes);
app.use("/managers", managerRoutes);
app.use("/documents", documentRoutes);
app.use("/admin", adminRoutes);
app.use("/news", newsRoutes);
app.use("/company-informations", companyInformationRoutes);

Employees.hasMany(Documents, {
  foreignKey: "employee_id",
});
Documents.belongsTo(Employees, {
  foreignKey: "employee_id",
});

//####################################

//const test = await Documents.findByPk(1, {  include: Employees });
//console.log(test);

//####################################


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${process.env.PORT}.
  🛠️  In ${process.env.APP_ENV} environment.
    `);
});
