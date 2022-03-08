const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: {
            model: Image
        }
    });
    return res.json(spots);
}));

router.post('/', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const { address, city, state, country, name, price } = req.body;

    const spot = await Spot.create({
        userId: user.id,
        address,
        city,
        state,
        country,
        name,
        price
    });

    return res.json(spot);
}))


module.exports = router;