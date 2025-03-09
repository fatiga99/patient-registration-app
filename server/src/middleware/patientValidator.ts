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
    .required()
    .messages({
        'string.email': patientValidationMessages.email.invalidFormat,
        'any.required': patientValidationMessages.email.required
    });

const phoneNumberValidation = () => Joi.string()
    .pattern(new RegExp(/^\+?[0-9]{9,15}$/))
    .required()
    .messages({
        'string.pattern.base': patientValidationMessages.phoneNumber.patternMismatch,
        'any.required': patientValidationMessages.phoneNumber.required
    });

const documentPhotoValidation = () => Joi.alternatives()
    .try(
        Joi.string().uri().messages({
            'string.uri': 'Document photo must be a valid URL'
        }),
        Joi.binary().messages({
            'binary.base': 'Document photo must be a valid binary file'
        })
    );

export const patientSchema = Joi.object({
    name: nameValidation(),
    email: emailValidation(),
    phoneNumber: phoneNumberValidation(),
    documentPhoto: documentPhotoValidation()
});

export const validatePatient = (req: Request, res: Response, next: NextFunction): void => {
    const combinedData = {
        ...req.body,
        documentPhoto: req.file ? req.file.buffer : undefined, 
    };

    const { error } = patientSchema.validate(combinedData, { abortEarly: false });

    if (error) {
        console.error('Validation error:', error.details.map((d) => d.message));
        res.status(400).json({ errors: error.details.map(detail => detail.message) });
        return;
    }

    next();
};