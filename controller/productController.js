const Product = require('../models/productModel');


// get all products
const getProducts = async(req, res)=>{
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (error) {
        console.error(error)
    }
}

// create a new product
const setProduct = async(req, res)=>{
    // const {name, price, quantity} =req.body;
    // const newProduct = await Product.create({name, price, quantity})
    // res.status(200).json({
    //     message: "Product crated successfully",
    //     newProduct
    // })
    const {name, price, quantity} = req.body;
    const newProduct =  await Product.create({
        name,
        price,
        quantity
    })

    res.status(200).json({
        message: "set product successfully",
        newProduct
    })


}
// update product
const updateProduct = async(req, res)=>{
    
    console.log("Updated route hit");

    const product = await Product.findById(req.params.id)
    res.status(200).json({
        message: "Got Product Updated request",
        product
    })
    
  
}
const deleteProduct = async(req, res)=>{
    
}
module.exports = {
    getProducts, 
    setProduct,
    updateProduct,
    deleteProduct
}