const express = require('express');

const authRoutes = require('./authRoutes');
const librosRoutes = require('./librosRoutes');
const router = express.Router();

router.use('/', librosRoutes);
router.use('/auth', authRoutes);

module.exports = router;
