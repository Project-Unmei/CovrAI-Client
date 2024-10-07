/*var outPackage = {
    "UID": "",
    "TYPE": "gpt",
    "DATA": {
        "TITLE": "",
        "COMPANY": "",
        "JOB_SUM": "",
        "JOB_RESP": "",
        "REQ_SKILL": ""
    }
};*/


function dateStr() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Function to get ordinal suffix for day
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // Covers 11th, 12th, 13th
        switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
        }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}


const outPackage = {
    "DATA": {
        "USER": {
            "NAME": "",
            "TITLE": "",
            "EMAIL": "",
            "PHONE": "",
            "LOCATION": "",
            "EDUCATION": "",
            "STUDY": "",
            "RESUME": ""
        },
        "JOB": {
            "TITLE": "",
            "COMPANY": "",
            "DESCRIPTION": ""
        },
        "CONFIG": {
            "TEMPLATE": '67035b7370e68c097ab24828',
            "TONE": 2,
            "SKILLS": [],
            "EXPERIENCES": [],
            "DATE": dateStr()
        }
    }
}



if (typeof templateUser !== 'undefined'){
    outPackage.DATA.USER = templateUser;
}

console.log(outPackage);

async function getCookie(url, name){ 
    return await chrome.runtime.sendMessage({type: "GETTOKEN", url: "http://localhost", name: "authorization"});
}

async function generateFromData(data) {
    chrome.runtime.sendMessage({
        type: "GENERATE",
        url: "http://localhost", 
        name: "authorization",
        serverUrl: "http://127.0.0.1:80/api/generate",
        data: data
    }).then((response) => {
        console.log(response);

        const res = response['response'];
        console.log(res);
        const byte_docx = response['byte_docx'];
        const filename = response['filename'];

        const blob = new Blob([byte_docx], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        const url = window.URL.createObjectURL(blob);
        
        chrome.runtime.sendMessage({type: "DOWNLOAD",url: url, filename: filename}).then((downloadResponse) => {
            console.log(downloadResponse);
        });
        
    });
    
            
        
    
    

}

async function format_and_send_data(data, server_url="http://127.0.0.1:80/api/generate"){
    try{
        token = await getCookie()
        console.log("token is ", token);
        const response = await fetch(server_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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
