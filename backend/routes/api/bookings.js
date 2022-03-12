const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();


const bookingValidations = [
    check('startDate', 'endDate')
        .custom(async (value, { req }) => {
            // console.log('######################', value, valueTwo)
            const checkRange = await Booking.findAll({
                where: {
                    [Op.or]: [
                        {startDate: {[Op.between]: [req.body.startDate, req.body.endDate]}},
                        {endDate: {[Op.between]: [req.body.startDate, req.body.endDate]}}
                    ]
                }
            });

            if (checkRange.length) return Promise.reject("TIME OVERLAP")
        }),
    handleValidationErrors
]

router.post('/', requireAuth, bookingValidations, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { spotId, startDate, endDate } = req.body;

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

    return res.json(booked);

}))


module.exports = router;