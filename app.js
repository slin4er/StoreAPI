require('dotenv').config()
const connectDB = require('./db/connect')
require('express-async-errors')


const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddlewareHandler = require('./middleware/error-handler')
const productsRouter = require('./routes/products')

//middleware
app.use(express.json())

//routes
app.get('/',(req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

app.use('/api/v1/products', productsRouter)

//product routes
app.use(notFoundMiddleware)
app.use(errorMiddlewareHandler)

//server
const start = async() => {
    try {
        await connectDB(process.env.MONGOURI)
        app.listen(port, () => {console.log(`App is running on port ${port}...`)})
    } catch (error) {
        console.log(error.message)
    }
}
start()
