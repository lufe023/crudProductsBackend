
const uuid = require("uuid");

const Products = require("../models/products.models");


    //****  GET - SEARCH ALL PRODUCTS *****//
const getAllProducts = () =>{
    const data = Products.findAll();
    return data;
}

const countTotalProducts = async () =>{
    const data = await Products.findAll();
    return data.length; 
}

//***Count ******/
countTotalProducts()
    .then()
    .catch(err =>console.log(err))


//**** POST - CREATE *****//
const createProducts = async (data)=>{
    const productUUID =uuid.v4()
    const newProducts = await Products.create({
        id: productUUID,
        name: data.name,
        category: data.category,
        price: data.price,
        isAvailable: data.isAvailable,
        urlProduct: `http://127.0.0.1:7000/products/${productUUID}`
    });
    return newProducts;
};


    //****  GET - SEARCH PRODUCTS FOR ID *****//
const getProductsByid = async (id) => {
    const data = await Products.findOne({
        where : {
            id
            
        },
    });
    return data
};
  

        //****  PATCH - UPDATE *****//
    const editProducts = async (id,data)=>{
        const response = await Products.update(data, {
            where :{
                id
            },
        });
        return response
    }

  

        //****  DELETE - PRODUCTS FOR ID *****//
    const deleteProducts = async (id) =>{
        const data = await Products.destroy({
            where:{
                id: id
            }
        })
        return data
    }

 //************  TEST *******************//
    //? Search Products
    // getAllProducts()
    //     .then((response)=>console.log(response))
    //     .catch((err)=> console.log(err))

    //? New Products
    //  createProducts({
    //      name: 'Iphone',
    //      category: 'Phone',
    //      price: 1000
    //  })
    //      .then(response=>console.log(response))
    //      .catch(err => console.log(err))
  
    //? Find for id
    // getProductsByid('936cc1e8-9536-4f2d-a46b-2667ff77dd47')
    //     .then((response)=>console.log(response))
    //     .catch((err)=>console.log(err))

    //? Update Products
    // editProducts("936cc1e8-9536-4f2d-a46b-2667ff77dd47",{
    //    price: 300
    // })
    //     .then((response)=>{
    //         console.log(response);
    //      })
    //      .catch((err)=>{
    //         console.log(err)
    //      });

    //? Delete Products
    

    module.exports = {
        getAllProducts,
        getProductsByid,
        createProducts,
        editProducts,
        deleteProducts,
        countTotalProducts
    }