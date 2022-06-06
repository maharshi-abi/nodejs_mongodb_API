module.exports = app => {
  const users = require("../controllers/usersController.js");
  var router = require("express").Router();
  
  // For validation
  const validation = require('../validation/userValidation')
  const {
    validate
  } = require('../middleware/validationMiddleware')
  // For validation  

  // Create a new user
  router.post("/", validate(validation.AddUser), users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  // Create a new user
  router.delete("/", users.deleteAll);

  app.use("/api/user", router);
};