        // FILES \\
function getLinksFromDB(id = 0) {     // gather links from specific .db file
    getFile(id + ".db", "json")
        .then((response) => {
            const userdb = response.links;
            for (let i = 0; i < userdb.length; i++) {
                links.push(userdb[i]);
            }
        })

        .catch((error) => {
            console.log("Resolve Error: %s", error);
        });

}

function getFile(filename, type="text") { // fetches file
    return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();

        xmlhttp.onload = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                resolve(xmlhttp.response);
            } else {
                reject(xmlhttp.status);
            }
        }
        
        xmlhttp.responseType = type;
        xmlhttp.open("GET", filename, true);
        xmlhttp.send();
    });
}

            //  BOOKMARK  \\
function clear(obj) { // removes all children from object
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
}

function queryItems() {
    navbar = document.querySelector(".navbar") ? document.querySelector(".navbar") : null;
    list = document.querySelector(".links-container") ? document.querySelector(".links-container") : null;
    editBtns = document.querySelector(".links-container .editURL > button") ? list.querySelectorAll(".editURL > button") : null;
    delBtns = document.querySelector(".links-container .delURL > button") ? list.querySelectorAll(".delURL > button") : null;
    bb = document.querySelector(".bottomBar") ? document.querySelector(".bottomBar") : null;
    urlBar = document.querySelector(".bottomBar input[type=url]") ? bb.querySelector("input[type=url]") : null;
    titleBar = document.querySelector(".bottomBar input[type=text]") ? bb.querySelector("input[type=text]") : null;
    addBtn = document.querySelector(".bottomBar button") ? bb.querySelector("button") : null;
}

function createBookmarkBox(link) { // creates DOM for bookmark boxes
    // create and define elements
    let box = document.createElement("div");

    let urlTextDiv = document.createElement("div");
    let urlTitle = document.createElement("div");
    let urlText = document.createElement("div")

    let buttonsDiv = document.createElement("div");
    let editDiv = document.createElement("div");
    let delDiv = document.createElement("div");

    // box click event
    box.classList.add("box","click");
    box.addEventListener("click", () => {
        window.open('http://' + link.url);
    });

    // apply classes
    urlTextDiv.classList.add("urlTextBox");
    urlTitle.classList.add("urlTitle");
    urlText.classList.add("click","subtext");
    buttonsDiv.classList.add("boxButtons");
    editDiv.classList.add("editURL");
    delDiv.classList.add("delURL");

    // Are the title and URL the same? (shared values when title is not given by User)
    if (link.title == link.url) { 
        urlText.appendChild(document.createTextNode("h")); // if so, create invisible text element for CSS responsive size
        urlText.style.color = "transparent";
        urlTitle.style.marginBottom = "-0.2rem"; 
    } else {                                               // otherwise, input the URl normally
        urlText.appendChild(document.createTextNode(link.url));
    }

    // construct DOM
    urlTitle.appendChild(document.createTextNode(link.title));
    urlTextDiv.appendChild(urlTitle);
    urlTextDiv.appendChild(urlText);

    editDiv.appendChild(document.createElement("button"));
    editDiv.querySelector(".editURL > button").appendChild(document.createTextNode("✎"));
    delDiv.appendChild(document.createElement("button"));
    delDiv.querySelector(".delURL > button").appendChild(document.createTextNode("X"));

    buttonsDiv.appendChild(editDiv);
    buttonsDiv.appendChild(delDiv);
    box.appendChild(buttonsDiv);
    box.appendChild(urlTextDiv);
    

    return box; /* {
        urlTextDiv {
            urlTitle {link.name}
            urlText {link.url}
        }
        buttonsDiv {
            editDiv {class: "editURL"}
            delDiv {class: "delURL"}
        }
    }
                */
}