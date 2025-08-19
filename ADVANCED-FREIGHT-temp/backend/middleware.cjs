// Simple request logger middleware
module.exports.requestLogger = function (req, res, next) {
    const ts = new Date().toISOString();
    console.log(`[${ts}] ${req.method} ${req.originalUrl} from ${req.ip}`);
    // log some headers useful for debugging
    console.log(`User-Agent: ${req.get('User-Agent')}`);
    next();
};

// Simple error logger
module.exports.errorHandler = function (err, req, res, next) {
    console.error('Unhandled error in request:', err);
    res.status(500).json({ ok: false, error: 'Internal server error' });
};
