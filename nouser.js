let navbar;
let loginPromptAction = 0; //  1 = login, 2 = register

window.addEventListener("DOMContentLoaded", () => {
a();
});
function a() {
    // initialize common variables
    queryItems();
    // find login and register buttons in navbar and define them
    let btns = Array.from(navbar.querySelectorAll("span")); // create an array of the buttons gathered from the node list
    
    console.log(`buttons: ${btns}`);
    btns.forEach(btn => {btn.addEventListener("click", () => {promptLogin(btns.indexOf(btn+1))} )});
}

function promptLogin(action) { // action: 1 = login, 2 = register
    let prompt = document.body.querySelector(".loginPrompt");
    changePage(action);
    // define functions to control prompt
    function max() {
        prompt.classList.remove('hidden');
    }
    function min() {
        prompt.classList.add('hidden');
    }
    function changePage(input) {
        loginPromptAction = input;
    }

    if (action) {
        
        if (!prompt) return console.log("No login prompt found in nouser.html");

        // if login prompt is hidden, bring it into view. otherwise hide it away
        let func = prompt.classList.contains("hidden") ? max : min;
        func();
    }
    switch (action) {
        case 1:
            window.prompt("login!");
            break;
        case 2: 
            window.prompt("register!");
            break;
        default:
            break;
    }
}