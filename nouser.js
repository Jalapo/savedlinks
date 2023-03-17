// let navbar;
// let domain = 'http://127.0.0.1:3002/';
// let domain = '/';

/*window.addEventListener("DOMContentLoaded", () => {
a();
}); */
a();
function a() {
    // initialize common variables
    queryItems();
    setupFormEvents();
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
        // if the current auth page is the same as the clicked button, minimize and change action var for changePage();
        if (action == loginPromptAction || action == 0) {min(); action = 0;} 
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


function setupFormEvents() {
    let login = document.querySelector(".loginPrompt");
    let [userDOM, pwDOM] = login.querySelectorAll("input");
    let authButton = login.querySelector("button");
    authButton.addEventListener("click",()=>{
        let action = loginPromptAction==1? "login" : "register";
        let form = new FormData();
        form.append('user', userDOM.value);
        form.append('pw', pwDOM.value);
        fetch(`${domain}${action}`, {body: new URLSearchParams(form), method: "POST"}).then(res=>{
            res.text().then(str=>{
                console.log(`prev key: ${localStorage.getItem('authKey')}`);
                localStorage.setItem('authKey',str); // store authkey
                localStorage.setItem('user',userDOM.value); // store username
                authKey = str;
                console.log(`new key: ${localStorage.getItem('authKey')}`);
                // render app
                getLinksFromDB(str, userLinks, ()=>{reactRender("loggedin");});
            });
        });
    });
}