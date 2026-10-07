require ('dotenv').config();
const express = require ('express');
const bodyparser = require ('body-parser');
const cookieparser = require ('cookie-parser');
const path = require ('path');
const connectDB = require ('./config/db');

const authRoutes =  require('./routers/authrouters');
const productRouter = require ('./routers/productrouter');
const categoryRouter = require ('./routers/categoryrouter');

const app = express ();

connectDB();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieparser());

app.get('/',(req,res) => res.redirect('/auth/login'));

app.use('/auth',authRoutes);
app.use('/products',productRouter);
app.use('/categories', categoryRouter);

const PORT = process.env.PORT||4000;
app.listen*(PORT, () => console.log(`server executing live on http://localhost:${port}`));