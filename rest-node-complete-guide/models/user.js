const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "I am new!"
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
