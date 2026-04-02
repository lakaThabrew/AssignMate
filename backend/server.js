require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/evaluate", require("./routes/evaluate"));
app.use("/api/history", require("./routes/history"));
app.use("/api/rubrics", require("./routes/rubrics"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/logs", require("./routes/logs"));
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.send("AssignMate Pro API is running...");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assignmate";

const logger = require("./utils/logger");

mongoose.connect(MONGO_URI).then(() => {
    logger.info("Connected to MongoDB");
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}).catch(err => {
    logger.error("MongoDB connection error:", err);
});
