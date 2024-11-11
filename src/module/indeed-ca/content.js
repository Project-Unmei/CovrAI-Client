// LinkedIn Moduele

// Module Lead - Tim Yang (thryang)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "Indeed Canada";

(() => {
    // Listerner for events and customization to fit specific source
    chrome.runtime.onMessage.addListener((request, sender, response) => {
        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);
        const { type } = request;

        
        if (type === "NEW") {
            console.log(`${extName} Extension received NEW Message.`);
            
            // Checking if the job details section exists
            waitForElm('#jobsearch-ViewJobButtons-container').then((elm) => {
                console.log(`${extName} Extension is ready.`);
                addGenButton();
            });
        }
    });

    // Adds button for server request
    const addGenButton = () => {
        // Getting palcement for element button
        var applyDiv = document.getElementById('jobsearch-ViewJobButtons-container');

        // Creation of new static button for CV generation
        let newButton = document.createElement('button');

        // Setting button attributes
        newButton.innerHTML = 'Generate CV';
        newButton.id = 'Risshun-Button';
        newButton.classList.add('btn_default--text');
        newButton.classList.add('btn--default');
        newButton.type = 'button';

        newButton.onclick = function() {
            console.log(`${extName} CV Generation Click Registered.`);
            
            let urlArray = window.location.href.split("=");
            outPackage.UID = urlArray[urlArray.length - 1];

            let dashboardDiv = document.getElementsByClassName('jobs-search__job-details--wrapper')[0];
            
            // Obtaining Company Name
            outPackage.DATA.COMPANY = document.getElementsByClassName('ember-view link-without-visited-state inline-block t-black')[0]
                                              .innerHTML.replace(/[\r\n\t]/g, "").trim();
            
            // Obtaining Job Title
            outPackage.DATA.TITLE = document.getElementsByClassName('job-details-jobs-unified-top-card__job-title-link')[0]
                                            .innerHTML.replace(/[\r\n\t]/g, "").trim().split(" - ")[0];

            // Obtaining Job Summary
            let jobSummaryDiv = document.getElementsByClassName('jobs-box__html-content jobs-description-content__text t-14 t-normal jobs-description-content__text--stretch')[0]
                                        .getElementsByTagName('span')[0];
            outPackage.DATA.JOB_SUM = jobSummaryDiv.textContent.replace(/[\r\n\t]/g, "").trim();

            // Obtaining Job Skills
            let skillDiv = document.getElementsByClassName('app-aware-link  job-details-how-you-match__skills-item-subtitle t-14 overflow-hidden');
            let skillList = [];
            for (var i = 0; i < skillDiv.length; i++) {
                // Deliminating by comma and "and"
                skillList.push(skillDiv[i].innerHTML.split(/, and |, | and /));
            };
            // When all skills match your portoflio
            let addSkillDiv = document.getElementsByClassName('app-aware-link  job-details-how-you-match__skills-section-descriptive-skill t-14')
            for (var i = 0; i < addSkillDiv.length; i++) {
                // Deliminating by comma and "and"
                skillList.push(addSkillDiv[i].innerHTML.split(/, and |, | and /));
            };
            outPackage.DATA.REQ_SKILL = skillList.join(", ");

            console.log(outPackage);
            format_and_send_data(outPackage);
        };


        // Remove all previous instances of the button
        let prevButton = document.getElementById('CVGenButton-OnReload');
        if (prevButton) prevButton.remove();

        // Adds the completed button to applyDiv
        applyDiv.appendChild(newButton);
        console.log(`${extName} Risshun Button Added`)
    };
})();


