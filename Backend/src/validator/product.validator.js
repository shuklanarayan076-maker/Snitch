import {body, validationResult} from "express-validator"

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

}

export const createProductValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").notEmpty().isNumeric().withMessage("Price is required"),
    body("priceCurrency").notEmpty().withMessage("Currency is required"),
    validateRequest
]
