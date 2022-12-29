// let domain = "http://127.0.0.1:3002/";
let domain = "/";
// check if localStorage is populated (user has logged in before and has prev. auth key)
if (localStorage.length) {
    // verify authentication key is valid in server
    // fetch(`http://127.0.0.1:3002/api/key/${localStorage.getItem('authKey')}`, {method:"GET"}).then(
        verifyKey().then(
        res=>{window.open("./", "_self");},
        rej=>{
            // remove keys and links if not valid
            sessionStorage.clear();
            localStorage.clear();
            window.open("./nouser.html", "_self");
        });
} else window.history.replaceState(null, '', './nouser.html');



function verifyKey() {
return new Promise((res, rej) =>{
    let key = localStorage.getItem('authKey');
    fetch(`${domain}api/key/${key}`, {method:"GET"}).then(r=>{
        if (r.status != 409) res(r.status);
        else rej(r.status);
        });
    });
}