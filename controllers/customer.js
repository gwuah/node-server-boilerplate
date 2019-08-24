const joi = require("joi");
const constants = require("../constants");
const utilities = require("../utilities");
const Customer = require("../models/Customer");

exports.create = async (query, data) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .lowercase(),
    email: Joi.string()
      .email()
      .required(),
    telephone: Joi.string()
      .required()
      .min(10),
    password: Joi.string(),
    salt: Joi.string(),
    role: Joi.string().valid([constants.roles.customer])
  });

  const { error, response: data } = utilities.validate(schema.validate(data));

  if (error) {
    return { error: true, data };
  }

  const customerObj = new Customer(data);
  const customer = await customerObj.save();

  return { error: false, data: customer };
};
