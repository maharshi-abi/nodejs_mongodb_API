const Joi = require('joi');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true },
      password: String,
      status: Boolean,
      token: { type: String },
      posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model("User", schema);

  return Users;
};