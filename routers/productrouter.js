const express = require('express')
const  Router = express.Router();
const  productcontroller = require ('../controllers/productcontrollers');
const {protect} =require ('../middleware/authmiddleware');

Router.use(protect);
Router.get('/',productcontroller.getAllProducts);
Router.get('/my-products',productcontroller.getMyProducts);
Router.get('/new',productcontroller.getProductFrom);
Router.post('/new', productcontroller.createProduct);

module.exports = Router;