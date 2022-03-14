const express = require('express');
const asyncHandler = require('express-async-handler');

const { check, oneOf } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Image, Review, Booking } = require('../../db/models');

const router = express.Router();



const validateSpot = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Required')
        .isLength({ max: 35 })
        .withMessage('35 character limit'),
    check('price')
        .isInt({ max: 500 })
        .withMessage('$500 limit')
        .exists({ checkFalsy: true })
        .withMessage('Required'),
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Required'),
    check('city')
        .isLength({ max: 50 })
        .withMessage('50 character limit')
        .exists({ checkFalsy: true })
        .withMessage('Required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('Required')
        .isString()
        .withMessage('Provide a valid state'),
    check('country')
        .isLength({ max: 56 })
        .withMessage('56 character limit')
        .isLength({ min: 4 })
        .withMessage('4 character min'),
    check('shortDescription')
        .exists({ checkFalsy: true })
        .withMessage('Require')
        .isLength({ max: 35 })
        .withMessage('35 character limit'),
    check('longDescription')
        .exists({ checkFalsy: true })
        .withMessage('Required')
        .isLength({ max: 1500 })
        .withMessage('1500 character limit'),
    oneOf([
        check('selfCheckIn')
            .equals('false'),
        check('selfCheckIn')
            .equals('true')
    ], 'True or false'),
    handleValidationErrors
];

const validateImages = [
    check('imageInputs.*')
    .custom(async images => {
        const urlCheck = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i
            if (!images.image.match(urlCheck)) return await Promise.reject('Invalid image address')
        }),
    handleValidationErrors
]


router.post('/validate-forms', validateSpot, asyncHandler(async (req, res) => {
    res.json({});
}))


router.get('/', asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: Image }
        ]
    });
    return res.json(spots);
}));

router.post('/', requireAuth, validateSpot, validateImages, asyncHandler(async (req, res) => {
    const { user } = req;
    const { address, city, state, country, name, price, shortDescription, longDescription, selfCheckIn, imageInputs } = req.body;

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
            url: image.image
        })
    }



    const newSpot = await Spot.findOne({
        where: {
            id: spot.id
        },
        include: [
            { model: Image }
        ]
    });

    return res.json(newSpot);
}))

router.put('/', requireAuth, validateSpot, asyncHandler(async (req, res) => {
    const { user } = req;
    const { spotId, address, city, state, country, name, price, shortDescription, longDescription, selfCheckIn } = req.body;
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
                { model: Image }
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


router.put('/:spotId/images', requireAuth, validateImages, asyncHandler(async (req, res) => {
    
    const { spotId, imageInputs } = req.body;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId, { include: { model: Image } });

    if (userId === spot.userId) {
        const spotImagesArr = spot.Images.map(image => image.url)
        const incomingImagesArr = imageInputs.map(image => image.image)
        const toBeCreated = incomingImagesArr.filter(image => !spotImagesArr.includes(image))
        const toBeDestroyed = spotImagesArr.filter(image => !incomingImagesArr.includes(image))

        for await (const image of toBeDestroyed) {
            const doomedImage = await Image.findOne({
                where: {
                    url: image
                }
            })
            await doomedImage.destroy();

        }

        for await (const image of toBeCreated) {
            const newImage = await Image.create({
                spotId: spot.id,
                url: image
            });
        }
        const updatedSpot = await Spot.findByPk(spotId, { include: { model: Image } });
        res.json(updatedSpot);
    }

}))


module.exports = router;