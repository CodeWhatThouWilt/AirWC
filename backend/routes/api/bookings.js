const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image, Review, Booking } = require('../../db/models');

const router = express.Router();

// const bookingValidators

router.post('/', asyncHandler, async((req, res) => {
    const { userId } = req;
    const { spotId, startDate, endDate} = req.body;

    const booking = await Booking.create({
        userId,
        spotId,
        startDate,
        endDate
    });

    const booked = await Spot.findOne({
        where: {
            id: booking.spotId
        },
        include: [
            { model: Image },
            { model: Review },
            { model: Booking }
        ]
    });

    return res.json();

}))


module.exports = router;