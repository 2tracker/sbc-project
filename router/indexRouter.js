const express = require("express");
const User = require("./Userrouter");
const Product = require("./Productrouter");



const Router = express();

Router.use('/user',User)
Router.use('/product',Product)



module.exports = Router;
