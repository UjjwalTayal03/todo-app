import express from 'express';
import cors from 'cors'
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import dotenv from "dotenv";



const app = express()

app.use(express.json())
dotenv.config();
connectDb()

app.use(cors())

app.get('/', (req,res)=>{
    res.send('Hello World abdc')
})

app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes)
app.use("/api/tasks", taskRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000')
})
