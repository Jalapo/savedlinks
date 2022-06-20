function createBookmarkBox(link) {
    let box = document.createElement("div");

    let urlTextDiv = document.createElement("div");
    let urlTitle = document.createElement("div");
    let urlText = document.createElement("span")

    let buttonsDiv = document.createElement("div");
    let editDiv = document.createElement("div");
    let delDiv = document.createElement("div");

    box.classList.add("box","click");
    box.addEventListener("click", () => {
        window.open('http://' + link.url);
    });

    urlTextDiv.classList.add("urlTextBox");
    urlTitle.classList.add("urlTitle");
    urlText.classList.add("click");
    buttonsDiv.classList.add("boxButtons");
    editDiv.classList.add("editURL");
    delDiv.classList.add("delURL");

    urlTitle.appendChild(document.createTextNode(link.name));
    urlText.appendChild(document.createTextNode(link.url));
    urlTextDiv.appendChild(urlTitle);
    urlTextDiv.appendChild(urlText);

    editDiv.appendChild(document.createElement("button"));
    editDiv.querySelector(".editURL > button").appendChild(document.createTextNode("✎"));
    delDiv.appendChild(document.createElement("button"));
    delDiv.querySelector(".delURL > button").appendChild(document.createTextNode("X"));

    buttonsDiv.appendChild(editDiv);
    buttonsDiv.appendChild(delDiv);
    box.appendChild(urlTextDiv);
    box.appendChild(buttonsDiv);

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

function getFile(filename, type="text") {
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