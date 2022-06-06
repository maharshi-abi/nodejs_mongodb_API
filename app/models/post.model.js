const { string, boolean } = require('joi');
const Joi = require('joi');

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      slug: String,
      subtitle: String,
      description: String,
      is_publish: Boolean,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Posts = mongoose.model("Post", schema);

  return Posts;
};