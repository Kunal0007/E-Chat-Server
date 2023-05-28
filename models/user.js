const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    bio: {
        type: String
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    posts: [],
}, { timestamps: true });

UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

UserSchema.method({
    async authenticate(password) {
       return bcrypt.compare(password, this.password);
    },
});

module.exports = mongoose.model("User", UserSchema);