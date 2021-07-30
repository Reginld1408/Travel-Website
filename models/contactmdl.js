// Require the mongoose module
var mongoose = require("mongoose");
// Set up a mongoose connection
// var mongoDBurl = "mongodb://localhost:27017/contacts";

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
      // validate: {
      //   validator: function (v) {
      //     return v.length > 10;
      //   },
      //   message: (props) => `${props.value} is body is too short.`,
      // },
    },
    phone: {
      type: String,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid URL slug.`,
      // },
      // required: "Please enter the post url slug",
     },
    comment: {
      type: String,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid URL slug.`,
      // },
      // required: "Please enter the post url slug",
    },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // more fields defined below
});
postSchema.plugin(uniqueValidator);
module.exports.details=mongoose.model("details",postSchema)