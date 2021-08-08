// Failu sistemos CRUD

// const fs = require('fs/promises');       // alternatyva
const fs = require('fs').promises;
const path = require('path');

const lib = {}

// absoliuti kelio nuoroda iki folder'io, kuriame bus talpinami visi duomenu failai
lib.baseDir = path.join(__dirname, '../.data/');

function fullPath(dir, file) {
    return `${lib.baseDir}${dir}/${file}.json`;
}

// funkcija, kuri skaito failo turini
lib.read = async (dir, file) => {
    try {
        return await fs.readFile(fullPath(dir, file), 'utf-8');
    } catch (error) {
        return '';
    }
}

lib.create = async (dir, file, data) => {
    let fileDescriptor = null;
    try {
        fileDescriptor = await fs.open(fullPath(dir, file), 'wx');    // atsidarom faila
        fs.writeFile(fileDescriptor, JSON.stringify(data));   //islaukiam, kol failu sistema irasys nauja informacija
        return true;
    } catch (error) {
        return error;
    } finally {
        if (fileDescriptor) {  // jei fileDescriptor egzistuoja, tik tada ji uzdaryk
            fileDescriptor.close();
        }
    }
}

lib.update = async (dir, file, data) => {
    let fileDescriptor = null;
    try {
        fileDescriptor = await fs.open(fullPath(dir, file), 'r+');   // atsidarom faila ir r+ - perrasom faila (overwrite)
        await fileDescriptor.truncate();   // susitrumpinam (apkarpom) faila
        await fs.writeFile(fileDescriptor, JSON.stringify(data));   //islaukiam, kol failu sistema irasys nauja informacija
        return true;
    } catch (error) {
        return false;
    } finally {
        if (fileDescriptor) {    // jei fileDescriptor egzistuoja, tik tada ji uzdaryk
            fileDescriptor.close();
        }
    }
}

lib.delete = async (dir, file) => {
    try {
        await fs.unlink(fullPath(dir, file));
        return true;
    } catch (error) {
        return false;
    }
}

lib.list = async (dir) => {
    const fullFolderPath = lib.baseDir + dir;
    try {
        const files = await fs.readdir(fullFolderPath);
        const trimmedFileNames = [];
        for (const file of files) {
            trimmedFileNames.push(file.split('.').slice(0, -1).join('.'));
        }
        return trimmedFileNames;
    } catch (error) {
        return error;
    }
}

module.exports = lib;