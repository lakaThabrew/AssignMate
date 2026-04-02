const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        resetPasswordTokenHash: {
            type: String,
            default: null,
        },
        resetPasswordTokenExpiresAt: {
            type: Date,
            default: null,
        },
        role: {
            type: String,
            enum: ["student", "lecturer"],
            default: "student",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
