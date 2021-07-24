// Failu sistemos CRUD

const fs = require('fs');
const path = require('path');

const lib = {}

// absoliuti kelio nuoroda iki folder'io, kuriame bus talpinami visi duomenu failai
lib.baseDir = path.join(__dirname, '../.data/');

function fullPath(dir, file) {
    return `${lib.baseDir}${dir}/${file}.json`;
}

// funkcija, kuri skaito failo turini
lib.read = (dir, file, callback) => {
    fs.readFile(fullPath(dir, file), 'utf-8', (err, data) => {
        if (err || !data) {
            return callback(err, data);
        }

        return callback(false, data);
    })
}

module.exports = lib;