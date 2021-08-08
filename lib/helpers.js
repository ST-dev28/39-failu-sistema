// cia sudedamos pagalbines funkcijos -> apsaugos

const crypto = require('crypto');

const hashingSecret = 'uhbfwwhbfiqf';   // mano slapta kodo kombinacijos dalis (salt)
const helpers = {};

// funkcija parseJsonToObject -  apsauga nuo klitiniu klaidu 
helpers.parseJsonToObject = str => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}
// funkcija slaptazodzio (ir ne tik) sifravimui
helpers.hash = str => {
    if (typeof str === 'string' && str !== '') {
        return crypto.createHmac('sha256', hashingSecret).update(str).digest('hex');
    } else {
        return false;
    }
}
// sha256 - stiprus sifavimo algoritmas
// hex - sesioliktainis kodavimo formatas

module.exports = helpers;






// sdf
// wer


// a + secret (salt) -> sdflihdbfkalsbfkjasdkf
// b + secret (salt) -> fbajkfkadnfijkkfnjwelf


// a -> sdf
// a -> sdf
// a -> sdf
// a -> sdf