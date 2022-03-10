const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image, Review, Booking } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {model: Image},
            {model: Review},
            {model: Booking}
        ]
    });
    return res.json(spots);
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { user } = req;
    const { address, city, state, country, name, price, shortDescription, longDescription, selfCheckIn } = req.body;

    const spot = await Spot.create({
        userId: user.id,
        address,
        city,
        state,
        country,
        name,
        price,
        shortDescription, 
        longDescription, 
        selfCheckIn
    });

    const newSpot = await Spot.findOne({
        where: {
            id: spot.id
        },
        include: [
            { model: Image },
            { model: Review },
            { model: Booking }
        ]
    });

    return res.json(newSpot);
}))

router.put('/', requireAuth, asyncHandler(async (req, res) => {
    const { user } = req;
    const { spotId, address, city, state, country, name, price, shortDescription, longDescription, selfCheckIn } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (spot.userId === user.is) {
        await spot.update({
            address,
            city,
            state,
            country,
            name,
            price,
            shortDescription, 
            longDescription, 
            selfCheckIn
        });
        return res.json(spotId);
    }

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}))

router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { user } = req;
    const { spotId } = req.body;

    const spot = await Spot.findOne({
        where: {
            id: spotId,
            userId: user.id
        }
    });

    if (spot) {
        await spot.destroy();
        return res.json(spotId);
    }

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}))


module.exports = router;