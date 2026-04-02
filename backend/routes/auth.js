const express = require("express");
const crypto = require("crypto");
const User = require("../models/User");
const logger = require("../utils/logger");

const router = express.Router();

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function inferRole(email) {
    const lower = normalizeEmail(email);
    return lower.includes("lec") || lower.includes("staff") ? "lecturer" : "student";
}

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function createResetToken() {
    return crypto.randomBytes(24).toString("hex");
}

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !String(name).trim()) {
            return res.status(400).json({ error: "Name is required." });
        }
        if (!email || !normalizeEmail(email)) {
            return res.status(400).json({ error: "Email is required." });
        }
        if (!password || String(password).length < 4) {
            return res.status(400).json({ error: "Password must be at least 4 characters." });
        }

        const normalizedEmail = normalizeEmail(email);
        const existing = await User.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).json({ error: "An account with this email already exists." });
        }

        const user = await User.create({
            name: String(name).trim(),
            email: normalizedEmail,
            passwordHash: hashPassword(String(password)),
            role: inferRole(normalizedEmail),
        });

        return res.status(201).json({
            message: "Account created successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        logger.error("Register error:", err);
        return res.status(500).json({ error: "Failed to create account." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedEmail) {
            return res.status(400).json({ error: "Email is required." });
        }
        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        if (user.passwordHash !== hashPassword(String(password))) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        return res.json({
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        logger.error("Login error:", err);
        return res.status(500).json({ error: "Failed to login." });
    }
});

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body || {};
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedEmail) {
            return res.status(400).json({ error: "Email is required." });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.json({
                message: "If an account exists for this email, a reset token has been generated.",
            });
        }

        const resetToken = createResetToken();
        user.resetPasswordTokenHash = hashPassword(resetToken);
        user.resetPasswordTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        return res.json({
            message: "Reset token generated. It expires in 15 minutes.",
            resetToken,
            expiresInMinutes: 15,
        });
    } catch (err) {
        logger.error("Forgot password error:", err);
        return res.status(500).json({ error: "Failed to process forgot password request." });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, token, newPassword } = req.body || {};
        const normalizedEmail = normalizeEmail(email);

        if (!normalizedEmail) {
            return res.status(400).json({ error: "Email is required." });
        }
        if (!token || !String(token).trim()) {
            return res.status(400).json({ error: "Reset token is required." });
        }
        if (!newPassword || String(newPassword).length < 4) {
            return res.status(400).json({ error: "New password must be at least 4 characters." });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ error: "Invalid reset request." });
        }

        const now = new Date();
        const hashedToken = hashPassword(String(token).trim());
        const isTokenValid =
            user.resetPasswordTokenHash &&
            user.resetPasswordTokenExpiresAt &&
            user.resetPasswordTokenHash === hashedToken &&
            user.resetPasswordTokenExpiresAt > now;

        if (!isTokenValid) {
            return res.status(400).json({ error: "Reset token is invalid or expired." });
        }

        user.passwordHash = hashPassword(String(newPassword));
        user.resetPasswordTokenHash = null;
        user.resetPasswordTokenExpiresAt = null;
        await user.save();

        return res.json({ message: "Password has been reset successfully." });
    } catch (err) {
        logger.error("Reset password error:", err);
        return res.status(500).json({ error: "Failed to reset password." });
    }
});

module.exports = router;
