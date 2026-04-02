import api from '../services/api';

const IS_DEV = import.meta.env.MODE === 'development';

const sendToStore = async (level, message, meta = {}) => {
    try {
        await api.post('/logs', { level, message, meta });
    } catch (e) {
        // Silently fail to avoid console clutter if backend is down
    }
};

const logger = {
    info: (message, ...args) => {
        if (IS_DEV) {
            console.log(`%cℹ️ [INFO] %c${message}`, 'color: #007bff; font-weight: bold;', 'color: inherit;', ...args);
        }
        sendToStore('info', message, { args });
    },
    error: (msg, ...args) => {
        console.error(`%c🛑 [ERROR] %c${msg}`, 'color: #dc3545; font-weight: bold;', 'color: inherit;', ...args);
        sendToStore('error', msg, { args });
    },
    warn: (msg, ...args) => {
        if (IS_DEV) {
            console.warn(`%c⚠️ [WARNING] %c${msg}`, 'color: #ffc107; font-weight: bold; color: #000;', 'color: inherit;', ...args);
        }
        sendToStore('warn', msg, { args });
    },
    debug: (msg, ...args) => {
        if (IS_DEV) {
            console.debug(`%cℹ️ [DEBUG] %c${msg}`, 'color: #6c757d; font-weight: bold;', 'color: inherit;', ...args);
        }
    }
};

export default logger;
