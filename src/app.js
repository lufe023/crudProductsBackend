const express = require('express');

//? Import bd
const db = require('./utils/database')
const initModels = require('./models/initModels')
const config = require('./config')
const productsRouter = require('./products/products.router')
const app = express();

//? Validation Credential

db.authenticate()
    .then (()=> console.log('Authentication Succesfull'))
    .catch((err)=> console.log(err))

//? Sincronizo DB

db.sync()
    .then(()=>console.log('Database Syced'))
    .catch(err=>console.log(err))

initModels()

app.use(express.json())

app.get('/', (req,res)=>{
    res.status(200).json({
        pag_Menu:"http://127.0.0.1:7000/products",
        message: 'ok'
    })
})

app.use('/products', productsRouter)

app.listen(config.port, ()=>{
    console.log(`Server started at port ${config.port}`);
});