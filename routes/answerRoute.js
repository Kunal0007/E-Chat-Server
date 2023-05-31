const express = require("express");
const Answer = require("../models/answer");
const router = express.Router();
const Question = require("../models/question");
const User = require("../models/user");

// for adding question
router.post("/addans/:userId/:queId", async (req, res) => {
  try {
    const questionId = req.params.queId;
    const { content } = req.body;
    const userId = req.params.userId;

    // Create a new answer
    const answer = new Answer({
      content: content,
      user: userId,
      question: questionId,
    });

    // Save the answer
    await answer.save();

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );

    // Add the answer to the user's answers array
    await User.findByIdAndUpdate(
      userId,
      { $push: { answers: answer._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "answer added successfully", success: true, answer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// for deleting answer
router.delete("/delans/:answerId", async (req, res) => {
  try {
    const { answerId } = req.params;

    // Find the answer and remove it
    await Answer.findByIdAndRemove(answerId);

    // Remove the answer from the question's answers array
    await Question.findOneAndUpdate(
      { answers: answerId },
      { $pull: { answers: answerId } }
    );

    // Remove the answer from the user's answers array
    await User.findOneAndUpdate(
      { answers: answerId },
      { $pull: { answers: answerId } }
    );

    res
      .status(200)
      .json({ success: true, message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put("/upans/:answerId", async (req, res) => {
  try {
    const { answerId } = req.params;
    const { content } = req.body;

    // Find the answer and update its content
    const answer = await Answer.findByIdAndUpdate(
      answerId,
      { content },
      { new: true }
    );

    res.status(200).json({ success: true, answer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// for updating answer
router.get("/", (req, res) => {
  res.send("HELLo Answer");
});

module.exports = router;
