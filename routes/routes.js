const express = require("express");
const router = express.Router();

const signupRouter = require("./signup");
const loginRouter = require("./login");
const userRouter = require("./user");
const questionRouter = require("./questionRoute");
const answerRoute = require("./answerRoute");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/questionRoute", questionRouter);
router.use("/answerRoute", answerRoute);

module.exports = router;
