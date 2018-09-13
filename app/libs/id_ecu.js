const UtilID = {
    isCINaturalPerson: function (identification) {
        return identification.length === 10;
    },
    isRUCNaturalPerson: function (identification) {
        return identification.length === 13 && identification.charAt(2) !== '6' && identification.charAt(2) !== '9' && identification.substring(10, 13) === '001';
    },
    lastDigitsRUC: function (identification) {
        return identification.length === 13 && identification.substring(10, 13) === '001';
    },
    isRUCLegalPerson: function (identification) {
        return this.lastDigitsRUC(identification) && identification.charAt(2) === '9';
    },
    isRUCPublicCompany: function (identification) {
        return this.lastDigitsRUC(identification) && identification.charAt(2) === '6';
    },
    validateCI: function (identification, coefficients) {
        let id = identification;
        let sumDigitsByCoefficient = 0;
        let value = 0;
        for (let i = 0; i < coefficients.length; i++) {
            let digit = id.charAt(i) * 1;
            value = coefficients[i] * digit;
            if (value > 9)
                value = value - 9;
            sumDigitsByCoefficient = sumDigitsByCoefficient + value;
        }
        let module = sumDigitsByCoefficient % 10;
        module = (module === 0) ? 10 : module;
        let result = 10 - module;
        let lastDigit = id.charAt(9) * 1;
        return result === lastDigit;
    },
    validateRUC: function (identification, coefficients, digitChecker) {
        let id = identification;
        let checker = digitChecker * 1;
        let sumTotalDigitsByCoefficient = 0;
        let digit = 0;
        let value = 0;
        for (let i = 0; i < coefficients.length; i++) {
            digit = id.charAt(i) * 1;
            value = coefficients[i] * digit;
            sumTotalDigitsByCoefficient = sumTotalDigitsByCoefficient + value;
        }
        let module = sumTotalDigitsByCoefficient % 11;
        let result = 0;
        if (module !== 0)
            result = 11 - module;
        return result === checker;
    }
};

module.exports = UtilID;