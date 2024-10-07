
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    console.log(`navigated to ${tab.url}`);

    // If the tab is the WaterlooWorks coop page
    if (tab.url.includes("waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings")
            && changeInfo.status === 'complete') {
        console.log("WaterlooWorks Job Positing Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }

    else if (tab.url.includes("linkedin.com/jobs") 
            && changeInfo.status === 'complete') {
        console.log("LinkedIn Job Positing Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }

    else if (tab.url.includes("ca.indeed.com") 
            && changeInfo.status === 'complete') {
        console.log("Indeed Canada Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }

    else {
        console.log("Other Job Website");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }
});

chrome.runtime.onMessage.addListener(function(arg, sender, sendResponse){
    console.log(sender);
    if (arg.type == "DOWNLOAD"){
        console.log("downloading");
        const {type, url, filename} = arg;

        console.log(arg);
        console.log(type, url, filename);

        chrome.downloads.download({
            url: url,
            filename: filename
        });

        sendResponse("Success");
    } else if (arg.type == "GETTOKEN") {
        const {type, url, name} = arg;
        console.log(`getting cookie for url ${url}; name ${name}`);
        token = chrome.cookies.get({
            'url': url,
            'name': name
        }, function (token) {
            console.log("backend got token: ", token);
            sendResponse(token.value);
        });
    } else if (arg.type == "GENERATE") {
        const {type, url, name, serverUrl, data} = arg;
        token = chrome.cookies.get({
            'url': url,
            'name': name
        }, async function (token) {
            console.log("backend got token: ", token);
            const response = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value
                },
                body: JSON.stringify(data)
            });

            //console.log(res)
            //if(!response.ok) {
            //    throw new Error("Network response was not ok");
            //}
            async function getBlobUrl(blob) {
                const url = chrome.runtime.getURL('offscreen.html');
                try {
                  await chrome.offscreen.createDocument({
                    url,
                    reasons: ['BLOBS'],
                    justification: 'MV3 requirement',
                  });
                } catch (err) {
                  if (!err.message.startsWith('Only a single offscreen')) throw err;
                }
                const client = (await clients.matchAll({includeUncontrolled: true}))
                  .find(c => c.url === url);
                const mc = new MessageChannel();
                client.postMessage(blob, [mc.port2]);
                const res = await new Promise(cb => (mc.port1.onmessage = cb));
                return res.data;
              }

            const resJson = await response.json();
            console.log("response json is ", resJson);
            const encoded_docx = resJson.DATA.DOCX;
            
            const contentDisposition = response.headers.get('Content-Disposition');
            const filename = resJson['DATA']['FILE_NAME'] + ".docx";

            const binary_docx = atob(encoded_docx);
            const byte_docx = new Uint8Array(binary_docx.length);
            for (let i = 0; i < binary_docx.length; i++){
                byte_docx[i] = binary_docx.charCodeAt(i);
            }

            const blob = new Blob([byte_docx], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
            const blobUrl = await getBlobUrl(blob);
            //const url = window.URL.createObjectURL(blob);
            chrome.downloads.download({
                url: blobUrl,
                filename: filename});

            
            sendResponse({
                response: "Blob created"
            });

        });
    }
})