const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review } = require('../../db/models');


const router = express.Router();


// router.get('/', asyncHandler(async (req, res) => {
//     const { spotId } = req.body;
//     console.log('###################', spotReviews)
//     const spotReviews = await Review.findAll({
//         where: {
//             spotId
//         },
//     })
//     return res.json(spotReviews)
// }))


module.exports = router;