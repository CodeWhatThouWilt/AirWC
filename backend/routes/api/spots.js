const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image, Review, Booking } = require('../../db/models');

const router = express.Router();



const validateSpot = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 35 })
        .withMessage('Provide a valid name'),
    check('price')
        .exists({ checkFalsy: true })
        .isInt({ min: 1 , max: 500})
        .withMessage('Prove a valid price'),
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Provide a valid address'),
    check('city')
        .isLength({ min: 1, max: 50 })
        .withMessage('Provide a valid city'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Provide a valid state'),
    check('country')
        .isLength({ min: 50, max: 56})
        .withMessage('Enter a valid country'),
    check('shortDescription')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 35})
        .withMessage(''),
    check('longDescription')
        .exists({ checkFalsy: true })
        .isLength({ min: 1, max: 1500 })
        .withMessage('Password must be 6 characters or more.'),
    check('selfCheckIn')
        .equals('false' || 'true')
        .withMessage('True or false'),
    check('imageInputs')
    .custom(images => {
        const errors = [];
        const urlCheck = /https ?: \/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        images.forEach(element => {
            if (!element.match(url)) errors.push('url error')
        });
        if (errors.length) return Promise.reject('Enter a valid image address')
    })
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage('Enter a valid image'),
    handleValidationErrors
];


router.post('/', asyncHandler(async (req, res) => {
    res.json();
}))


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

router.post('/', requireAuth, validateSpot, asyncHandler(async (req, res) => {
    const { user } = req;
    const { address, city, state, country, name, price, shortDescription, longDescription, selfCheckIn, imageInputs} = req.body;

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


    for await (const image of imageInputs) {
        await Image.create({
            spotId: spot.id,
            url: image
        })
    }



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
    const { spotId, address, city, state, country, name, price, shortDescription, longDescription, selfCheckIn } = req.body.spot;
    const spot = await Spot.findByPk(spotId);

    if (spot.userId === user.id) {
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

        const editedSpot = await Spot.findOne({
            where: {
                id: spot.id
            },
            include: [
                { model: Image },
                { model: Review },
                { model: Booking }
            ]
        });

        return res.json(editedSpot);
    }

    // const err = new Error('Unauthorized');
    // err.title = 'Unauthorized';
    // err.errors = ['Unauthorized'];
    // err.status = 401;
    // return next(err);
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