const { StatusCodes } = require("http-status-codes");

// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const express = require("express");

const User = require('../models/user')

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please Provide Required Information",
            });
        }

        const hash_password = await bcrypt.hash(password, 10);

        const userData = {
            firstName,
            lastName,
            username,
            email,
            password: hash_password,
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "User already registered",
            });
        } else {
            User.create(userData).then((data, err) => {
                if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
                else
                    res
                        .status(StatusCodes.CREATED)
                        .json({ message: "User created Successfully" });
            });
        }

    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error while adding answer",
        });
    }
})

module.exports = router;