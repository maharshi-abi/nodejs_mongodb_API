module.exports = app => {
  const posts = require("../controllers/postsController");
  const authMiddleware = require('../middleware/auth');
  var router = require("express").Router();

  // For validation
  const validation = require('../validation/postValidation')
  const {
    validate
  } = require('../middleware/validationMiddleware')
  // For validation  

  // Create a new post
  router.post("/", authMiddleware, validate(validation.AddPost), posts.create);

  // Retrieve all posts
  router.get("/", authMiddleware, posts.findAll);

  app.use("/api/post", router);
};