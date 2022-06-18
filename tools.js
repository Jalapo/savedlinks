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

/*
function getFile(filename, type="text") {
    fileReq = XMLReq(filename, type);
    fileReq.onload = () => {
        if (fileReq.readyState === 4 && fileReq.status === 200) {
            //alert(fileReq.responseText);
        }
    }
}

*/