chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    console.log(`navigated to ${tab.url}`);

    // If the tab is the WaterlooWorks coop page
    if (tab.url.includes("waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings")) {
        console.log("WaterlooWorks Job Positing Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }

    if (tab.url.includes("linkedin.com/jobs")) {
        console.log("LinkedIn Job Positing Page");
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }
});
