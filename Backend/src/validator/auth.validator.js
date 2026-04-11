import {body, validationResult} from "express-validator"

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}




export const validateRegisterUser = [
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("contact").notEmpty().matches(/^\d{10}$/).withMessage("Contact number must be a valid 10-digit number"),
    body("fullname").notEmpty().isLength({min:3}).withMessage("Full name must be at least 3 characters long"),

    validateRequest
]