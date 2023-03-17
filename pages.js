const root = ReactDOM.createRoot(document.getElementById("root"));
const css = document.getElementById("css");
const head = document.getElementsByTagName("head")[0];
let loginPromptAction = 0; //  1 = login, 2 = register

window.addEventListener("DOMContentLoaded", () => { // setup
    // get links from localStorage if available, otherwise obtain from DB file 
    // if no authKey, redirect to nouser page
    if (localStorage.getItem(`authKey`) == null) reactRender("default");
    else {             
        // pull id from localStorage
        let key = localStorage.getItem(`authKey`);

        // force reset authkey if contains invalid chars (id should only contain numbers or letters)
        if (/^\w+$/i.test(key) ==  false || key == 'Conflict') {
            console.log(key);
            localStorage.clear();
            sessionStorage.clear();
            // redirect to nouser page
            reactRender("default");
        }
        

        // check if key is valid on server, clear local data if not
        fetch(`${domain}api/links/${key}`, {method:"GET"}).then(r=>{
            if (r.status == 409) {
                sessionStorage.clear();
                localStorage.clear();
                reactRender("default");
            } else {
                // check if links are in sessionStorage, get from cloud if not present, else use session links
                let tempLinks = JSON.parse(sessionStorage.getItem("links"));
                if (tempLinks == null) getLinksFromDB(key, userLinks, ()=>{reactRender("loggedin");});
                else {
                    userLinks = tempLinks;
                    reactRender("loggedin");
                }
            }
        });
    }
});

function reactRender(page) {
    document.querySelector("head>#js").remove();
    let newJS;
    let scriptSrc;
    switch (page) {
        case "default": 
            css.href = "./src/nouser.css";
            root.render(React.createElement(Default, null));
            newJS = document.createElement("script");
            newJS.id = "js";

            scriptSrc = document.createAttribute("src");
            scriptSrc.value = "./nouser.js";

            newJS.setAttributeNode(scriptSrc);
            head.appendChild(newJS);
        break;
        case "loggedin":
            css.href = "./src/styles.css";
            root.render(React.createElement(App, null)); 
            newJS = document.createElement("script");
            newJS.id = "js";

            scriptSrc = document.createAttribute("src");
            scriptSrc.value = "./script.js";

            newJS.setAttributeNode(scriptSrc);
            head.appendChild(newJS);
        break;
        case "guest":
            css.href = "./src/styles.css";
            root.render(React.createElement(GuestApp, null)); 
            newJS = document.createElement("script");
            newJS.id = "js";

            scriptSrc = document.createAttribute("src");
            scriptSrc.value = "./script.js";

            newJS.setAttributeNode(scriptSrc);
            head.appendChild(newJS);
        break;
    }
}

function Default() {
    return React.createElement("div", {id:"app"},
        React.createElement("nav",{className:"navbar"},
            React.createElement("div",null,
                // change this to later support adaptiveness
                React.createElement("span",{className:"no-sel"},"Login"),
                React.createElement("span",{className:"no-sel"},"Register")
            )
        ),

        React.createElement("div",{className:"loginPrompt hidden"},
            React.createElement("div",{className:"top-bar"},
                React.createElement("span",{id:"close-btn", onClick:()=>{promptLogin(0)}},"<"),
                React.createElement("a",{className:"logo"},React.createElement("span",null,"Safe Links"))
            ),
            React.createElement("span",{className:"promptTitle"},"Text Area"),
            React.createElement("input",{type:"text", placeholder:"Username", maxlength:16}),
            React.createElement("input",{type:"password", placeholder:"Password"}),
            React.createElement("button",null,"Sign In")
        ),

        React.createElement("div",{className:"bottomBar"},
            React.createElement("div",{className:"flex-container"},
                React.createElement("div",{className:"flex-container"},
                    React.createElement("a",{className:"logo"},React.createElement("span",null,"Safe Links")),
                    React.createElement("input",{type:"url", placeholder:"www.google.com"})   
                ),
                React.createElement("button",null,"+")
            )
        ),

        React.createElement("div",{className:"popup"},
            React.createElement("div",null,"First time using Safe Links?"),
            React.createElement("div",{className:"buttons-container"},
                React.createElement("button",null,"✓"),
                React.createElement("button",null,"X")
            )
        )
    )
}

function App() {
    return React.createElement("div", {id:"app"},
        React.createElement("nav",{className:"navbar"},
            React.createElement("a",{className:"logo"},"Safe Links",
                React.createElement("div",{id:"cover"})
            ),
            React.createElement("span",{className:"profile"},`Hello, ${localStorage.getItem("user")}`), // 16 char username limit
        ),
        React.createElement("div",{className:"links-container"}),
        React.createElement("div",{className:"bottomBar"},
            React.createElement("div",{className:"flex-container"},
                React.createElement("input",{type:"url", placeholder:"www.google.com"}),
                React.createElement("button",null,"+")
            )
        )
    )
}