const express = require("express");
const User = require("./Userrouter");
const Product = require("./Productrouter");
const Blog = require("./Blogrouter");
const News = require("./newrouter");



const Router = express();

Router.use('/user',User)
Router.use('/product',Product)
Router.use('/blog',Blog)
Router.use('/news',News)



module.exports = Router;
