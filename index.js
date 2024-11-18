const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 5000;
const userRouter = require('./routers/userRouter')
const morgan = require('morgan');
const testRouter = require('./routers/testRoute');
const productRouter = require('./routers/productRouter');
const seedRouter = require('./routers/seedRouter');




// express app initialization
const app = express();
dotenv.config()
app.use(express.json());

app.use(morgan('dev'));

app.use("/api/users", userRouter);

app.use("/products", productRouter)
app.use("/api/seed", seedRouter)




// Database connection
mongoose.connect("mongodb+srv://jwt-admin:8HlNlHBYGmxoUkAM@cluster0.pygokcx.mongodb.net/jwt?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('Database is connected');
    app.listen(port, ()=>{
        console.log("jwt server is running on port: 5000");
    })
})
.catch((error)=>{console.error(error.message)})


app.get('/', async(req, res)=>{
    res.send("welcome to jwt server")
})



