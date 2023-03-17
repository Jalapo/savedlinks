
        // FILES \\
function getLinksFromDB(id = "00", array = [], callback = null) {     // gather links from specific .db file
    getFile(id, "json")
        .then((response) => {
            // console.log(response.links);
            let linksString = response.links; // gets json string from response 
            let userdb = linksString;
            for (let i = 0; i < userdb.length; i++) {
                array.push(userdb[i]);
                // console.log(array);
            }
            if (callback !== null) {
                callback();
            }
        })

        .catch((error) => {
            console.log("Resolve Error: %s", error);
        });

}

async function getFile(key, type="json", finish) { // fetches file from node server
    let location = `${domain}api/links/`;  // defined in initvars.js

    let userdata = await fetch(`${location}${key}`, {method:"GET"});
    // if key does not exist, return user to default page
    if (userdata.status == 409) {setTimeout(reactRender("default"), 30); throw null;}
    // create an empty string and push all string buffers inputs (each character) into it
    let s = '';
    return new Promise((resolve,rej)=>{
        userdata.json().then( (fulfilled) => {
            // return file data
            resolve(fulfilled);
        });
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
    let box = $(`<div class='box click' onclick="window.open('http://${link.url}')">
        <div class='boxButtons'>
            <div class="editURL"><button>✎</button></div>
            <div class="delURL"><button>X</button></div>
        </div>
        <div class="urlTextBox">
            <div class="urlTitle">${link.title}</div>
            <div class="click subtext">  </div>
        </div>
    </div>`);

    // Are the title and URL the same? (shared values when title is not given by User)
    if (link.title == link.url) {
        box.find(".subtext").text("h");
        box.find(".subtext").css("color", "transparent");
        box.find(".urlTitle").css("margin-bottom", "-0.2rem");
        // urlText.appendChild(document.createTextNode("h")); // if so, create invisible subtext element for CSS responsive size
        // urlText.style.color = "transparent";
    } else {                                               // otherwise, input the URL normally
        box.find(".subtext").text(link.url);
        // urlText.appendChild(document.createTextNode(link.url));
    }

    
    return box;
}

/*
urlTextBox {
        urlTitle {link.name}
        urlText {link.url}
    }
buttonsDiv {
        editDiv {class: "editURL"}
        delDiv {class: "delURL"}
}
*/


function changePage(page) {
    // main, nouser, init
    let script = $(`<script type='text/javascript'>  </script>`);
    let styles = $(`<link rel='stylesheet' />`);


    switch (page) {
        case 'main':
            
            break;
        case 'nouser':
        case 'init':
    }
}