// Generate error messages for individual field validation errors

exports.notExists = (name) => `${name} is not given or is invalid.`;

exports.notValid = (name) => `${name} is not valid.`;

exports.alphaNum = (name) => `${name} can only contain alphanumeric characters.`;

exports.len = (name, min = 1, max) => `${name} must be between ${min} - ${max} characters.`;

exports.chars = (name) => `${name} contains disallowed characters.`;

exports.filters = (name) => `No filter parameters provided to or passed ${name.toLowerCase()} lookup validation.`;

exports.disallowed = (name) => `${name} value is disallowed.`;
