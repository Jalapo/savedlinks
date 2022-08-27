const fs = require('fs'); // file system
const { resourceLimits } = require('worker_threads');
const idPath = __dirname+'/creds/';
var IDs = [];


// getIDs(idPath);
// console.log(checkUserExists('00'));

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

// function to create a user, references a seperate bcrypt function to create and return a hash from an inputted password on arrival
/*
user registers, credentials are sent to register.js node app
once sent, immediately bcrypt the passed argument
send username and hash back here in an array to function to push it into its file, filename: username;
getIDs(idPath);

*/