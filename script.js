let links = [];
// Break off point for tablets
// const viewBreakpoint = window.matchMedia("(max-width: 800px), (max-height: 570px)");

// Break off points for new view with 2 elements
const viewBreakpoint = window.matchMedia("(max-width: 890px), (max-height: 570px)");
// const thinTab = window.matchMedia("(max-height: 570px)");
let view = "list";
let id;
let navbar;
let list;
let editBtns;
let delBtns;
let bb;
let urlBar;
let titleBar;
let addBtn;

window.onload = () => { // setup
    // localStorage.clear()
    getLinks();
    readLinks();
    setTimeout(initSetup, 100);
    setTimeout(setupEvents, 100);
}

function getLinks() { // get links from localStorage if available, otherwise obtain from DB file
    if (localStorage.getItem(`myID`)) { /* 
            check if myID is available (done), then after check if myID has a default value
            if false (user's first visit) --> give myID a default value
            if true (user visited before but has not registered) --> nothing
            after: feed unregistered "Google-style" page with bottom button to reveal "Sign up" and "Login" for mobile
                                                         with default header for "Signup" and "Login" buttons for desktop
                                        */ 
        id = localStorage.getItem(`myID`);
        links = JSON.parse(localStorage.getItem(`myLinks#${id}`));
        console.log(localStorage.getItem(`local user id: ${myID}`)); // DELETE FOR PRODUCTION --------!!!!!!
    } else { // this needs to change later to provide a different page layout (React?) so the user can login or register
        id = 0;
        getLinksFromDB(id);
        setTimeout(saveToLocal, 1000);
    }
}



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

function setupEvents() { // setup events for dynamic HTML elements
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
        links.push({title: title, url : urlBar.value});
        readLinks('new');
        setupEvents();
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
    for (let i = 0; i < links.length; i++) {
        box = createBookmarkBox(links[i]);
        document.querySelector(".links-container").appendChild(box);
        if (i == (links.length - 1) && state == 'new') box.style.transform = `scale(0.0)`;

        if (i == (links.length - 1) && state == 'new') {
            box.style.transition = `all .5s ease-in-out`;
            setTimeout(() => {box.style.transform = `scale(1.0)`;}, 50);
            setTimeout(() => {box.style.transition = `none`;}, 1000);
        }
    }
}

function openLink() {

}



function editClick(boxNum) { // change properties of bookmark (on click)
    alert("clicked edit");
}

function delClick(boxNum) { // deletes box (on click)
    links.splice(boxNum, 1); // remove from array
    readLinks(); // update screen
    setupEvents(); // reconfigure events
    saveToAll(); // save changes
}

function adjustScreen() { // changes view of app depending on screen size
    queryItems();
    //clear navbar and add default elements (logo)
    clear(navbar);
    logo = navbar.appendChild(document.createElement("a"));
    logo.classList.add("logo");
    logo.appendChild(document.createTextNode("Safe Links"));


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
    // saveToCloud(); 
}

function saveToLocal() { // saves current bookmarks to localStorage
    localStorage.setItem(`myID`, id);
    localStorage.setItem(`myLinks#${id}`, JSON.stringify(links));
}

function saveToCloud() {
    // at some point, this should block spam inputs:
    // update a global dummy variable [cloudReqs] by +1, expected value at start is 0
    // setTimeout for 5s-> check if variable value has persisted (cloudReqs == 1)
    // - if true (unchanged): call 'updateDB()' to
}

function updateDB() {

}