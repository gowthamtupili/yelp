const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');


const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
    title: Joi.string()
        .required().escapeHTML(),
    // image: Joi.string()
    //     .required(),
    price: Joi.number()
        .min(0)
        .required(),
    description: Joi.string()
        .required().escapeHTML(),
    location: Joi.string()
        .required().escapeHTML(),
    deleteImages: Joi.array() 
})

module.exports.reviewSchema = Joi.object({
    review: Joi.string()
        .required().escapeHTML(),
    rating: Joi.number()
        .min(1)
        .max(5)
        .required(),

})