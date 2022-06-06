module.exports = app => {
  const users = require("../controllers/usersController.js");
  const authMiddleware = require('../middleware/auth');
  var router = require("express").Router();

  // For validation
  const validation = require('../validation/userValidation')
  const {
    validate
  } = require('../middleware/validationMiddleware')
  // For validation  

  // Create a new user
  router.post("/login", validate(validation.LoginUser), users.login);

  // Create a new user
  router.post("/", validate(validation.AddUser), users.create);

  // Retrieve all users
  router.get("/", authMiddleware, users.findAll);

  // Retrieve a single user with id
  router.get("/:id", authMiddleware, users.findOne);

  // Delete a user with id
  router.delete("/:id", authMiddleware, users.delete);

  // Create a new user
  router.delete("/", authMiddleware, users.deleteAll);

  app.use("/api/user", router);
};