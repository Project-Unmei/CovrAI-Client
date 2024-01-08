// LinkedIn Moduele

// Module Lead - Tim Yang (thryang)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "LinkedIn";

(() => {
    // Listerner for events and customization to fit specific source
    chrome.runtime.onMessage.addListener((request, sender, response) => {
        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);
        const { type } = request;

        
        if (type === "NEW") {
            console.log(`${extName} Extension received NEW Message.`);
            
            // Checking if the job details section exists
            const cont_jobDetails = document.getElementsByClassName('jobs-details__main-content')[0];

            // tab loaded is job-posting
            if (cont_jobDetails) {
                console.log(`${extName} Job Details Section Found`); 
                addGenButton();
            };
        }
    });

    // Adds button for server request
    const addGenButton = () => {
        // Checks that generation button does not yet exist
        const checkGenButton = document.getElementById('CVGenButton');
        if (checkGenButton) return;

        // Getting palcement for element button
        var linkedInApplySection = document.getElementsByClassName('mt5')[0];
        var linkedInApplyDiv = linkedInApplySection.children[0];

        // Creation of new static button for CV generation
        let newButton = document.createElement('button');

        // Setting button attributes
        newButton.innerHTML = 'Generate CV';
        newButton.classList.add('btn_default--texxt');
        newButton.classList.add('btn--default');
        newButton.type = 'button';

        newButton.onclick = function() {
            console.log(`${extName} CV Generation Click Registered.`);

            // Defining JSON Data Formatting:
            var outPackage = {
                "UID": "",
                "TYPE": "gpt",
                "DATA": {
                    "TITLE": "",
                    "COMPANY": "",
                    "JOB_SUM": "",
                    "JOB_RESP": "",
                    "REQ_SKILL": ""
                }
            };
            
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

        // Appending the button to beside the Apply button on LinkedIn
        // Check if linkedInApplyDiv exists        
        try {
            newButton.id = 'CVGenButton';
            linkedInApplyDiv.appendChild(newButton);
        } catch( err ) {
            // Bugs towards newly generated pages, as obtaining the child div of mt5 is not possible
            // Sepcifically the HTMLCollection is empty but has content somehow, tempfix implemented
            console.warn(`${extName} Bug: Temporary Fix for Button Placement Utilized.`);
            newButton.id = 'CVGenButton-OnReload';
            linkedInApplySection.appendChild(newButton);
        };
    };
})();


