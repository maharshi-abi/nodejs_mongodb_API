const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// add connected table modal
db.users = require("./user.model.js")(mongoose);

module.exports = db;