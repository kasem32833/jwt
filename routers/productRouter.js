const express = require('express');
const { getProducts, setProduct, updateProduct, deleteProduct } = require('../controller/productController');
const productRouter = express.Router();


productRouter.post('/', setProduct);
productRouter.get('/all', getProducts);
productRouter.put('/:id', updateProduct);
productRouter.delete('/delete/:id', deleteProduct);


module.exports = productRouter;