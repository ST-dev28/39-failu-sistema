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

lib.create = (dir, file, data, callback) => {
    fs.open(fullPath(dir, file), 'wx', (err, fileDescriptor) => {
        if (err || !fileDescriptor) {
            return callback('Nepavyko sukurti failo, nes jis turbut jau egzistuoja.')
        }

        const stringData = JSON.stringify(data);

        fs.writeFile(fileDescriptor, stringData, (err) => {
            if (err) {
                return callback('Turinio irasymo metu ivyko klaida.');
            }

            fs.close(fileDescriptor, (err) => {
                if (err) {
                    return callback('Nepavyko uzdaryti failo.');
                }

                return callback(false);
            })
        })
    })
}

lib.update = (dir, file, data, callback) => {
    fs.open(fullPath(dir, file), 'r+', (err, fileDescriptor) => {
        if (err || !fileDescriptor) {
            return callback('Nepavyko atidaryti norimo failo, nes jis turbut neegzistuoja.');
        }

        const stringData = JSON.stringify(data);

        fs.ftruncate(fileDescriptor, (err) => {
            if (err) {
                return callback('Klaida truncating (suspaudziant) faila');
            }

            fs.writeFile(fileDescriptor, stringData, (err) => {
                if (err) {
                    return callback('Klaida irasinejant i turima faila');
                }

                fs.close(fileDescriptor, (err) => {
                    if (err) {
                        return callback('Klaida bandant uzdaryti faila');
                    }

                    return callback(false);
                })
            })
        })
    })
}

module.exports = lib;