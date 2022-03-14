const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .map((error) => `${error.msg }`);
        const errorsTitle = validationErrors
            .array()
            .map((error) => `${ error.param }`);

        const err = Error('Bad request.');
        err.errors = errors;
        err.inputErrors = errorsTitle
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
};

module.exports = {
    handleValidationErrors
};