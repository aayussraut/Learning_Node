// made customer.js to simply define the schema and validate customer
//sperating it from express routes
const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
    name: String,
    isGold: Boolean,
    phone: String,
});
const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(7).max(15).required(),
        isGold: Joi.boolean()

    });
    return schema.validate(customer);
}
module.exports.customerSchema=customerSchema;
module.exports.Customer=Customer;
module.exports.validate=validateCustomer;