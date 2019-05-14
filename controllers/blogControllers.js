const Blogs = require("../models/blogs");
const fs = require("fs");

exports.createBlog = async (req, res) => {
  const { title, description, content } = req.body;

  let dir = "assets/uploads/blogThumbnail/";
  let filename = Date.now() + "_" + req.files.file.name;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await req.files.file.mv(dir + filename);

  let fileWebPath = "/assets/uploads/blogThumbnail/" + filename;


  Blogs.create({
    title: title,
    description: description,
    content: content,
    userId: req.user.id,
    thumbnail: fileWebPath
  })
    .then(blog =>
      res.status(200).json({
        success: true,
        blog: blog,
        message: "Blog Created Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.deleteBlog = (req, res) => {
  const { blogId } = req.query;
  Blogs.updateOne(
    { _id: blogId, userId: req.user.id },
    { deletedAt: Date.now() }
  )
    .then(blog =>
      res
        .status(200)
        .json({ success: true, message: "Blog Deleted Successfully" })
    )
    .catch(err =>
      res.status(401).json({ success: false, message: "Something went wrong" })
    );
};

exports.updateBlog = async (req, res) => {
  const { title, description, content, blogId } = req.body;

  let fileWebPath;
  if (req.files === null) {
    fileWebPath = thumbnail;
    console.log("No files uploaded");
  } else {
    let dir = "assets/uploads/blogThumbnail/";
    let filename = req.user.id + "_" + req.files.file.name;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    await req.files.file.mv(dir + filename);

    fileWebPath = "/assets/uploads/blogThumbnail/" + filename;
  }

  Blogs.updateOne(
    { _id: blogId, userId: req.user.id },
    {
      title: title,
      description: description,
      content: content,
      thumbnail: fileWebPath
    }
  )
    .then(blog =>
      res.status(200).json({
        success: true,
        blog: blog,
        message: "Blog Updated Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchAllBlogs = (req, res) => {
  Blogs.find({ deletedAt: null })
    .then(blogs =>
      res.status(200).json({
        success: true,
        blogs: blogs,
        message: "Blogs Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
/**
 * Fetches the logged in current user's blogs
 */
exports.fetchBlogsByUser = (req, res) => {
  Blogs.find({ deletedAt: null, userId: req.user.id })
    .then(blogs =>
      res.status(200).json({
        success: true,
        blogs: blogs,
        message: "Blogs Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};

exports.fetchSingleBlogDetails = (req, res) => {
  const { blogId } = req.body;
  Blogs.find({ _id: blogId })
    .then(blog =>
      res.status(200).json({
        success: true,
        blog: blog,
        message: "Blogs Fetched Successfully"
      })
    )
    .catch(err =>
      res.status(400).json({ success: false, message: "Something went wrong" })
    );
};
