import express from'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'

import cors from 'cors'
//configure env
dotenv.config()

//database config
connectDB()

//rest object (The name of object is app i can be anything)
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)


//rest api
app.get('/', (req,res) => {
    res.send({
        message:'Welcome to ecommerce app'
    })
})

//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT,() => {
    console.log(`Server Running on ${PORT}`)
})