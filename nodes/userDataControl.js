'use strict';

var express = require('express'); // server app
const fs = require('fs'); // file system
const id = require('./updateIdList.js');
var app = express();
var port = 3002;

const idStorage = __dirname+'/creds/';
// let 

let IDs = id.getIDs(idStorage);
IDs.forEach(element => {
    console.log(element);
});

app.get(`/login/:idFile`, (req, res) => {
    let idFile = req.params.idFile;
    if (fs.existsSync(`${idStorage}${idFile}`)) {
        let userData = fs.readFileSync(`${idStorage}${idFile}`, {encoding:'utf8', flag:'r'});
        res.json(userData);
    } else {
        res.json(fs.readFileSync(`${idStorage}00.db`, {encoding:'utf8', flag:'r'}))
    }
})

app.listen(port, '127.0.0.1', () => {
    console.log(`Safe Links auth app listening on port ${port}`)
})
/*

generate random ID with nums and chars (
    random IF to choose between char or num
    then random num between 1-26 or 0-9, resepctively
)
check ID against all saved IDs, repeat prev. if not available
if available, save creds to ID, send creds to returnBookmarks.js
*/