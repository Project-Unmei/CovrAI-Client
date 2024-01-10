chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    console.log(`navigated to ${tab.url}`);

    // If the tab is the WaterlooWorks coop page
    if (tab.url.includes("waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings")
            && changeInfo.status === 'complete') {
        console.log("WaterlooWorks Job Positing Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }

    if (tab.url.includes("linkedin.com/jobs") 
            && changeInfo.status === 'complete') {
        console.log("LinkedIn Job Positing Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }

    if (tab.url.includes("ca.indeed.com") 
            && changeInfo.status === 'complete') {
        console.log("Indeed Canada Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }
});
