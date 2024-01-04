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

            const cont_jobDetails = document.getElementsByClassName('jobs-details__main-content')[0];
            console.log(cont_jobDetails)

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
        let linkedInApplySection = document.getElementsByClassName('mt5')[0];
        let linkedInApplyDiv = linkedInApplySection.getElementsByTagName('div')[0];

        console.log(linkedInApplyDiv);

        // Creation of new static button for CV generation
        let newButton = document.createElement('button');

        // Setting button attributes
        newButton.innerHTML = 'Generate CV';
        newButton.id = 'CVGenButton';
        newButton.classList.add('btn_default--texxt');
        newButton.classList.add('btn--default');
        newButton.type = 'button';

        newButton.onclick = function() {
            console.log("Click Registered.")

            // Defining JSON Data Formatting:
            var outPackage = {
                "IUD": "",
                "TYPE": "gpt",
                "DATA": {
                    "TITLE": "",
                    "COMPANY": "",
                    "JOB_SUM": "",
                    "JOB_RESP": "",
                    "REQ_SKILL": ""
                }
            };
            
            let dashboardDiv = document.getElementsByClassName('jobs-search__job-details--wrapper')[0];
            
            // Getting DATA Information
            outPackage.DATA.COMPANY = document.getElementsByClassName('ember-view link-without-visited-state inline-block t-black')[0]
                                              .innerHTML.replace(/[\r\n\t]/g, "").trim();
            
            outPackage.DATA.TITLE = document.getElementsByClassName('job-details-jobs-unified-top-card__job-title-link')[0]
                                            .innerHTML.replace(/[\r\n\t]/g, "").trim();
            
            console.log(outPackage)
        };

        // Appending the button to beside the Apply button on LinkedIn
        linkedInApplyDiv.appendChild(newButton);
    };
})();


