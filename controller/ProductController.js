const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const { title, description} = req.body;
    const imageUrls = req.files["p_image"] ? req.files["p_image"][0] : null;
    const product = new Product({
      title,
      description,
      p_image: imageUrls,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating Product" });
  }
};

exports.getAllProduct = async (req, res) => {
    try {
      const products = await Product.find({});
      if(products){
      res.status(201).send({ MSG:"All Product Finded",data:products});
      }else{
        res.status(201).send({ MSG:" Product is Not Avalible"});
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching Product" });
    }
  };


  exports.updateProduct = async (req, res) => {
    try {
      const ProductId = req.params.id;
      const { title, description } = req.body;
      const imageUrls = req.files["p_image"] ? req.files["p_image"][0] : null;
      const updateData = {
        title,
        description,
      };
      if (imageUrls) {
        updateData.p_image = imageUrls;
      }
      const product = await Product.findById(ProductId);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      Object.assign(product, updateData);
      await product.save();
      res.json({ message: "product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  };


  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  };
