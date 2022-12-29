const fs = require('fs'); // file system
const idPath = __dirname+'/creds/';
var IDs = [];


function logArray(arr) {
    arr.forEach(item => {
        console.log(item.substring(0, item.length-5));  // return file name without extension (.json)
    });
}

function getIDs(path) {
    IDs.length = 0;
    files = fs.readdirSync(path);
    files.forEach(file => {
        IDs.push(file);
    });
    return IDs;
}
exports.getIDs = getIDs;

function checkUserExists(user) {
    let result = false;
    for (let i = 0; i < IDs.length; i++) {
        if (`${user}.json` == IDs[i]) {
            result = true;
            break;
        }
    }
    return result;
}
exports.checkUserExists = checkUserExists;