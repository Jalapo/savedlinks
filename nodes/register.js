'use strict';

var express = require('express'); // server app
const fs = require('fs'); // file system
const id = require('./updateIdList.js');
var app = express();
var port = 3001;

const idStorage = __dirname+'/creds/';
// let 

let IDs = id.getIDs(idStorage);
IDs.forEach(element => {
    console.log(element);
});
/*

generate random ID with nums and chars (
    random IF to choose between char or num
    then random num between 1-26 or 0-9, resepctively
)
check ID against all saved IDs, repeat prev. if not available
if available, save creds to ID, send creds to returnBookmarks.js
*/