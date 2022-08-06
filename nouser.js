let navbar;
let login;
let register;

function a () {
    // initialize common variables
    queryItems();
    // find login and register buttons in navbar and define them
    let btns = navbar.querySelectorAll("span");
    btns.forEach(btn => btn.addEventListener("click", promptLogin(index)));

}

function promptLogin(action) { // action: 0 = login, 1 = register
switch (action) {
    case 0:
        
        break;
    case 1: 
        
        break;
    default:
        break;
}
}