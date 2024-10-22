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

        console.log("request: ", request);
        const type  = request.type;


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



        } else if (type === "getContent") {
            document.getElementById('AutoCV-action-button').click();
        } else if (type == "showButton") {
            (async () => {
                document.getElementById('AutoCV-pull-tab').click();
            })();
        }
    });

    const sendExtracted = async () => {

        console.log("sendExtraced called: sending extracted");
    
        const data = {"DATA": {
            "TARGET": document.body.innerText
        }};
    
        const response = await generateFromHTML(data).then((response)=>{
            console.log(response);
            document.getElementById('AutoCV-action-button').disabled = false;
            document.getElementById('Covr-AI-Loading-Container').style.display = 'none';
        });

        return await response
        
    }

    /*
    const sendExtracted = async () => {

        console.log("sendExtraced called: sending extracted");
    
        const data = {"DATA": {"JOB": {
            "TITLE": "",
            "COMPANY": "",
            "DESCRIPTION": document.body.innerText
        }}};

        return await generateFromData(data).then(()=>{
            document.getElementById('AutoCV-action-button').disabled = false;
        });
        
    }*/

    const addPrompt = () => {
        console.log("creating prompt");
        // Create the main container
        console.log(document.getElementById("prompt-container"));
        if (document.getElementById("prompt-container") != null) return;

        const promptContainer = document.createElement('div');
        promptContainer.id = 'prompt-container';

        promptContainer.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        
        <AutoCVdiv id="AutoCV-pull-tab"><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5C7.72876 21 5.84315 21 4.67157 19.8284C3.5 18.6569 3.5 16.7712 3.5 13V7" stroke="#499C9B" stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 5C2 4.05719 2 3.58579 2.29289 3.29289C2.58579 3 3.05719 3 4 3H20C20.9428 3 21.4142 3 21.7071 3.29289C22 3.58579 22 4.05719 22 5C22 5.94281 22 6.41421 21.7071 6.70711C21.4142 7 20.9428 7 20 7H4C3.05719 7 2.58579 7 2.29289 6.70711C2 6.41421 2 5.94281 2 5Z" stroke="#499C9B" stroke-width="1.5"></path> <path d="M12 7L12 16M12 16L15 12.6667M12 16L9 12.6667" stroke="#499C9B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></AutoCVdiv>     
        <AutoCVdiv id="AutoCV-container" class="AutoCV-not-pinned">
            <AutoCVdiv id="AutoCV-prompt-content">
                <AutoCVdiv id="AutoCV-prompt-head" >
                    <AutoCVdiv id="AutoCV-prompt-head-left">
                        <button class="AutoCV" id="AutoCV-action-button"><grad>Extract</grad></button>
                    </AutoCVdiv>
                    <AutoCVdiv id="AutoCV-prompt-head-right">
                        <AutoCVdiv class="AutoCV" id="AutoCV-delete-button"><svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#E34640" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#E34640" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></AutoCVdiv>
                    </AutoCVdiv>
                </AutoCVdiv>
            
            </AutoCVdiv>
        </AutoCVdiv>
        `;

        const loading = document.createElement('div');
        loading.id = "Covr-AI-Loading-Container";
        loading.innerHTML = `
        <div id="Covr-AI-Loader"></div>
        `;
        loading.style.display = 'none';
    
        // Style the container and elements
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
            --palette-red-1: #FE7874;
            --palette-red-2: #E34640;
            --palette-red-3: #9B3430;
            --palette-blue-1: #6FB9B1;
            --palette-blue-2: #499C9B;
            --palette-blue-3: #2A5B67;

            --shade-1: #FFFFFF;
            --shade-2: #EAEBEA;
            --shade-3: #8F908F;
            --shade-4: #252524;
        
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --palette-red-3: #FE7874;
                --palette-red_2: #E34640;
                --palette-red_1: #9B3430;
                --palette-blue-3: #6FB9B1;
                --palette-blue-2: #499C9B;
                --palette-blue-1: #2A5B67;

                --shade-1: #252524;
                --shade-2: #8F908F;
                --shade-3: #EAEBEA;
                --shade-4: #FFFFFF;
            }

        }

        #AutoCV-container {
            font-weight: 400;
            font-family: 'Noto Serif', sans-serif;
            top: 80px;
            right: 0;
            padding: 10px;
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 9999999;
            height: 38.4px;
            transition: all 0.2s cubic-bezier(.67,0,.39,1);
        }

        AutoCVh1 {
            font-family: 'Noto Serif', sans-serif;
            font-size: 19.2px;
            font-weight: 400;
            color: var(--shade-4);
            margin: 0;
            text-align: left;
        }

        AutoCVh2 {
            font-family: 'Noto Sans', sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: var(--shade-4);
            margin: 0;
        }

        AutoCVh3 {
            font-family: 'Noto Sans', sans-serif;
            font-size: 12.8px;
            font-weight: 400;
            color: var(--shade-3);
            margin: 0;
        }

        AutoCVh4 {
            text-align: right;
            font-family: 'Noto Sans', sans-serif;
            font-size: 9.6px;
            font-weight: 400;
            color: var(--shade-3);
            margin: 0;
        }

        grad {
            background: -webkit-linear-gradient(70deg, var(--palette-blue-2), var(--palette-red-1) 90%);
            font-weight: 800;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        AutoCVred {
            color: var(--palette-red-1);
        }

        AutoCVblue {
            color: var(--palette-blue-2);
            font-weight: 600;
        }

        AutoCVbutton, #AutoCV-action-button{
            background-color: var(--shade-1);
            color: var(-);
            font-size: 16px;
            font-weight: 700;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
            border: 1px solid var(--shade-2) !important;
            box-shadow: 0 0 4px 0 #0003;
        }

        #AutoCV-pull-tab{
            top: 80px;
            right: 0;
            padding: 10px;
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: left;
            z-index: 9999998;
            height: 38.4px;
        }

        #AutoCV-prompt-content{
            padding: 0.75em;
            background-color: var(--shade-1);
            transition: transform 0.5s;
            transition-timing-function: ease-in-out;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: right;
            border-radius: 8px;
            border: solid var(--palette-blue-2) 2px;
        }

        #AutoCV-prompt-head-left{
            display: flex;
            align-items: center;
            justify-content: left;
            height: 100%;
            margin-right: 8px;
        }
        #AutoCV-prompt-head-right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 100%;    
            margin-left: 8px;        
        }

        #AutoCV-prompt-head{
            display: flex;
            align-items: center;
            justify-content: space-between;

        }

        .AutoCV-not-pinned{
            transform: translate(320px, 0);
        }

        #AutoCV-pin-button, #AutoCV-delete-button{
            text-align: right;
            height: 40px;
        }

        #AutoCV-pin-button:hover, #AutoCV-delete-button:hover, AutoCVbutton:hover, #AutoCV-pull-tab:hover{
            cursor: pointer;
        }

        #Covr-AI-Loading-Container {
            display: flex;
            top: 0;
            left: 0;
            position: fixed;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.3);
            width: 100%;
            height: 100%;
            z-index: 10000000;
        }

        #Covr-AI-Loader {
            z-index: 10000000;
            width: 50px;
            aspect-ratio: 1;
            border-radius: 50%;
            border: 8px solid #6FB9B1;
            animation:
                l20-1 0.8s infinite linear alternate,
                l20-2 1.6s infinite linear;
        }
        @keyframes l20-1{
        0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
        12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
        25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
        50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
        62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
        75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
        100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
        }
        @keyframes l20-2{ 
        0%    {transform:scaleY(1)  rotate(0deg)}
        49.99%{transform:scaleY(1)  rotate(135deg)}
        50%   {transform:scaleY(-1) rotate(0deg)}
        100%  {transform:scaleY(-1) rotate(-135deg)}
        }

        `;



        // buttons //
        
        // pin
        let isPinned = false;
        const promptContent = promptContainer.querySelector("#AutoCV-container");
        //const pinButton = promptContent.querySelector('#AutoCV-pin-button');
        const closeButton = promptContainer.querySelector('#AutoCV-delete-button');
        const pullButton = promptContainer.querySelector('#AutoCV-pull-tab');

        pullButton.addEventListener('click', ()=>{
            console.log("pulling");
            promptContent.classList.remove("AutoCV-not-pinned");
        });

        closeButton.addEventListener('click', ()=>{
            console.log("closing");
            promptContent.classList.add("AutoCV-not-pinned");
        });

        // extract
        const extractButton = promptContent.querySelector("#AutoCV-action-button");
        extractButton.addEventListener('click', ()=>{
            extractButton.disabled = true;
            loading.style.display = 'flex';
            console.log("generating cv by calling sendExtracted()");
            sendExtracted();
        });
    
        document.documentElement.append(promptContainer);
        document.documentElement.append(loading);
        document.head.append(style);
    };

        

})();