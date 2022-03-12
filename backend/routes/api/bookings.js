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
                        { startDate: { [Op.between]: [req.body.startDate, req.body.endDate] } },
                        { endDate: { [Op.between]: [req.body.startDate, req.body.endDate] } }
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

    const userBooking = await Booking.create({
        userId,
        spotId,
        startDate,
        endDate
    });

    if (userBooking) {
        spotBooking = await Booking.findByPk(userBooking.id, {
            attributes: { exclude: ['userId'] }
        });
    }

    return res.json({ userBooking, spotBooking });

}));



router.get('/', restoreUser, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    let userBookings = null;

    if (userId) {
        userBookings = await Booking.findAll({
            where: {
                userId
            }
        })
    }

    spotBookings = await Booking.findAll({
        attributes: { exclude: ['userId'] }
    });

    return res.json({ spotBookings, userBookings });
}));


module.exports = router;