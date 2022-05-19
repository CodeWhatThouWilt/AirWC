const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Spot, Image, Review, Booking } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();


router.get('/favorites', requireAuth, asyncHandler(async(req, res) => {

}))


module.exports = router;