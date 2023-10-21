const News = require("../model/Newsletter");
const path = require('path')
exports.createNews = async (req, res) => {
  try {
    const { title, description} = req.body;
    const imageUrls = req.files["p_image"] ? req.files["p_image"][0] : null;
    const news = new News({
      title,
      description,
      p_image: imageUrls,
    });
    await news.save();
    res.status(201).json({ message: "News created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating News" });
  }
};

exports.getAllNews = async (req, res) => {
  const news = await News.find({});
  if(news){
  res.status(201).send({ MSG:"All news Finded",data:news});
  }else{
    res.status(201).send({ MSG:" news is Not Avalible"});
  }
  };


  exports.updateNews = async (req, res) => {
    try {
      const NewsID = req.params.id;
      const { title, description } = req.body;
      const imageUrls = req.files["p_image"] ? req.files["p_image"][0] : null;
      const updateData = {
        title,
        description,
      };
      if (imageUrls) {
        updateData.p_image = imageUrls;
      }
      const news = await News.findById(NewsID);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      Object.assign(news, updateData);
      await news.save();
      res.json({ message: "News updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating Blog" });
    }
  };

  exports.viewNews = async (req, res) => {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname,"../uploads/news",filename))
    console.log(path.join(__dirname,"../uploads/news",filename,'path.join(__dirname,"../uploads/blog",filename'))
  };

  exports.GetbyIDNews = async (req, res) => {
    // try {
      const NewsID = req.params.id;
      const news = await News.findById(NewsID);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json({ message: "News Get successfully" ,result:news});
    // } catch (error) {
    //   res.status(500).json({ message: "Error get News" });
    // }
  };


  exports.deleteNews = async (req, res) => {
    try {
      const { id } = req.params;
      await News.findByIdAndDelete(id);
      res.json({ message: "News deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting News" });
    }
  };
