const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Spot, Image, Review, Booking, Favorite } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();


router.get('/', requireAuth, asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const favorites = await Favorite.findAll({
        where: {
            userId
        }
    });

    return res.json(favorites);
}));

router.post('/', requireAuth, asyncHandler(async(req, res) => {
    const userId = req.user.id;
    const { spotId } = req.body;

    const favorite = await Favorite.create({
        spotId,
        userId
    });

    return res.json(favorite);
}));

router.delete('/:favId(\\d+)', requireAuth, asyncHandler(async(req, res) => {
    const { favId } = req.params;

    const doomedFav = await Favorite.findByPk(favId);
    await doomedFav.destroy();

    return res.json(doomedFav);
}));


module.exports = router;