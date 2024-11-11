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
            waitForElm('.mt5').then((elm) => {
                console.log(`${extName} Extension is ready.`);
                addGenButton();
            });
        }
    });

    // Adds button for server request
    const addGenButton = () => {
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

            var thisOutPackage = outPackage;
            
            let urlArray = window.location.href.split("=");
            thisOutPackage.UID = urlArray[urlArray.length - 1];

            let dashboardDiv = document.getElementsByClassName('jobs-search__job-details--wrapper')[0];
            

            // Obtaining Company Name
            thisOutPackage.DATA.JOB.COMPANY = document.getElementsByClassName('ember-view link-without-visited-state inline-block t-black')[0]
                                              .innerHTML.replace(/[\r\n\t]/g, "").trim();
            
            // Obtaining Job Title
            thisOutPackage.DATA.JOB.TITLE = document.getElementsByClassName('job-details-jobs-unified-top-card__job-title-link')[0]
                                            .innerHTML.replace(/[\r\n\t]/g, "").trim().split(" - ")[0];

            // Obtaining Job Summary
            let jobSummaryDiv = document.getElementsByClassName('jobs-box__html-content jobs-description-content__text t-14 t-normal jobs-description-content__text--stretch')[0]
                                        .getElementsByTagName('span')[0];
            thisOutPackage.DATA.JOB.SUMMARY = jobSummaryDiv.textContent.replace(/[\r\n\t]/g, "").trim();

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
            //outPackage.DATA.REQ_SKILL = skillList.join(", ");

            console.log(outPackage);
            format_and_send_data(outPackage);
        };


        // Remove all previous instances of the button
        //let prevButtonOnReload = document.getElementById('CVGenButton-OnReload');
        //if (prevButtonOnReload) prevButtonOnReload.remove();
        let prevButton = document.getElementById('Rizzshun-Button');
        if (prevButton) prevButton.remove();

        newButton.id = 'Rizzshun-Button';
        linkedInApplySection.appendChild(newButton);
    };
})();


