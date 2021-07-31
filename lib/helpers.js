const crypto = require('crypto');

const hashingSecret = 'uhbfwwhbfiqf';
const helpers = {};

helpers.parseJsonToObject = str => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}

helpers.hash = str => {
    if (typeof str === 'string' && str !== '') {
        return crypto.createHmac('sha256', hashingSecret).update(str).digest('hex');
    } else {
        return false;
    }
}

module.exports = helpers;






// sdf
// wer


// a + secret (salt) -> sdflihdbfkalsbfkjasdkf
// b + secret (salt) -> fbajkfkadnfijkkfnjwelf


// a -> sdf
// a -> sdf
// a -> sdf
// a -> sdf