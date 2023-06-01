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

    const answer = new Answer({
      content: content,
      user: userId,
      question: questionId,
    });

    await answer.save();

    await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );

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

//for updating ans
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

//for keeping posting user who likes particular ans
// Route to add a like to an answer
router.post("/:userId/:answerId/like", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    // Check if the user has already liked the answer
    if (answer.usersWhoLike.includes(req.params.userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this answer" });
    }

    answer.usersWhoLike.push(req.params.userId);
    answer.save();

    res.json({ message: "Answer liked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get the number of likes and users who like an answer
router.get("/:answerId/like", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId).populate(
      "usersWhoLike",
      "firstName lastName"
    ); // Populate user fields for usersWhoLike

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const likesCount = answer.usersWhoLike.length;

    res.json({
      likesCount,
      usersWhoLike: answer.usersWhoLike,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// trial
router.get("/", (req, res) => {
  res.send("HELLo Answer");
});

module.exports = router;
