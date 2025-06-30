const express = require('express');
const { getJoyas, getJoyasFiltradas } = require('../controllers/joyas.controller');
const logger = require('../middleware/logger');

const router = express.Router();

router.use(logger);
router.get('/joyas', getJoyas);
router.get('/joyas/filtros', getJoyasFiltradas);

module.exports = router;
