
const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] Consulta a: ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = logger;