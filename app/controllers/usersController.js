const db = require("../models");
const Users = db.users;
const bcrypt = require('bcryptjs');
const config = require('../config');
const jwt = require('jsonwebtoken')

var hashedPassword;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, config.JWTSecret, { expiresIn: "2h", });
      // save user token
      user.token = token;
      res.status(200).json({ message: "Login Succcessfully", data: user, status: 'success' })
    } else {
      res.status(200).json({ message: "Invalid credentials! Please try again!.", data: [], status: 'error' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message, data: user, status: 'error' })
  }
};

// signup user
exports.create = async (req, res) => {
  try {
    // check already exist user
    const user = await Users.findOne({ "email": req.body.email });
    if (user && user.email) {
      res.status(400).json({ message: "Email already in use.", data: [], status: 'error' })
    }
    // check already exist user

    // Create a Users with encpt password
    bcrypt.hash(req.body.password, 10)
      .then(hashedpassword => {
        const userData = new Users({
          name: req.body.name,
          email: req.body.email,
          status: req.body.status ? req.body.status : false,
          password: hashedpassword
        })

        userData.save()
          .then(user => {
            // Create token
            let email = req.body.email;
            const token = jwt.sign({ user_id: user._id, email }, config.JWTSecret, { expiresIn: "2h" });
            userData.token = token;
            // save user token            

            res.status(200).json({ message: "Sinup Succcessfully", data: user, status: 'success' })
          }).catch(err => {
            res.status(400).json({ message: err.message, data: [], status: 'error' })
          })
      });
    // Create a Users with encpt password
  } catch (error) {
    res.status(400).json({ message: error.message, data: user, status: 'error' })
  }
};
// signup user

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  try {
    const name = req.query.name;
    const email = req.query.email;
    let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    Users.find(condition)
      .then(user => {
        res.status(200).json({ message: "User list", data: user, status: 'success' })
      })
      .catch(err => {
        res.status(400).json({ message: err.message, data: [], status: 'error' })
      });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [], status: 'error' })
  }
};
// Retrieve all Users from the database.

// Find a single Users with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userDetail = await Users.findById(id);
    if (!userDetail && userDetail.id) {
      res.status(404).send({ message: "Not found User with id " + id, data: [], status: 'error' });
    } else {
      res.status(200).json({ message: "User details", data: userDetail, status: 'success' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, data: [], status: 'error' })
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  try {
    const id = req.params.id;
    Users.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({ message: `Cannot delete User with id=${id}. Maybe Users was not found!`, data: [], status: 'error' });
        } else {
          res.status(200).json({ message: "User was deleted successfully!", data: [], status: 'success' });
        }
      })
      .catch(err => {
        res.status(404).send({ message: err.message, data: [], status: 'error' });
      });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [], status: 'error' })
  }
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  try {
    Users.deleteMany({})
      .then(data => {
        res.status(200).json({ message: `${data.deletedCount} Users were deleted successfully!`, data: [], status: 'success' });
      })
      .catch(err => {
        res.status(400).json({ message: err.message, data: [], status: 'error' });
      });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [], status: 'error' })
  }
};
