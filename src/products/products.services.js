const { response } = require("express");
const productsController = require("./products.controller")

const getAllProducts = async(req, res) =>{
    const count = await productsController.countTotalProducts()
    productsController
    .getAllProducts()
    .then((data)=>{
        res.status(200).json({
            prev_Page:"http://127.0.0.1:7000/",
            count: count,
            result: data
        })
    })
    .catch((err)=>{
        res.status(400).json({message: err.message});
    });
};

const postProducts = (req, res)=>{
    const data = req.body;
    if(data.name && data.category && data.price){
    productsController.createProducts(data)
        .then(response=>{
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    }else{
        res.status(400).json({message:'Missing Data'})
    }
}

const getProductsByid = (req, res)=>{
    const id = req.params.id;
    productsController.getProductsByid(id)
        .then(data=>{
            if(data){
                res.status(200).json({
                    prev_Page: "http://127.0.0.1:7000/products/",
                    data
                })
            }else{
                res.status(400).json({message:'Invalid ID'})
            }
        })
        .catch(err=>{
            res.status(404).json({message: err.message})
        })
}

const patchProducts = (req, res) => {
    const id = req.params.id 
    const {name, category, price, isAvailable} = req.body;
  
    productsController.editProducts(id, {name, category, price, isAvailable})
      .then((response) => {
        //? [0]
        if(response[0]){
          res.status(200).json({
            message: `Product with id: ${id}, edited succesfully!`
          })
        } else {
          res.status(400).json({message: 'Invalid ID'})
        }
      })
      .catch(error => {
        res.status(400).json({message: error.message})
      })
  }
  
 const deleteProducts = (req, res) => {
    const id = req.params.id
    productsController.deleteProducts(id)
        .then((response)=>{
            if(response){
                res.status(204).json()
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
        .catch(err=>{
            res.status(400).json(err)

        })
    }

 
module.exports = {
    getAllProducts,
    getProductsByid,
    postProducts, 
    patchProducts,
    deleteProducts
}