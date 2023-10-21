const express = require('express');
const Product = require('../controller/ProductController');
const multer = require('multer');
const path = require('path')

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/product");
    
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

router.post('/create',upload.fields([{ name: "p_image" }]),Product.createProduct);
router.put('/update/:id',upload.fields([ { name: "p_image" }]),Product.updateProduct);
router.get('/all', Product.getAllProduct);
router.get('/get/:id', Product.GetbyIDProject);
router.get('/:filename', Product.viewProduct);
router.delete('/delete/:id', Product.deleteProduct);

module.exports = router;