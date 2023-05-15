chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{

    console.log(`navigated to ${tab.url}`);

    // If the tab is the WaterlooWorks coop page
    if (tab.url.includes("waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings")) {
        chrome.tabs.sendMessage(tabId, { type: 'NEW' });
    }
});