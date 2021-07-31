const _data = require('./lib/data');
const helpers = require('./lib/helpers');

// _data.read('users', 'petras', (err, data) => {
//     if (err || !data) {
//         console.log('Nepavyko perskaityti failo...');
//         return false;
//     }

//     console.log(data);
//     const obj = helpers.parseJsonToObject(data);
//     console.log(obj);
// })


// const pazymiai = [10, 2, 8, 4, 6];
// _data.create('marks', 'kazys', pazymiai, (err) => {
//     if (err) {
//         console.log(err);
//         return false;
//     }

//     console.log('Failas sekmingai sukurtas!');

//     _data.read('marks', 'kazys', (err, data) => {
//         if (err || !data) {
//             console.log('Nepavyko perskaityti Kazio failo...');
//             return false;
//         }

//         const obj = helpers.parseJsonToObject(data);
//         console.log(obj);
//     })
// });

// const petras = {
//     name: 'Petras',
//     age: 99,
//     car: 'Audi',
//     color: 'red'
// }
// _data.update('users', 'petras', petras, (err) => {
//     if (err) {
//         console.log(err);
//         return false;
//     }

//     console.log('Petro duomenys atnaujinti sekmingai.');

//     _data.read('users', 'petras', (err, data) => {
//         if (err || !data) {
//             console.log('Nepavyko perskaityti Petro failo...');
//             return false;
//         }

//         const obj = helpers.parseJsonToObject(data);
//         console.log(obj);
//     })
// });

// _data.delete('users', 'maryte', (err) => {
//     if (err) {
//         console.log(err);
//         return false;
//     }

//     console.log('Failas sekmingai istrintas.');
// })

// _data.list('marks', (err, data) => {
//     if (err || !data) {
//         console.log(err);
//         return false;
//     }

//     console.log(data);
// })

const zodis = 'Labas rytas';
const uzsifruotasZodis = helpers.hash(zodis);

console.log(zodis);
console.log(uzsifruotasZodis);

const zodis2 = 'Labas rytat';
const uzsifruotasZodis2 = helpers.hash(zodis2);

console.log(zodis2);
console.log(uzsifruotasZodis2);

const zodis3 = 'Labas rytat';
const uzsifruotasZodis3 = helpers.hash(zodis3);

console.log(zodis3);
console.log(uzsifruotasZodis3);