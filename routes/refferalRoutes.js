const express = require('express');
const router = express.Router();
const { verifyReferral } = require('../controllers/referralController');

router.post('/verify', verifyReferral);

module.exports = router;