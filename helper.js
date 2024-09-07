var outPackage = {
    "UID": "",
    "TYPE": "gpt",
    "DATA": {
        "TITLE": "",
        "COMPANY": "",
        "JOB_SUM": "",
        "JOB_RESP": "",
        "REQ_SKILL": ""
    }
};


function format_and_send_data(data) {
    // Formatting final HTTP package
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:6969/api/cv/generate";
    let response;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("X-API-KEY", "TESTAPIKEY");
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = xhr.responseText;

            var binaryData = [];
            binaryData.push(response);

            var fileName = `${data.UID}.docx`;
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(new Blob(binaryData));
            a.download = fileName;
            a.click();

        }
    };

    // Sending JSON package to server
    xhr.send(JSON.stringify(data));
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
