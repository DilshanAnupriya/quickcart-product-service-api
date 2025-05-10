const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL

//===============
const CategoryRoute = require('./route/CatergoryRoute');
const CountryRoute = require('./route/CountryRoute');
const DiscountRoute = require('./route/DiscountRoute');
const ProductRoute = require('./route/ProductRoute');
const CartRoute = require('./route/CartRoute');
const BookmarkRoute = require('./route/BookmarkRoute');
const ReviewRoute = require('./route/ReviewRoute');
//===============

mongoose.connect(URL).then(()=>{
    console.log('MongoDB Connected!...');
}).catch(err=>{
    console.error((err));
});


app.listen(PORT,() => {
    console.log(`Server started on port: ${PORT}`);
});

//=============
app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/countries', CountryRoute);
app.use('/api/v1/discounts', DiscountRoute);
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/carts', CartRoute);
app.use('/api/v1/bookmarks', BookmarkRoute);
app.use('/api/v1/reviews', ReviewRoute);
//=============