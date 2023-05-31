const { StatusCodes } = require("http-status-codes");

const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const User = require("../models/user");

router.get("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    // const result = await schema.validateAsync({ name, job });
    const user = await User.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      _id: id,
    });

    // Employee does not exist
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
      });
    }

    const updatedUser = await User.updateOne(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
      { upsert: true }
    );
    res.status(StatusCodes.OK).json({ message: "User Updated", updatedUser });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
});

module.exports = router;
