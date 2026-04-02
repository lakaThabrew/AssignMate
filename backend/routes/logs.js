const express = require('express');
const router = express.Router();
const { frontendLogger } = require('../utils/logger');

router.post('/', (req, res) => {
    const { level, message, meta } = req.body;

    if (level === 'error') {
        frontendLogger.error(message, meta);
    } else if (level === 'warn') {
        frontendLogger.warn(message, meta);
    } else {
        frontendLogger.info(message, meta);
    }

    res.status(204).send();
});

module.exports = router;
