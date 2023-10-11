const express = require('express');
const Blog = require('../controller/BlogController');
const multer = require('multer');
const path = require('path')

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/blog");
    
    },
    filename: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now() + extension);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
  });

router.post('/create',upload.fields([{ name: "p_image" }]),Blog.createBlog);
router.put('/update/:id',upload.fields([ { name: "p_image" }]),Blog.updateBlog);
router.get('/:id',Blog.GetByIDBlog);
router.get('/all', Blog.getAllBlog);
router.delete('/delete/:id', Blog.deleteBlog);

module.exports = router;