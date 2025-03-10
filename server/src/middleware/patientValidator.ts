import Joi from "joi"
import { Request, Response, NextFunction } from 'express';

const patientValidationMessages = {
    fullName: {
        required: 'Full name is required'
    },
    email: {
        invalidFormat: 'Invalid email format',
        required: 'Email is required'
    },
    phoneNumber: {
        patternMismatch: 'Phone number must be between 10 and 15 digits and may include a leading +',
        required: 'Phone number is required'
    },
}

const nameValidation = () => Joi.string()
    .min(1)
    .required()
    .messages({
        'any.required': patientValidationMessages.fullName.required
    })

const emailValidation = () => Joi.string()
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) 
    .required()
    .messages({
        'string.email': patientValidationMessages.email.invalidFormat,
        'string.pattern.base': 'Only Gmail addresses are allowed',
        'any.required': patientValidationMessages.email.required
    });


const phoneNumberValidation = () => Joi.string()
    .pattern(new RegExp(/^\+?[0-9]{9,15}$/))
    .required()
    .messages({
        'string.pattern.base': patientValidationMessages.phoneNumber.patternMismatch,
        'any.required': patientValidationMessages.phoneNumber.required
    });

export const patientSchema = Joi.object({
    fullName: nameValidation(),
    email: emailValidation(),
    phoneNumber: phoneNumberValidation(),
});

export const validatePatient = (req: Request, res: Response, next: NextFunction): void => {

    const { error } = patientSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.error('Validation error:', error.details.map((d) => d.message));
        res.status(400).json({ errors: error.details.map(detail => detail.message) });
        return;
    }

    next();
};