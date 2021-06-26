const Validator = require('validator');
const isEmpty = require('is-empty');
module.exports = function validateLoginInput(data) {
    let errors = {};

    // Converts empty fields to String in order to validate them
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


    if(!emailRegex.test(data.email)){
        errors.email = 'email should be valid'
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
