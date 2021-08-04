const _data = require('./lib/async-data');
const helpers = require('./lib/helpers');

(async () => {

    const petras = await _data.read('users', 'petras');
    console.log(petras);
    const petrasObj = helpers.parseJsonToObject(petras);
    console.log(petrasObj);

    const maryjosObj = { ...petrasObj, name: 'Maryja' };
    const maryja = await _data.create('users', 'maryja', maryjosObj);
    console.log('Ar pavyko sukurti Maryja:', maryja);

    const updatedMaryjosObj = { ...maryjosObj, age: 50 };
    const updatedMaryja = await _data.update('users', 'maryja', updatedMaryjosObj);
    console.log('Ar pavyko atnaujinti Maryja:', updatedMaryja);

    const deletedMaryja = await _data.delete('users', 'maryja');
    console.log('Ar istryne Maryja:', deletedMaryja);

    const users = await _data.list('marks');
    console.log(users);

})();
