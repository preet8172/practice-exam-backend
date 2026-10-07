const Product  = require ('../models/Product.js');
const category = require ('../models/Category.js');
const User = require ('../models/user.js');

exports. getAllProducts = async (req,res) => {
    const { categoryFilter } = req.query;
    let filter = {};
    if (categoryFilter) filter.category = categoryFilter;


const  Products = await Product.find(filter).populate('category').populate('createdBy');
const  categories = await category.find();
res.render('productList', {Products,categories, selectedCategory: categoryFilter});
};

exports.getMyProducts =  async (req,res) => {
    const user = await user.findById(req.user.id).populate ({
        path:'myProducts',
        populate: {path:'category'}
    });
    res.render('myProducts',{products:user.myProducts});
};

exports.getProductFrom = async (req,res) => {
    const categories = await category.find();
    res.render('ProductFrom',{categories});
};

exports.createProduct = async (req,res) => {
    const {name , prize , category} = req.body;
    const newProduct = await product.create({ name,prize,category,createdBy: req.user.id});

    await User.findByIdAndUpdate(req.user.id, {$push: {myproduct:newProduct._id}});
    res.redirect('/Products/my-products');
};
