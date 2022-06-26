let links = [];
const viewBreakpoint = window.matchMedia("(max-width: 800px), (max-height: 570px)");
// const thinTab = window.matchMedia("(max-height: 570px)");
let view = "list";

window.onload = () => { // setup
    getLinks();
    setTimeout(initSetup, 100);
    setTimeout(setupEvents, 100);
}

function initSetup() { // initial setup of HTML element events
    urlBar = document.querySelector(".bottomBar input[type=url]");
    addBtn = document.querySelector(".bottomBar button");

    addBtn.addEventListener("click", addLink);
    urlBar.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") addLink();
    });

    urlBar.addEventListener("focus", expandBar);
    urlBar.addEventListener("focusout", collapseBar);

    viewBreakpoint.addEventListener("change", adjustScreen);
    adjustScreen();
}

function setupEvents() { // setup events for dynamic HTML elements
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
    urlBar = document.querySelector(".bottomBar input[type=url]");
    titleBar = document.querySelector(".bottomBar input[type=text]");
    let title = (titleBar.value) ? titleBar.value : urlBar.value;
    if (urlBar.value) {
        links.push({title: title, url : urlBar.value});
        console.log(links[-1]);
        console.log(urlBar.value);
        readLinks();
        setupEvents();
    }
    urlBar.value = titleBar.value = "";
    document.activeElement.blur();
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
    logo = navbar.appendChild(document.createElement("a"));
    logo.classList.add("logo");
    logo.appendChild(document.createTextNode("Safe Links"));
    // navbar.appendChild(document.createElement("a").innerHTML("Safe Links"));
    if (view == "list") {
        let nbExpand = document.createElement("span");
        nbExpand.appendChild(document.createTextNode("≡"));
        navbar.appendChild(document.createElement("div").appendChild(nbExpand));
    } else if (view == "desktop") {
        let login = document.createElement("span");
        login.appendChild(document.createTextNode("Login"));
        let register = document.createElement("span");
        register.appendChild(document.createTextNode("Register"));
        let container = document.createElement("div");
        container.appendChild(document.createElement("div").appendChild(login));
        container.appendChild(document.createElement("div").appendChild(register));
        navbar.appendChild(container);
    }
}


function openLink() {

}

function editClick(boxNum) { // change properties of bookmark (on click)
    alert("clicked edit");
}

function delClick(boxNum) { // deletes box (on click)
    links.splice(boxNum, 1);
    readLinks();
    setupEvents();
}

function adjustScreen() { // changes view of app depending on screen size
    if (viewBreakpoint.matches) {
        view = "list";
    } else {
        view = "desktop";
    }
    adjustNav();
}

function expandBar() { // "expands" bottom URL bar to show URL title input box
    console.log(document.querySelector(".bottomBar").children[0].tagName);
    if (document.querySelector(".bottomBar").children[0].tagName == "DIV") {
        titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "Google";
        titleInput.maxLength = 24;
        titleInput.addEventListener("focusout", collapseBar);
        titleInput.addEventListener("keypress", (ev) => {
            if (ev.key === "Enter") addLink();
        });

        bb = document.querySelector(".bottomBar");
        bb.insertBefore(titleInput, bb.children[0]);
    }
}

function collapseBar() { // "collapses" bottom URL bar and hides URL title input box
    urlBar = document.querySelector(".bottomBar input[type=url]");
    titleBar = document.querySelector(".bottomBar input[type=text]");
    setTimeout(() => {
        if (urlBar.value == "" && titleBar.value == "" && document.activeElement != titleBar && document.activeElement != urlBar) {
            bb = document.querySelector(".bottomBar");
            bb.removeChild(bb.children[0]);
        }
    }, 10);
}