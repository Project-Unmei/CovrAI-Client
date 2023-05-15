let newSkillForm = document.getElementById('newSkillForm');

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