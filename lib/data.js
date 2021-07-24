// Failu sistemos CRUD

// fs ir path - yra globalus modulis, kuris jau yra node JS
const fs = require('fs');
//console.log(fs);

const path = require('path');
//console.log(path);

const lib = {}

// absoliuti kelio nuoroda iki folderio, kuriame bus talpinami visi duomeny failai
lib.baseDir = path.join(__dirname, '../.data/');

//console.log(__dirname);
// https://www.puslapiai.lt/

function fullPath(dir, file) {
    return `${lib.baseDir}${dir}/${file}.jason`;
}
 // funkcija, kuri skaito failo turini
 // 'utf-8' - enkodingas (nuliuku ir vinetuku)
 lib.read = (dir, file, callback) => {
    fs.readFile(fullPath(dir, file), 'utf-8', (err, data) => {
        if (err || !data) {
            return callback(err, data);
        }

        return callback(false, data);
    })
}

/*
const maryte = fullPath('users', 'maryte')
const petras = fullPath('users', 'petras')
console.log(maryte);
console.log(petras);

sukurtasFailas('users', 'petras')
sukurtasFailas('cars', 'audi')
*/

module.exports = lib;