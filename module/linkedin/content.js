// LinkedIn Moduele

// Module Lead - Tim Yang (thryang)
// Contributors - N/A



(() => {
    // Listerner for events and customization to fit specific source
    chrome.runtime.onMessage.addListener((request, sender, response) => {
        console.log('Extension loaded and customized for \"LinkedIn\"');

        const { type } = request;
        console.log(type);
        
        if (type == "NEW") {
            console.log("Extension received NEW Message.")

            const cont_jobDetails = document.getElementsByClassName('jobs-details__main-content')[0];

            // tab loaded is job-posting
            if (cont_jobDetails) { addGenButton() };
        }
    });

    // Adds button for server request
    const addGenButton = () => {
        // Checks that generation button does not yet exist
        const checkGenButton = document.getElementsByClassName('jobs-s-apply')[0];
        if (checkGenButton) return;
        
        // Getting palcement for element button
        let linkedInApplyButton = document.getElementsByClassName('mt5')[0];
        let linkedInApplyButtonDiv = document.getElementsByTagName('div')[0];

        let newButton = document.createElement('button');
        newButton.innerHTML = 'Generate CV';
        newButton.id = 'CVGenButton';
        newButton.classList.add('btn_default--texxt');
        newButton.classList.add('btn--default');

        newButton.type = 'button';

    }
});


