let links = [];
const viewBreakpoint = window.matchMedia("(max-width: 800px), (max-height: 570px)");
// const thinTab = window.matchMedia("(max-height: 570px)");
let view = "list";

window.onload = () => { // setup
    getLinks();
    setTimeout(initSetup, 100);
    setTimeout(setupEvents, 100);
}

function initSetup() {
    urlBar = document.querySelector(".link-input-bar > input");
    addBtn = document.querySelector(".link-input-bar > button");

    addBtn.addEventListener("click", addLink);
    urlBar.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") addLink();
    })

    viewBreakpoint.addEventListener("change", adjustScreen);
    adjustScreen();
}

function setupEvents() {
    editBtns = document.querySelectorAll(".editURL > button");
    delBtns = document.querySelectorAll(".delURL > button");

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
    urlBar = document.querySelector(".link-input-bar > input");
    if (urlBar.value) {
        links.push({url : urlBar.value});
        console.log(links[-1]);
        console.log(urlBar.value);
        readLinks();
        setupEvents();
    }
}

function readLinks() {
    // clear bookmarks from view
    let list = document.querySelector(".links-container");
    clear(list);

    // display each bookmark in 'links' array
    for (let i = 0; i < links.length; i++) {
        box = createBookmarkBox(links[i]);
        document.querySelector(".links-container").appendChild(box);
    }
}


function adjustNav() {
    let navbar = document.querySelector(".navbar");
    clear(navbar);
    if (view == "list") {
        let nbExpand = document.createElement("span");
        nbExpand.appendChild(document.createTextNode("≡"));
        navbar.appendChild(document.createElement("div").appendChild(nbExpand));
    } else if (view == "desktop") {
        let login = document.createElement("span");
        login.appendChild(document.createTextNode("Login"));
        let register = document.createElement("span");
        register.appendChild(document.createTextNode("Register"));
        navbar.appendChild(document.createElement("div").appendChild(login));
        navbar.appendChild(document.createElement("div").appendChild(register));
    }
}


function openLink() {

}

function editClick(boxNum) {
    alert("clicked edit");
}

function delClick(boxNum) {
    links.splice(boxNum, 1);
    readLinks();
    setupEvents();
}

function adjustScreen() {
    if (viewBreakpoint.matches) {
        view = "list";
    } else {
        view = "desktop";
    }
    adjustNav();
}