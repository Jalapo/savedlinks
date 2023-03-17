'use strict';

var express = require('express'); // server app
var bodyParser = require('body-parser');
const fs = require('fs'); // file system
const id = require('./updateIdList.js');
const bcrypt = require('bcrypt'); 
var app = express();
var port = 3002;

const idStorage = __dirname+'/creds/';
var validAuthKeys = new Map([]);
// var authKeyPersistenceMS = 0.5; // 1min for local debugging
var authKeyPersistenceMS = 15; // define in mins
authKeyPersistenceMS *= 60*1000; // convert mins to ms for functions

// parsers for post data
var UE_Parser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

// get all stored IDs
let IDs = id.getIDs(idStorage);

/* CORS and ID logging disabled for production

IDs.forEach(element => {
    console.log(element);  // DEBUG LOGGING: SHOW ALL PROFILES
});


function CORS(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return 0; 
}
*/
function CORS() {return 0;} // fake CORS function for production

// attempt to login
app.post(`/login`, UE_Parser, async (req, res) => {
    CORS(res);
    // check if passed username exists
    console.log(req.body);
    let user = req.body.user;
    let userDbFile = `${idStorage}${user}.db`;
    if (fs.existsSync(userDbFile)) {
        // if so, grab password hash from db file
        fs.readFile(userDbFile, async (err,data) => {
            if (err) throw err;
            let pwHash = JSON.parse(data)?.pwh;
            // compare password hash to post data password
            if (await bcrypt.compare(req.body.pw, pwHash)) {
                // create auth (access) key
                let userAuthKey = createKey(user);
                console.log(`${userAuthKey} created`);
                res.statusCode = 200;
                res.send(userAuthKey);
            } else res.sendStatus(409);
        });
    } else res.sendStatus(409);
});

// attempt to register new user
app.post(`/register`, UE_Parser, async (req, res) => {
    CORS(res);
    let b = req.body;
    let regex = /^\w+$/i;
    if (!regex.test(b.user) || !regex.test(b.pw)) res.sendStatus(409);
    let user = b.user;

    // Check if username already exists
    // init var to check availability
    let usernameAvailable = true;
    // begin loop of all used ids
    IDs.forEach(id=>{
        if (user == id.split('.')[0]) usernameAvailable = false;
    });
    if (usernameAvailable) {
        // create password hash
        let pwh = await bcrypt.hash(b.pw, 12);

        // create json for auth and data
        let json = {"pwh": pwh, "links": [{"title": "Google", "url": "google.com"}]};
        fs.writeFile(`${idStorage}${user}.db`, JSON.stringify(json), 'utf8', (err)=>{
            if (err) throw err;
            console.log(`User created: ${user}`);
            res.statusCode = 200;
            let userAuthKey = createKey(user);
            res.send(userAuthKey);
        });

    } else res.sendStatus(409);



});

// get auth key status and update expiry
app.get("/api/key/:key", (req,res)=>{
    CORS(res);
    let clientKey = req.params.key;
    let doesKeyExist = validAuthKeys.has(clientKey);
    console.log(`key ${clientKey}: ${doesKeyExist?'passed':'failed'}`);
    if (doesKeyExist) {res.sendStatus(200); updateKeyExpiry(clientKey);}
    else res.sendStatus(409);
});

// get links associated with auth key
app.get(`/api/links/:key`, (req,res) =>{
    CORS(res);
    let clientKey = req.params.key;
    // send conflict response if client authKey is not valid
    if (!validAuthKeys.has(clientKey)) {res.sendStatus(409); throw null;}

    // if valid, get username relative to auth key
    let clientUser = validAuthKeys.get(clientKey).rel;
    // get path to user db file
    let userDbFile = `${idStorage}${clientUser}.db`
    // check if db file exists
    if (fs.existsSync(userDbFile)) {
        // get contents of user db file and parse and return to client as json string
        let fileData = fs.readFileSync(userDbFile, {encoding:'utf8', flag:'r'});
        let userLinks = JSON.parse(fileData).links;
        // console.log(userLinks);
        updateKeyExpiry(clientKey);
        res.status(200).json({links:userLinks});
    } else {
        // or return default user file if authkey does not match username (server error or localStorage misuse)
        res.status(202).json(fs.readFileSync(`${idStorage}00.db`, {encoding:'utf8', flag:'r'}))
    }
});


// post updated links to db file
app.post(`/api/links/update/:key`, UE_Parser, (req,res)=>{
    CORS(res);
    let clientKey = req.params.key;
    let relativeUser = validAuthKeys.has(clientKey)? validAuthKeys.get(clientKey).rel : null;
    // return 409 if key passed does not match a user
    if (!relativeUser) res.sendStatus(409);
    else {
        // pull updated links from request body
        let b = req.body;
        let links = b.links;
        // console.log(`updated links: ${links}`);
        let userPath = idStorage+relativeUser+'.db';
        fs.readFile(userPath, 'utf8', (err,data)=> {
            if (err) throw err;
            let json = JSON.stringify({pwh: JSON.parse(data).pwh, links: JSON.parse(links)});
            let writer = fs.createWriteStream(userPath, {flags: 'w'});
            writer.write(json);
            updateKeyExpiry(clientKey);
            res.sendStatus(200);
        })
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Safe Links auth app listening on port ${port}\n`)
})


// FUNCTIONS \\

// create and add auth key to list
function createKey(username) {
    let key = genKey();
    validAuthKeys.set( key, {rel: username, expiryTimer: setTimeout(()=>{removeKey(key);}, authKeyPersistenceMS)} );
    return key;
}

// remove auth key from list
function removeKey(key) {
    // console.log(`${key} removed`);  // DEBUG LOGGING
    return validAuthKeys.delete(key);
}

// generate a ~random key
function genKey() {
    let chars=['a','b','c','d','e','f','g','h','i','j','k','l','m',
                'n','o','p','q','r','s','t','u','v','w','x','y','z',
                '1','2','3','4','5','6','7','8','9','0'];
    let k='';
    for (let i=0; i<Math.round(Math.random()*5)+5; i++) {
        let c = chars[Math.floor(Math.random()*chars.length)];
        // capitalize chars at random
        if (Math.round(Math.random())) c=c.toUpperCase();
        k+=c;
    }
    return k;
}

// update key expiry
function updateKeyExpiry(key) {
    let keyExpiry = validAuthKeys.get(key).expiryTimer;
    clearTimeout(keyExpiry);
    let time = setTimeout(()=>{removeKey(key);}, authKeyPersistenceMS);
    validAuthKeys.get(key).expiryTimer = time;
    // console.log(`${key} updated`); // DEBUG LOGGING
}