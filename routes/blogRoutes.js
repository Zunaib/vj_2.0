module.exports = app => {
    const blogControllers = require("../controllers/blogControllers");

    app.route("/api/createBlog").post(blogControllers.createBlog);
    app.route("/api/fetchAllBlogs").get(blogControllers.fetchAllBlogs);
    app.route("/api/fetchBlogsByUser").get(blogControllers.fetchBlogsByUser);
    app.route("/api/fetchSingleBlogDetails").post(blogControllers.fetchSingleBlogDetails);
    app.route("/api/updateBlog").put(blogControllers.updateBlog);
    app.route("/api/deleteBlog").delete(blogControllers.deleteBlog);

};
