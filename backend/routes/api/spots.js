const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const spots = await Spot.findAll();
    return res.json(spots);
}))


module.exports = router;