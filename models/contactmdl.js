// Require the mongoose module
var mongoose = require("mongoose");
// Set up a mongoose connection

const uniqueValidator = require("mongoose-unique-validator")
const postSchema = new mongoose.Schema({
    name: {
      type: String,
      required: "Please enter the post title.",
      trim: true,
      unique: "The title must be unique.",
    },
    email: {
      type: String,
      required: "Please write your post body.",
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
     },
    comment: {
      type: String,
      trim: true,
    },
    // more fields defined below
});
postSchema.plugin(uniqueValidator);
module.exports.details=mongoose.model("details",postSchema)
