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
    btns.forEach(btn => {btn.addEventListener("click", () => {promptLogin(btns.indexOf(btn)+1)})});
}

function promptLogin(action) { // action: 1 = login, 2 = register
    let prompt = $(".loginPrompt");
    if (!prompt) return console.log("No login prompt found in nouser.html");
    console.log(prompt.hasClass("hidden"));

    // if login prompt is hidden, bring it into view. otherwise check if should be hidden
    let func = prompt.hasClass("hidden") ? () => {max();} :
    ()=>{
        if (action == loginPromptAction || action == 0) {min(); action = 0;} // if the current auth page is the same as the clicked button, minimize and change action var for changePage();
    };
    func();
    changePage(action);
    
    // define functions to control prompt
    function max() {prompt.removeClass('hidden');}
    function min() {prompt.addClass('hidden');}
    function changePage(input) {loginPromptAction = input;
        let titleTxt = $(".loginPrompt>.promptTitle");
        let authBtn = $(".loginPrompt>button");
        switch (input) {
            case 1:
                titleTxt.text("Login");
                authBtn.text("Sign in");
                break;
            case 2: 
                titleTxt.text("Register");
                authBtn.text("Sign up");
                break;
            default:
                break;
        }}
}