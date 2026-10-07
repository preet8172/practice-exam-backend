const user = require ('../models/user');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

exports.getRegister =  (req,res) => res.render('register');
exports.getlogin = (req,res) => res.render('login');

exports.register = async (req,res) => {
    try{
        const{username,password,role} = req.body;
        await user.create ({username,password,role});
        res.redirect('/auth/login');
    }catch (e) {
        res.status (400).send('registration failed :' + err.message);
    }
};
 exports.login  = async (req,res) => {
    try{
        const {username,password} = req.body;
        const user =await user. findOne({username});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status (401).send ('Invalid Credentials');
        }

        const token = jwt.sign({ id: user._id, username: user.username, role : user.role},process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token',token,{httpOnly: true});
        res.redirect('/products');
    }catch(e){
        res.status (404).send ('Server Error');
    }
 };

 exports.logout = (req,res) =>{
    res.clearcookie('token');
    res.redirect('/auth/login')
 };