import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import moduleRoutes from './routes/moduleRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/modules', moduleRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Monica Business API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
