let extract = document.getElementById('AutoCV-action-button');
let pin = document.getElementById('AutoCV-pin-button');

changeButton();
let remember = document.getElementById('AutoCV-add-site');
remember.addEventListener('click', async (e) => {
    remember.disabled = true;
    console.log("remembering job site");
    let currentList = [];
    chrome.storage.sync.get('JobSites', (results) => {
        console.log("results are: ", results);
        if (results.JobSites != undefined) {
            console.log("copying array from storage");
            currentList = Array.from(results.JobSites);
            console.log("array copied to", currentList);
        }
        chrome.tabs.query({active: true, currentWindow: true}, async function (tabs){
            const thisDomain = tabs[0].url;
            const match = thisDomain.match(/^https?:\/\/([^/]+)/);
            const thisHostname = match? match[1] : new URL(thisDomain).hostname;
            console.log("this Domain is ", thisHostname);
            console.log("currentList was: ", currentList);
    
            currentList.push(thisHostname);
            console.log("currentList is now: ", currentList);
            await chrome.storage.sync.set({'JobSites': currentList});
            chrome.storage.sync.get('JobSites', (domains) => {
                console.log("domains is now: ", domains);
            });
            remember.disabled = false;
            changeButton();
        });
    });
});
let forget = document.getElementById('AutoCV-del-site');
forget.addEventListener('click', async (e) => {
    forget.disabled = true;
    console.log("forgetting job site");
    chrome.storage.sync.get('JobSites', (results) => {
        let currentList = Array.from(results.JobSites);
        chrome.tabs.query({active: true, currentWindow: true}, async function (tabs){
            const thisDomain = tabs[0].url;
            const match = thisDomain.match(/^https?:\/\/([^/]+)/);
            const thisHostname = match? match[1] : new URL(thisDomain).hostname;
            console.log("this Domain is ", thisHostname);
            let newList = currentList.filter(e => e != thisHostname);
            await chrome.storage.sync.set({'JobSites': newList});
            chrome.storage.sync.get('JobSites', (domains) => {
                console.log("domains is now: ", domains);
            });
            forget.disabled = false;
            changeButton();
        });
    })
});

let Name = document.querySelector("AutoCVUserName");
changeName(Name);

extract.addEventListener('click', (e) => {
    document.getElementById('AutoCV-action-button').innerHTML = "<div class='loader'></div>";
    console.log('extracting from arbitrary page');
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs){
        response = await chrome.tabs.sendMessage(tabs[0].id, { type: 'getContent' }).then((response) =>{
            document.getElementById('AutoCV-action-button').innerHTML = "<grad>Create Cover Letter</grad>";
        });
    });
});


pin.addEventListener('click', (e) => {
    console.log('opening side menu');
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, { type: 'showButton' });
    });
});

async function changeButton(){
    console.log("changingButtons");
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs){
        const thisDomain = tabs[0].url;
        const match = thisDomain.match(/^https?:\/\/([^/]+)/);
        const thisHostname = match? match[1] : new URL(thisDomain).hostname;
        chrome.storage.sync.get('JobSites', (domains) => {
            let isNew = true;
            for(const domain of domains.JobSites){
                console.log("checking domain: ", domain);
                if (thisHostname == domain) {
                    isNew = false
                    console.log("found same domain");
                };
            }

            if (isNew) {
                document.getElementById("AutoCV-add-site").style.display = "inline-block";
                document.getElementById("AutoCV-del-site").style.display = "none";
            } else {
                document.getElementById("AutoCV-del-site").style.display = "inline-block";
                document.getElementById("AutoCV-add-site").style.display = "none";
            }
            
        });
    });
}

async function changeName(el){
    let info = await cookieData();
    console.log("Info: ", info.name);   
    let fullName = info.name;
    let names = fullName.split(' ');
    if (fullName.length >= 25) {
        fullName = names[0] + ' ' + Array.from(names[1])[0] + '.';
        if (fullName.length >= 25) {
            fullName = Array.from(names[0])[0] + '. ' + Array.from(names[1])[0] + '.';
        }
    }
    el.innerHTML = fullName;
}
