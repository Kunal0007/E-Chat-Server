const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },

  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "User",
  },
  tag: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
