import UtilID from './id_ecu'

const formatValidyErrors = errors => {
    let result = {};
    for (let error in errors) {
        if (errors.hasOwnProperty(error)) {
            result[error] = errors[error][0]['message'];
        }
    }
    return result;
};

const asyncLoop = (iterations, func, callback) => {
    let index = 0;
    let done = false;
    let loop = {
        next: () => {
            if (done)
                return;
            if (index < iterations) {
                index++;
                func(loop);
            } else {
                done = true;
                callback();
            }
        },
        iteration: () => {
            return index - 1;
        },
        break: () => {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
};

const validateDocumentECU = (document, type) => {
    switch (type) {
        case 'CI':
            return validateCI_ECU(document);
        case 'RUC':
            return validateRUC_ECU(document);
        default:
            return true;
    }
};

const validateCI_ECU = document => {
    let coefficientsCI = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    return (UtilID.isCINaturalPerson(document) && UtilID.validateCI(document, coefficientsCI));
};

const validateRUC_ECU = document => {
    let coefficientsCI = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let coefficientsRUCLegalPerson = [4, 3, 2, 7, 6, 5, 4, 3, 2];
    let coefficientsRUCPublicCompany = [3, 2, 7, 6, 5, 4, 3, 2];
    return UtilID.isRUCNaturalPerson(document) && UtilID.validateCI(document, coefficientsCI)
};

module.exports = {
    formatValidyErrors,
    asyncLoop,
    validateDocumentECU
};