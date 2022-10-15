import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Routes
import employeeRoutes from './routes/employee.route.js';
import managerRoutes from './routes/manager.route.js';

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config Header
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*',
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization',
    'Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//############### Routes #############
app.get('/', (req, res) => res.send('<h1>Welcome on Savime ! 🚀</h1>'));
app.use('/employees', employeeRoutes);
app.use('/managers', managerRoutes);
//####################################

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port ${process.env.PORT}.
  🛠️  In ${process.env.APP_ENV} environment.
    `)
});