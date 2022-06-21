let links = [];

window.onload = () => {
    getLinks();
    setTimeout(setupEvents, 100);
    // setupEvents();
}

function setupEvents() {
    editBtns = document.querySelectorAll(".editURL > button");
    delBtns = document.querySelectorAll(".delURL > button");
    urlBar = document.querySelector(".link-input-bar > input");
    addBtn = document.querySelector(".link-input-bar > button");

    addBtn.addEventListener("click", addLink);
    urlBar.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") addLink();
    })

    for (let i = 0; i < delBtns.length; i++) {
        delBtns[i].addEventListener("click", (ev) =>{
            delClick(i);
            ev.stopPropagation();
        })
    }

    for (let i = 0; i < editBtns.length; i++) {
        console.log(editBtns[i]);
        editBtns[i].addEventListener("click", (ev) =>{
            editClick(i);
            ev.stopPropagation();
        })
    }
}

function getLinks(id = 0) {     // gather links from specific .db file
    getFile(id + ".db", "json")
        .then((response) => {
            const userdb = response.links;
            for (let i = 0; i < userdb.length; i++) {
                links.push(userdb[i]);
            }
             readLinks();
        })

        .catch((error) => {
            console.log("Resolve Error: %s", error);
        });

}

function addLink() { // functionality of add link button
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
    let list = document.querySelector(".links-container");
    while (list.firstChild) {list.removeChild(list.firstChild);}

    // display each bookmark in 'links' array
    for (let i = 0; i < links.length; i++) {
        box = createBookmarkBox(links[i]);
        document.querySelector(".links-container").appendChild(box);
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