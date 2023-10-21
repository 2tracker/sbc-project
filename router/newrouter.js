const express = require('express');
const News = require('../controller/NewletterController');
const multer = require('multer');
const path = require('path')

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/news");
    
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

router.post('/create',upload.fields([{ name: "p_image" }]),News.createNews);
router.put('/update/:id',upload.fields([ { name: "p_image" }]),News.updateNews);
router.get('/:id',News.GetbyIDNews);
router.get('/get/all', News.getAllNews);
router.get('/get/:filename', News.viewNews);
router.delete('/delete/:id', News.deleteNews);

module.exports = router;