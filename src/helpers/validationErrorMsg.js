// Generate error messages for individual field validation errors

exports.notExists = name => `${name} is not given or is invalid.`;

exports.notValid = name => `${name} is not valid.`;

exports.alphaNum = name => `${name} can only contain alphanumeric characters.`;

exports.len = (name, min = 1, max) => `${name} must be between ${min} - ${max} characters.`;