// Others Module

// Module Lead  - Leo Chai (TheLeoChai)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "Others";

function containsKeyword(content, keywords) {
    return keywords.some(keyword => content.includes(keyword));
}




(() => {
    chrome.runtime.onMessage.addListener((request, sender, response) => {

        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);
        const { type } = request;


        if (type === "NEW") {
            console.log(`${extName} Extension received NEW Message.`);
            const keywords = [
                "job search",
                "career",
                "employment",
                "job listings",
                "job board",
                "job postings",
                "job openings",
                "resume",
                "CV",
                "job application",
                "job opportunities",
                "career development",
                "job market",
                "job seeker",
                "job hunt",
                "job vacancies",
                "career advice",
                "job alert",
                "apply now",
                "recruitment",
                "staffing",
                "headhunter",
                "job fair"
            ];
            const webContent = document.documentElement.innerText;
            const hasKeywords = containsKeyword(webContent, keywords);
            
            console.log("running script AUTOCV");

            // tab loaded is job-posting-list
            if (hasKeywords) {
                console.log('is a job posting website');
                addPrompt();
            }



        }
    });

    const sendExtracted = () => {

        console.log("sending extracted");
    
        data = {"type": 2,
            "content": document.body.innerText};
    
        format_and_send_data(data);
    }
    
    const sendExtractedOld = () => {

        chrome.storage.sync.get("dpK", function(dpK){
            fetch("https://api.openai.com/v1/chat/completions", {
               method: "POST",
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dpK}`
               },
               body: JSON.stringify({
                "model": "gpt-4o-mini",
                "messages": [
                    {
                        "role": "system",
                        "content": `You generate jsons by extracting key information from job postings provided by the user.
                        The json follows the following template:{
                        "TITLE": "",
                        "COMPANY": "",
                        "JOB_SUM": "",
                        "JOB_RESP": "",
                        "JOB_SKILL": ""
                    },`
                    },
                    {
                        "role": "user",
                        "content": document.body.innerText
                    }
                ]
               })
            }).then(r=>format_and_send_data(r));
        });
    }

    const addPrompt = () => {
        console.log("creating prompt");
        // Create the main container
        console.log(document.getElementById("prompt-container"));
        if (document.getElementById("prompt-container") != null) return;

        const promptContainer = document.createElement('div');
        promptContainer.id = 'prompt-container';
        promptContainer.innerHTML = `
        <div id="AutoCV-prompt-content" class="AutoCV-not-pinned">
            <button class="AutoCV" id="AutoCV-pin-button">Pin</button>
            <h1 class="AutoCV">CoverAI Job Posting Extractor</h1>
            <button class="AutoCV" id="AutoCV-action-button">Extract</button>
            <button class="AutoCV" id="AutoCV-delete-button">X</button>
            <div class="tooltip AutoCV">
                <div class="tooltip-content AutoCV">
                    <p class="AutoCV">This button extracts job postings from the provided input.</p>
                    <button class="tooltip-button AutoCV">Learn More</button>
                </div>
            </div>
        </div>
        `;
    
        // Style the container and elements
        const style = document.createElement('style');
        style.innerHTML = `
            
            #AutoCV-prompt-content{
                width: 320px;
                background-color: #fefefe;
                position: fixed;
                top: 0px;
                right: 0px;
                margin-right: 32px;
                margin-top: 16px;
                z-index: 9999999;
                transition: transform 0.5s;
                transition-timing-function: ease-in-out;
                border-radius: 12px;
                padding: 6px 8px 12px 8px;
            }

            .AutoCV-not-pinned{
                transform: translate(0px, -116px);
            }

            .AutoCV-not-pinned:hover{
                transform: translate(0px, 0px);
            }

            #AutoCV-pin-button{
                float:right;
            }
            
            #AutoCV-delete-button{
                float:right;
            }

            button:hover{
                cursor: pointer;
            }

            #AutoCV-prompt-content > h1{
                font-size: 1em;
                
            }

        `;

        // buttons //
        
        // pin
        let isPinned = false;
        const promptContent = promptContainer.querySelector("#AutoCV-prompt-content");
        const pinButton = promptContent.querySelector('#AutoCV-pin-button');
        pinButton.addEventListener('click', ()=>{
            // console.log("click");
            if (isPinned){
                promptContent.classList.add("AutoCV-not-pinned");
            }
            else {
                promptContent.classList.remove("AutoCV-not-pinned");
            }
            isPinned = !isPinned;
            pinButton.textContent = isPinned? "Unpin": "Pin";

        });

        // delete
        const deleteButton = promptContent.querySelector("#AutoCV-delete-button");
        deleteButton.addEventListener('click', ()=>{
            promptContainer.remove();
        });

        // extract
        const extractButton = promptContent.querySelector("#AutoCV-action-button");
        extractButton.addEventListener('click', ()=>{sendExtracted();});
    
    
        // Append elements to the body
        document.body.appendChild(promptContainer);
        document.head.appendChild(style);
    };

})();