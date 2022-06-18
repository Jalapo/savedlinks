let links = [];

window.onload = () => {
    getLinks();
    setupEvents();
}

function getLinks(id = 0) {     // gather links from specific .db file
    getFile(id + ".db", "json")
        .then((response) => {
            const userdb = response.links;
            for (let i = 0; i < userdb.length; i++) {
                links.push(userdb[i]);
            }
            // readLinks();
        })

        .catch((error) => {
            console.log("Resolve Error: %s", error);
        });

}

function addLink() {
    urlBar = document.querySelector(".link-input-bar > input");
    if (urlBar.value) {
        links.push({url : urlBar.value});
        console.log(links[-1]);
        console.log(urlBar.value);
        readLinks();
    }
}

function readLinks() {
    // clear bookmarks from view
    let list = document.querySelector("#urlList");
    while (list.firstChild) {list.removeChild(list.firstChild);}

    // display each bookmark in 'links' array
    for (let i = 0; i < links.length; i++) {
        let elm = document.createElement("li");
        let elmTxt = links[i].name ?
            document.createTextNode(links[i].name) : document.createTextNode(links[i].url);
        elm.appendChild(elmTxt);
        elm.classList.add("click");
        elm.addEventListener("click", () => {window.open("https://" + links[i].url);})
        document.querySelector("#list-items").appendChild(elm);
    }
}

function addButton() {  // add button to url box
    const list = document.querySelector("#urlList");
    // list.querySelector
}

function createBookmarkBox() {
    let box = document.createElement("div");

    let urlTextDiv = document.createElement("div");
    let urlTitle = document.createElement("div");
    let urlText = document.createElement("span")

    let editDiv = document.createElement("div");
    let delDiv = document.createElement("div");

    let
}


function setupEvents() {
    document.getElementById("btn").addEventListener("click", (ev) => {
        // delClick();
        alert("test event");
        ev.stopPropagation();
    })
}


function openLink() {
    
}

function delClick() {
        alert("hello");
}