let validations = {};

validations.isRealString = function(s) {
    return typeof(s) === 'string' && s.trim().length > 0;
}

module.exports = validations;