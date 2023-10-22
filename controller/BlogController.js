const Blog = require("../model/Blog");
const path = require('path')
exports.createBlog = async (req, res) => {
  try {
    const { title, description} = req.body;
    const imageUrls = req.files["p_image"] ? req.files["p_image"][0] : null;
    const blog = new Blog({
      title,
      description,
      p_image: imageUrls,
    });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating Blog" });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    if (blog && blog.length > 0) {
      res.status(200).json({ MSG: "All Blogs Found", data: blog });
    } else {
      res.status(404).json({ MSG: "No Blogs Found" });
    }
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    res.status(500).json({ MSG: "Error fetching Blogs" });
  }
};

  exports.updateBlog = async (req, res) => {
    try {
      const blogID = req.params.id;
      const { title, description } = req.body;
      const imageUrls = req.files["p_image"] ? req.files["p_image"][0] : null;
      const updateData = {
        title,
        description,
      };
      if (imageUrls) {
        updateData.p_image = imageUrls;
      }
      const blog = await Blog.findById(blogID);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      Object.assign(blog, updateData);
      await blog.save();
      res.json({ message: "Blog updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating Blog" });
    }
  };

  exports.GetByIDBlog = async (req, res) => {
    try {
      const blogID = req.params.id;
      const blog = await Blog.findById(blogID);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog Get successfully" ,result:blog});
    } catch (error) {
      res.status(500).json({ message: "Error get Blog" });
    }
  };

  exports.viewBlog = async (req, res) => {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname,"../uploads/blog",filename))
    console.log(path.join(__dirname,"../uploads/blog",filename,'path.join(__dirname,"../uploads/blog",filename'))
  };
  


  exports.deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      await Blog.findByIdAndDelete(id);
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Blog" });
    }
  };
