function createBookmarkBox(link) { // creates DOM for bookmark boxes
    let box = document.createElement("div");

    let urlTextDiv = document.createElement("div");
    let urlTitle = document.createElement("div");
    let urlText = document.createElement("div")

    let buttonsDiv = document.createElement("div");
    let editDiv = document.createElement("div");
    let delDiv = document.createElement("div");

    box.classList.add("box","click");
    box.addEventListener("click", () => {
        window.open('http://' + link.url);
    });

    urlTextDiv.classList.add("urlTextBox");
    urlTitle.classList.add("urlTitle");
    urlText.classList.add("click","subtext");
    buttonsDiv.classList.add("boxButtons");
    editDiv.classList.add("editURL");
    delDiv.classList.add("delURL");

    urlTitle.appendChild(document.createTextNode(link.title));
    if (link.title == link.url) {
        urlText.appendChild(document.createTextNode("h"));
        urlText.style.color = "transparent";
        urlTitle.style.marginBottom = "-0.2rem";
    } else {
        urlText.appendChild(document.createTextNode(link.url));
    }
    
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
    

    return box; /* 
    box {
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
                //console.log(xmlhttp.response.links[0]);
            } else {
                reject(xmlhttp.status);
            }
        }
        
        xmlhttp.responseType = type;
        xmlhttp.open("GET", filename, true);
        xmlhttp.send();
    });
}

function clear(obj) { // removes all children from object
    while (obj.firstChild) {
        obj.removeChild(obj.firstChild);
    }
}
