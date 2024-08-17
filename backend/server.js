import express from'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import path from'path'
import cors from 'cors'
//configure env
dotenv.config()

//database config
connectDB()

//rest object (The name of object is app i can be anything)
const app = express()

//middlewares
// app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//aws
const __dirname=path.dirname("")
const buildpath = path.join(__dirname,"../client/build")
app.use(express.static(buildpath))
app.use(
    cors({
        "origin":"*",
    })
)
//asw over


//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)


//rest api
// app.get('/', (req,res) => {
//     res.send({
//         message:'Welcome to ecommerce app'
//     })
// })

//aws change
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server Running on ${PORT}`)
})