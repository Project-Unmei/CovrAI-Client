/*let newSkillForm = document.getElementById('newSkillForm');

newSkillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(document.getElementById('clearSkill').checked){
        chrome.storage.local.set({skills: []}, () => {
            console.log('skills cleared');
        });
    }
    if(document.getElementById('newSkill').value != '') {
        let newSkill  = document.getElementById('newSkill').value;
        console.log(newSkill);
        document.getElementById('newSkill').value = '';
    
        chrome.storage.local.get({skills: []}, (result) => {
            
            if (result.skills.includes(newSkill)) return;
    
            result.skills.push(newSkill);
    
            console.log(result.skills);
    
            chrome.storage.local.set({skills: result.skills}, () => {
                console.log('skills saved');
            });
    
        });
    }
        
    
});

let dpKForm = document.getElementById('dpKButton');

dpKForm.addEventListener('click', (e) => {
    console.log("clicked");
    e.preventDefault();
    let dpKval = document.getElementById("dpK").value;
    chrome.storage.sync.set({dpK: dpKval}).then((result) => {
        console.log("dpset");
        document.getElementById("dpK").val("");
    });
})
*/

let extract = document.getElementById('AutoCV-action-button');
let pin = document.getElementById('AutoCV-pin-button');

extract.addEventListener('click', (e) => {
    console.log('extracting from arbitrary page');
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs){
        response = await chrome.tabs.sendMessage(tabs[0].id, { type: 'getContent' });
    });
})

pin.addEventListener('click', (e) => {
    console.log('opening side menu');
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, { type: 'showButton' });
    });
})

/*
let test = document.getElementById('test');
extract.addEventListener('click', async (e) => {
    console.log("Test button clicked");
    response = await chrome.runtime.sendMessage({type: "GETCOOKIE", url: "http://localhost", name: "authorization"})
    console.log(response);
    //console.log(getCookie('userFormData'));
});
*/
