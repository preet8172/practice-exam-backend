const express = require ('express');
const  Router = express.Router ();
const  categorycontroller =  require ('../controllers/categorycontroller');
const {protect,author, authorize} =  require ('../middleware/authmiddleware');

Router.Use(protect);
Router.get ('/',categorycontroller.getcategory);
Router.post('/', authorize('admin'), categorycontroller.createcategory);
Router.post('/delete/:id',authorize('admin'),categorycontroller.deleteCategory);

module.exports = Router
