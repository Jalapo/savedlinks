function vars() {
var userLinks = [];
// var domain = 'http://127.0.0.1:3002/';
// var domain = '/';
// Break off point for tablets
// const viewBreakpoint = window.matchMedia("(max-width: 800px), (max-height: 570px)");

// Break off points for new view with 2 elements
const viewBreakpoint = window.matchMedia("(max-width: 890px), (max-height: 570px)");
// const thinTab = window.matchMedia("(max-height: 570px)");
let view = "list";
// let navbar;
let list;
let editBtns;
let delBtns;
let bb;
let urlBar;
let titleBar;
let addBtn;
}

window.addEventListener("DOMContentLoaded", () => { // setup
    // setup init variables
    // vars();
    // remove old stored storage values
    // attempt to load user with authkey
});
authKey = localStorage.getItem('authKey');
fixUpOld();
setup();
function firstSetup() {saveToAll();} 
function setup() {readLinks(); initSetup(); eventSetup();}
// if (localStorage.getItem(`authKey`) !== null) { 
if (!document.cookie.includes("visited")) document.cookie = "visited=1; expires=Tue, 31 Dec 2199 12:00:00 UTC";



function initSetup() { // initial setup of HTML element events
    queryItems();

    addBtn.addEventListener("click", addLink);
    urlBar.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") addLink();
    });

    urlBar.addEventListener("focus", expandBar);
    urlBar.addEventListener("focusout", collapseBar);

    viewBreakpoint.addEventListener("change", adjustScreen);
    adjustScreen();
}

function eventSetup() { // setup events for dynamic HTML elements
    queryItems();

    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener("click", (ev) =>{
            delClick(i);
            ev.stopPropagation();
        })
    }

    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].addEventListener("click", (ev) =>{
            editClick(i);
            ev.stopPropagation();
        })
    }
}

function addLink() { // functionality of add link button
    queryItems();

    let title = (titleBar.value) ? titleBar.value : urlBar.value;
    if (urlBar.value) {
        userLinks.push({title: title, url : urlBar.value});
        readLinks('new');
        eventSetup();
        saveToAll();
    }
    urlBar.value = titleBar.value = "";
    document.activeElement.blur();
    collapseBar();
}

function readLinks(state = 'none') {
    // clear bookmarks from view
    queryItems();
    clear(list);

    // display each bookmark in 'links' array
    for (let i = 0; i < userLinks.length; i++) {
        box = createBookmarkBox(userLinks[i]);
        $(".links-container").append(box);
        if (i == (userLinks.length - 1) && state == 'new') box.css('transform', `scale(0.0)`);

        if (i == (userLinks.length - 1) && state == 'new') {
            box.css('transition', `all .5s ease-in-out`);
            setTimeout(() => {box.css('transform', `scale(1.0)`);}, 50);
            setTimeout(() => {box.css('transition', `none`);}, 1000);
        }
    }
}


function editClick(boxNum) { // change properties of bookmark (on click)
    alert("clicked edit");
}

function delClick(boxNum) { // deletes box (on click)
    userLinks.splice(boxNum, 1); // remove from array
    readLinks(); // update screen
    eventSetup(); // reconfigure events
    saveToAll(); // save changes
}

function adjustScreen() { // changes view of app depending on screen size
    return 1;
    queryItems();
    //clear navbar and add default elements (logo)
    clear(navbar);
    logo = navbar.appendChild(document.createElement("a"));
    logo.classList.add("logo");
    logo.appendChild(document.createTextNode("Safe Links"));

    /*
    if (viewBreakpoint.matches) { // is this a mobile device?
        // if so, create a header expand button
        let nbExpand = document.createElement("span");
        nbExpand.appendChild(document.createTextNode("≡"));
        // assign event

        // add to navbar
        navbar.appendChild(document.createElement("div").appendChild(nbExpand));
    } else {
        // create login and register buttons
        let login = document.createElement("span");
        login.appendChild(document.createTextNode("Login"));
        let register = document.createElement("span");
        register.appendChild(document.createTextNode("Register"));
        // assign events to buttons

        // create container to hold them together
        let container = document.createElement("div");
        container.appendChild(document.createElement("div").appendChild(login));
        container.appendChild(document.createElement("div").appendChild(register));
        // add to navbar
        navbar.appendChild(container);
    }
    */
}

function expandBar() { // "expands" bottom URL bar to show URL title input box
    queryItems();
    if (bb.children[0].tagName != "INPUT") { // if the title input box is not already present
        titleInput = document.createElement("input"); // create title input 
        titleInput.type = "text";
        titleInput.placeholder = "Google";
        titleInput.maxLength = 24;
        titleInput.addEventListener("focusout", collapseBar);
        titleInput.addEventListener("keypress", (ev) => {
            if (ev.key === "Enter") addLink();
        });

        
        bb.insertBefore(titleInput, bb.children[0]); // place input above the other bottom bar elements
    }
}

function collapseBar() { // "collapses" bottom URL bar and hides URL title input box
    queryItems();
    setTimeout(() => {
        if (urlBar.value == "" && titleBar.value == "") { // text inputs are empty
            bb = document.querySelector(".bottomBar");
            if (bb.children.length == 2 && document.activeElement.tagName != "INPUT") bb.removeChild(bb.children[0]);
        }
    }, 10);
}

function saveToAll() {
    saveToLocal(); // one line left needs to be replaced when cloud is implemented
    // uncomment when developed
    saveToCloud(); 
}

function saveToLocal() { // saves current bookmarks to localStorage
    localStorage.setItem("authKey", authKey);
    sessionStorage.setItem("links", JSON.stringify(userLinks));
}

function saveToCloud() {
    // at some point, this should block spam inputs:
    // update a global dummy variable [cloudReqs] by +1, expected value at start is 0
    // setTimeout for 5s-> check if variable value has persisted (cloudReqs == 1)
    // - if true (unchanged): call 'updateDB()' to push changes
    updateDB();
}

function updateDB() {
    // let cloudPush = JSON.stringify({links: sessionStorage.getItem("links")});
    let cloudPush = JSON.stringify(userLinks);
    // console.log(userLinks);
    let data = new FormData();
    data.append('links', cloudPush);
    // console.log(`pushed: ${cloudPush}`);
    fetch(`${domain}api/links/update/${localStorage.getItem('authKey')}`, {
        method: "POST",
        body: new URLSearchParams(data)
    }).then(r=>{
        if (r.status == 409){
            sessionStorage.clear();
            localStorage.clear();
            reactRender("default");
        } 
        else console.log('DB updated');
});
}

function fixUpOld() {
    // --- LOCALSTORAGE ----
    // remove 'myID' and relative items (12/26/22)
    // added user to localStorage, localStorage.length = 2 (only when logged in); (2/27/23)
    if (localStorage.getItem('myID') || localStorage.length != 2) {
        let aK = localStorage.getItem('authKey');
        localStorage.clear();
        if (aK) localStorage.setItem('authKey',aK);
    }
    // --- END LOCALSTORAGE ---
}