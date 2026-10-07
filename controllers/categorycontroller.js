const category = require ('../models/Category.js');

exports. getcategory = async (req,res) => {
    const categories = await category.find();
    res.render('categoryList', {categories});
};

exports.createcategory = async (req,res) => {
    await category.create({ name : req.body.name});
    res.redirect('/categories');
};

exports.deleteCategory = async (req,res) => {
    await category.findByIdAndDelete(req.params.id);
    res.redirect('/categories');
};