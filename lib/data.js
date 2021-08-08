// Failu sistemos CRUD

const fs = require('fs');
const path = require('path');
//console.log(fs);
//console.log(path);

const lib = {}

// absoliuti kelio nuoroda iki folder'io, kuriame bus talpinami visi duomenu failai
lib.baseDir = path.join(__dirname, '../.data/');
//console.log(__dirname);   
// __dirname - globali reiksme, ji parodo, kur randasi mano failas
// ../.data/ - reliatyvus kelias, kur bus musu duomenys

function fullPath(dir, file) {
    return `${lib.baseDir}${dir}/${file}.json`;
}
const petras = fullPath('users', 'petras');
console.log(petras);  // parodo pilna kelia, kur randasi informacija apie Petra

// funkcija, kuri skaito failo turini
lib.read = (dir, file, callback) => {
    fs.readFile(fullPath(dir, file), 'utf-8', (err, data) => {
        if (err || !data) {   // jei ivyko klaida arba nera duomenu
            return callback(err, data);  // jei buvo klaida, nurodo kokia ji
        }

        return callback(false, data);  // jei klaidos nebuvo, rodo duomenis
    })
}
// utf-8 - enkodingas, kad nulius ir vienetus konvertuotu i suprantama teksta

lib.create = (dir, file, data, callback) => {
    //console.log(dir);
    //console.log(file);
    //console.log(data);
    //console.log(callback);
    fs.open(fullPath(dir, file), 'wx', (err, fileDescriptor) => {  //sukuria faila, jei jo nera, arba ji tiesiog atidaro, jei yra 
        // wx - "write and execute" - failui suteikia teise rasyti ir vykdyti failus
        // fileDescriptor kintamasis- atminties vieta, kur randasi ka tik atidarytas failas (leidimas naudotis suo failu)
        if (err || !fileDescriptor) {  // ar man pavyko atidaryti faila?
            return callback('Nepavyko sukurti failo, nes jis turbut jau egzistuoja.')
        }

        const stringData = JSON.stringify(data);      // sutekstinam duomenis ir duoto arrey

        fs.writeFile(fileDescriptor, stringData, (err) => {      //ar man pavyko irasyti faila?
            if (err) {
                return callback('Turinio irasymo metu ivyko klaida.');  // atveju, jei klaida ivyko
            }

            fs.close(fileDescriptor, (err) => {     // ar man pavyko uzdaryti faila? 
                if (err) {        //atveju, jei klaida ivyko
                    return callback('Nepavyko uzdaryti failo.');
                }

                return callback(false);     //atveju, jei klaidos nera
            })
        })
    })
}

lib.update = (dir, file, data, callback) => {
    fs.open(fullPath(dir, file), 'r+', (err, fileDescriptor) => {
        if (err || !fileDescriptor) {
            return callback('Nepavyko atidaryti norimo failo, nes jis turbut neegzistuoja.');
        }

        const stringData = JSON.stringify(data);  //uzkoduojam duomenis

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

lib.delete = (dir, file, callback) => {
    fs.unlink(fullPath(dir, file), (err) => {
        if (err) {
            return callback('Klaida bandant istrinti faila.')
        }

        return callback(false);  // klaidos nera
    });
}

// funkcija perskaityti, kokie failai yra folderyje
lib.list = (dir, callback) => {
    const fullFolderPath = lib.baseDir + dir + '/';
    fs.readdir(fullFolderPath, (err, data) => {
        if (err || !data || data.length === 0) {
            return callback(err, data);
        }

        const trimmedFileNames = [];  //suptrumpintai failo versijai gauti, t.y. be galunes ".json"
        for (const file of data) {
            trimmedFileNames.push(file.split('.').slice(0, -1).join('.'));
        }
        return callback(false, trimmedFileNames);
    })
}
// onute.json        -> ['onute']           -> 'onute'
// onute.min.json    -> ['onute', 'min']    -> 'onute.min'


module.exports = lib;