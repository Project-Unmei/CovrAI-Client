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
        "JOB": {
            "TITLE": "",
            "COMPANY": "",
            "DESCRIPTION": ""
        }
    }
}


/*
if (typeof templateUser !== 'undefined'){
    outPackage.DATA.USER = templateUser;
}*/

console.log(outPackage);

async function getCookie(name = "authorization", url = "http://www.covr-ai.com"){ 
    console.log(`fetching cookie from url: ${url}, name: ${name}`);
    return await chrome.runtime.sendMessage({type: "GETCOOKIE", url: url, name: name});
}

async function generateFromData(data) {
    const response = await chrome.runtime.sendMessage({
        type: "GENERATE",
        url: "https://www.covr-ai.com", 
        name: "authorization",
        serverUrl: "https://www.covr-ai.com/ext/generate",
        data: data
    });
    console.log("GENERATE response is: ",response);

    return await response;
}

async function generateFromHTML(data) {
    const response = await chrome.runtime.sendMessage({
        type: "GETINFO",
        url: "https://www.covr-ai.com", 
        name: "authorization",
        serverUrl: "https://www.covr-ai.com/ext/extract/job_info",
        data: data
    });
    console.log("response from generateFromHTML", response);

    const jobTitle = await response.DATA.JOB.TITLE;
    const jobCompany= await response.DATA.JOB.COMPANY;
    const jobDescription = await response.DATA.JOB.DESCRIPTION;

    const package = outPackage;
    package.DATA.JOB.COMPANY = await jobCompany;
    package.DATA.JOB.TITLE = await jobTitle;
    package.DATA.JOB.DESCRIPTION = await jobDescription;

    console.log(`out package becomes:`, outPackage);
    
    const newResponse =  await generateFromData(await package);
    return newResponse;
}

async function covrAIFetch(data, method, serverUrl, callback = (res)=>{}){
    try{
        token = await getCookie(name = "authorization", url = "www.covr-ai.com");
        console.log("token is", token);
        const response = await fetch(serverUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token.value
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if(response.ok){
                //console.log(response.json());
                //callback(response);
                return response.json();
            }
        }).then((data) =>{
            console.log(data);
            console.log(data);
            callback(data);
            return data;
        });
        
    } catch (error) {
        console.error('Error', error);
    }
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
