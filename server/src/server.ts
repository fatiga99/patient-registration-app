import express, { Application, NextFunction, Request, Response } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { CustomError } from './utils/customError';
import patientRoutes from './routes/patientRoutes';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/patients', patientRoutes);

const pool = mysql.createPool({
  host: process.env.DB_HOST,        
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,    
  port: Number(process.env.DB_PORT) || 3306, 
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0             
});

export default pool;

//custom error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof CustomError ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

//middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});