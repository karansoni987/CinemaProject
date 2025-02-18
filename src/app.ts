import express from 'express';
import dotenv from 'dotenv';
import { prisma } from './config/prismaClient';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    console.log(`Ping received at ${new Date().toISOString()}`);
    res.json({ message: "Server is awake" });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
});
