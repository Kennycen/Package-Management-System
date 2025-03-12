import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import connectDB from "./config/mongodb.js";
import packageRouter from './routes/packageRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
connectDB();

app.use('/api/user', userRouter);
app.use('/api/package', packageRouter);

app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})