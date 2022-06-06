module.exports = app => {
  const users = require("../controllers/usersController.js");
  var router = require("express").Router();

  // For validation
  const validation = require('../validation/userValidation')
  const {
    validate
  } = require('../middleware/validationMiddleware')
  // For validation  

  // Retrieve all users
  router.get("/", users.findAll);

  // Create a new user
  router.post("/", validate(validation.AddUser), users.create);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Delete a user with id
  router.delete("/:id", users.delete);

  // Create a new user
  router.delete("/", users.deleteAll);

  app.use("/api/user", router);
};