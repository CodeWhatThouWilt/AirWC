const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a first name'),
    check('firstName')
        .isLength({ max: 50 })
        .withMessage('First name cannot be over 50 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Please provide a last name'),
    check('lastName')
        .isLength({ max: 50 })
        .withMessage('Last name cannot be over 50 characters'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
        const { email, password, firstName, lastName } = req.body;
        const user = await User.signup({ email, firstName, lastName, password });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);

const validateEmail = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email'),
    handleValidationErrors
]

// Check if user email exists
router.post('/check', validateEmail, asyncHandler(async (req, res) => {
    const { email } = req.body;
    let isUser = await User.findOne({
        where: {
            email
        }
    });
    isUser ? isUser = true : isUser = false;
    return res.json({ isUser })
}));


module.exports = router;