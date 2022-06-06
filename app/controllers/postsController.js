const db = require("../models");
const Posts = db.posts;
const Users = db.users;
const config = require('../config');
const jwt = require('jsonwebtoken')

var hashedPassword;

// create post
exports.create = async (req, res) => {
  try {
    // Create a post
    const userData = jwt.verify(req.body.token, config.JWTSecret);

    const postData = new Posts({
      slug: req.body.title,
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      is_publish: req.body.is_publish ? req.body.is_publish : false,
      user: userData.user_id
    })

    postData.save()
      .then(post => {
        // const userPosts = Users.findById({ _id: userData.user_id });
        // userPosts.posts.push(post);
        // userPosts.save();

        res.status(200).json({ message: "Post created Succcessfully", data: post, status: 'success' })
      }).catch(err => {
        res.status(400).json({ message: err.message, data: [], status: 'error' })
      })
    // Create a posts
  } catch (error) {
    res.status(400).json({ message: error.message, data: [], status: 'error' })
  }
};
// create post

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  try {
    const title = req.query.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

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