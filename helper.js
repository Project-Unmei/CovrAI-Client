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


async function format_and_send_data(data, server_url="http://127.0.0.1:6970/api/cv/generate"){
    try{
        const response = await fetch(server_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'TESTAPI'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok) {
            throw new Error("Network response was not ok");
        }

        const response_json = await response.json();
        console.log(response_json);
        const encoded_docx = response_json['DATA']['DOCX'];

        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = response_json['DATA']['FILE_NAME'] + ".docx";

        const binary_docx = atob(encoded_docx);
        const byte_docx = new Uint8Array(binary_docx.length);
        for (let i = 0; i < binary_docx.length; i++){
            byte_docx[i] = binary_docx.charCodeAt(i);
        }

        const blob = new Blob([byte_docx], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        const url = URL.createObjectURL(blob);
        
        const downloadResponse = await chrome.runtime.sendMessage({type: "DOWNLOAD",url: url, filename: filename});
        
        console.log(downloadResponse);

    } catch (error){
        console.error('Error: ', error);
    }
}

function format_and_send_data_old(data) {
    // Formatting final HTTP package
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:6970/api/cv/generate";
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

            var blob = new Blob(binaryData);
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: fileName
            });

            //var a = document.createElement("a");
            //a.href = window.URL.createObjectURL(new Blob(binaryData));
            //a.download = fileName;
            //a.click();

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
