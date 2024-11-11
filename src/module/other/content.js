// Others Module

// Module Lead  - Leo Chai (TheLeoChai)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "Others";

function containsKeyword(content, keywords) {
    return keywords.some(keyword => content.includes(keyword));
}




(async () => {
    chrome.runtime.onMessage.addListener((request, sender, response) => {

        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);

        console.log("request: ", request);
        const type  = request.type;


        if (type === "NEW") {
            console.log(`${extName} Extension received NEW Message.`);
            console.log("running script AUTOCV");

            let isWorkday = window.location.href.indexOf("myworkdayjobs.com") > -1;
            let isSaved = false;
            const thisDomain = window.location.href;
            const match = thisDomain.match(/^https?:\/\/([^/]+)/);
            const thisHostname = match? match[1] : new URL(thisDomain).hostname;
            chrome.storage.sync.get('JobSites', (domains) => {
                console.log("domains are", domains);
                for (const domain of domains.JobSites){
                    if (thisHostname == domain){
                        isSaved = true;
                    }
                }

                console.log("isworkday: ", isWorkday, "; isSaved: ", isSaved);
    
    
                // tab loaded is job-posting-list
                if (isWorkday || isSaved) {
                    console.log('is a job posting website');
                    addPrompt();
                }
    
            });


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
            "JOB": {
                "TITLE": "",
                "COMPANY": "",
                "DESCRIPTION": document.body.innerText
            }
        }};
    
        const response = await generateFromData(data).then((response)=>{
            console.log(response);
            document.getElementById('AutoCV-action-button').disabled = false;
            document.getElementById('AutoCV-action-button').innerHTML = "<grad>Create Cover Letter</grad>";
        });

        return await response
        
    }

    const addPrompt = async () => {
        console.log("creating prompt");
        // Create the main container
        console.log(document.getElementById("prompt-container"));
        if (document.getElementById("prompt-container") != null) return;

        const promptContainer = document.createElement('div');
        promptContainer.id = 'prompt-container';

        promptContainer.innerHTML = `
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wdth,wght@0,62.5..100,100..900;1,62.5..100,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        
        <AutoCVdiv id="AutoCV-pull-tab">
            <div class="Covr-ai-logo"></div>
        </AutoCVdiv>     
        <AutoCVdiv id="AutoCV-container" class="AutoCV-not-pinned">
            <AutoCVdiv id="AutoCV-prompt-content">
                <AutoCVdiv id="AutoCV-content-head">
                    <a href="https://www.covr-ai.com/" class="no-style-a"><div class="Covr-ai-logo"></div></a>
                    <a href="https://www.covr-ai.com/" class="no-style-a"><div class="Covr-ai-h1">OneClick</div></a>
                    <div class="Covr-ai-close" id="AutoCV-close-button">❌</div>
                </AutoCVdiv>
                <AutoCVbr></AutoCVbr>
                <AutoCVdiv id="AutoCV-loggedInUserInfo">Welcome, <AutoCVUserName>UserName</AutoCVUserName><AutoCVUserPicture></AutoCVUserPicture></AutoCVdiv>
                <AutoCVdiv id="AutoCV-askUserForLogin" class="nah"></AutoCVdiv>
                <AutoCVdiv id="AutoCV-buttons">
                    <button class="AutoCV" id="AutoCV-action-button"><grad>Create Cover Letter</grad></button>
                    <button class="AutoCV" id="AutoCV-edit-info"> <a id="AutoCV-edit-info-link" target="_blank" rel="noopener noreferrer" href="https://www.covr-ai.com/covrai">Cover Letter Settings</a></button>

                </AutoCVdiv>
            
            </AutoCVdiv>
        </AutoCVdiv>
        `;
    
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

            .AutoCV{
                margin: 0;
                margin-left: 0;
                margin-right: 0;
                margin-top: 0;
                margin-bottom: 0;
                padding: 0;
                font-family: "Noto Sans", sans-serif;
            }

            .no-style-a{
                text-decoration: none;
                color: inherit;
                cursor: auto;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }

            .no-style-a:hover{
                text-decoration: none;
                color: inherit;
                cursor: pointer;
                border: none;
            }

            #AutoCV-container {
                font-weight: 400;
                font-family: "Noto Sans", sans-serif;
                top: 80px;
                right: 0;
                padding: 10px;
                position: fixed;
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 9999997;
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

            AutoCVbutton, #AutoCV-action-button, #AutoCV-edit-info{
                background-color: var(--shade-1);
                color: var(-);
                font-size: 16px;
                font-weight: 600;
                padding: 8px 16px;
                border-radius: 5px;
                cursor: pointer;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
                border: 1px solid var(--shade-2) !important;
                box-shadow: 0 0 2px 0 #0003;
                width: 100%;
                margin-top: 12px;
                height: 42px;
            }

            #AutoCV-pull-tab{
                top: 80px;
                right: 0;
                padding: 6px;
                position: fixed;
                display: flex;
                align-items: center;
                justify-content: left;
                z-index: 9999998;
                height: 38.4px;
                background-color: var(--shade-1);
                border-radius: 12px 0 0 12px;
                box-shadow: 0 0 4px 0 #0003;
                margin: 0;
                width: 64px;
                transform: translateX(30px);
                transition: transform 0.3s, opacity 0.2s ease-out;
                transition-timing-function: ease-in-out;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }

            #AutoCV-prompt-content{
                padding: 12px;
                width: 248px;
                background-color: var(--shade-1);
                -webkit-transition: transform 2s ease-out, opacity 1s ease-out;
                -moz-transition: transform 2s ease-out, opacity 1s ease-out;
                -o-transition: transform 2s ease-out, opacity 1s ease-out;
                transition: transform 2s ease-out, opacity 1s ease-out;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: right;
                border-radius: 8px;
                flex-direction: column;
                box-shadow: 0 0 4px 0 #0003;
                margin-top: 80px;
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
                transform: translate(20px, 0);
                opacity: 0;
                z-index: 9999999;
            }
            .AutoCV-pull-not-pinned{
                opacity: 0;
            }
            #AutoCV-pin-button, #AutoCV-delete-button{
                text-align: right;
                height: 40px;
            }

            #AutoCV-pull-tab:hover{
                transform: translateX(20px);
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

            .Covr-ai-logo{
                background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3Cstyle%3E .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8 %7B stroke: %23231f20; %7D .cls-1, .cls-2, .cls-3, .cls-4, .cls-5, .cls-7 %7B stroke-miterlimit: 10; %7D .cls-1, .cls-3, .cls-4, .cls-5, .cls-6, .cls-8 %7B stroke-width: 15px; %7D .cls-1, .cls-3, .cls-6 %7B fill: none; %7D .cls-2 %7B fill: %23f37774; %7D .cls-2, .cls-3, .cls-5, .cls-7 %7B stroke-linecap: round; %7D .cls-2, .cls-7 %7B stroke-width: 10px; %7D .cls-4, .cls-5 %7B fill: %236fb9b2; %7D .cls-6, .cls-8 %7B stroke-linejoin: round; %7D .cls-7, .cls-8 %7B fill: %23f9f9fa; %7D .cls-9 %7B display: none; %7D %3C/style%3E%3C/defs%3E%3C!-- Generator: Adobe Illustrator 28.7.1, SVG Export Plug-In . SVG Version: 1.2.0 Build 142) --%3E%3Cg%3E%3Cg id='Layer_1' class='cls-9'%3E%3Cpath class='cls-1' d='M703.08,326.52'/%3E%3Cg%3E%3Cpath class='cls-1' d='M702.78,389.33l-134.01-.64c-11.77-.06-21.27-9.65-21.22-21.42l.58-121.73'/%3E%3Cpath class='cls-1' d='M184.49,750.3c41.65,6.91,84.83,4.46,125.44-7.13,22.39-6.39,44.58-15.9,61.08-32.33,16.5-16.43,26.43-40.85,20.88-63.46-1.15-4.67-3.1-9.43-6.95-12.31-3.27-2.45-7.48-3.21-11.54-3.7-13.23-1.6-26.72-1.03-39.77,1.68-15.78,3.28-33.11,12.4-35.29,28.36-1.15,8.4,2.4,16.91,7.82,23.43,17.61,21.17,53.71,20.37,73.68,1.4s24.04-50.93,14.07-76.61c-3.58-9.21-9.12-18.17-17.74-22.99-14.84-8.31-33.36-2.08-50.27-3.94-17.61-1.94-33.85-13.59-41.32-29.66-3.91-8.4-4.43-27.15-4.43-27.15,2.1-85.23,73.75-123.35,49.1-172-7.07-13.94-22.73-30.99-27.17-62.54-1.93-13.72-.06-33.4-.06-33.4,0-6.69,5.42-12.11,12.11-12.11h228.72c3.02,0,5.93,1.14,8.16,3.19l148.19,136.71c2.47,2.28,3.87,5.48,3.87,8.84v338.18c0,6.64-5.39,12.03-12.03,12.03h-196.88'/%3E%3C/g%3E%3C/g%3E%3Cg id='Layer_2' class='cls-9'%3E%3Cpath class='cls-6' d='M162.04,551.67'/%3E%3Cpath class='cls-8' d='M381.53,987.42h519.5c12.94,0,23.43-10.49,23.43-23.43V305.17c0-6.54-2.74-12.79-7.54-17.22L628.23,21.63c-4.33-3.99-10-6.21-15.89-6.21H166.77c-13.03,0-24.89,8.61-24.89,21.64l-.29,460.07s-7.14,68.61,90.04,134.04c16.53,11.13,238.57,157.13,200.37,207.95-33.44,35.77-95,6.73-149.94-19.82-54.94-26.54-109.98-64.83-135.14-53.57-29.2,21.84,35.64,68.73,76.01,100.5,40.38,31.76,72.34,51.64,62.78,75.1-3.78,7.7-12.34,10.5-20.78,10.8-18.14.72-39.16-8-56.96-14.41-17.8-6.42-52.3-30.29-58.87-8.55-3.6,18.57,35.75,56.09,37.98,58.26'/%3E%3Cpath class='cls-4' d='M622.67,23.86l-1.13,246.11c-.11,22.94,18.4,41.62,41.33,41.73l261.06,1.24'/%3E%3Cpath class='cls-6' d='M381.53,987.42h519.5c12.94,0,23.43-10.49,23.43-23.43V305.17c0-6.54-2.74-12.79-7.54-17.22L628.23,21.63c-4.33-3.99-10-6.21-15.89-6.21H166.77c-13.03,0-24.89,8.61-24.89,21.64l-.29,460.07s-7.14,68.61,90.04,134.04c16.53,11.13,238.57,157.13,200.37,207.95-33.44,35.77-95,6.73-149.94-19.82-54.94-26.54-109.98-64.83-135.14-53.57-29.2,21.84,35.64,68.73,76.01,100.5,40.38,31.76,72.34,51.64,62.78,75.1-3.78,7.7-12.34,10.5-20.78,10.8-18.14.72-39.16-8-56.96-14.41-17.8-6.42-52.3-30.29-58.87-8.55-3.6,18.57,35.75,56.09,37.98,58.26'/%3E%3Cline class='cls-3' x1='268.14' y1='566.56' x2='772.74' y2='566.56'/%3E%3Cline class='cls-3' x1='262.76' y1='439.75' x2='772.74' y2='439.75'/%3E%3Ccircle class='cls-5' cx='386.53' cy='213.51' r='133.91'/%3E%3Cpath class='cls-2' d='M481.61,308.77c-11.03-42.21-49.42-73.35-95.08-73.35s-84.05,31.15-95.08,73.35h0c24.26,24.47,57.91,39.62,95.09,39.62s70.82-15.15,95.09-39.62'/%3E%3Ccircle class='cls-7' cx='386.53' cy='188.85' r='38.77'/%3E%3C/g%3E%3Cg id='Layer_2_copy'%3E%3Cpath class='cls-6' d='M183.24,543.02'/%3E%3Cpath class='cls-8' d='M371.15,916.09h444.77c11.08,0,20.06-8.98,20.06-20.06V331.99c0-5.6-2.34-10.95-6.46-14.75l-247.16-228.01c-3.71-3.42-8.56-5.32-13.6-5.32H187.28c-11.16,0-21.31,7.37-21.31,18.53l-.25,393.88s-6.11,58.74,77.09,114.76c14.15,9.53,204.25,134.53,171.55,178.04-28.63,30.62-81.33,5.76-128.37-16.97-47.04-22.73-94.16-55.5-115.7-45.87-25,18.7,30.51,58.85,65.08,86.04,34.57,27.2,61.93,44.21,53.75,64.29-3.24,6.59-10.56,8.99-17.79,9.24-15.53.62-33.53-6.85-48.76-12.34-15.24-5.49-44.78-25.94-50.4-7.32-3.08,15.9,30.6,48.02,32.52,49.88'/%3E%3Cpath class='cls-4' d='M568.18,84.29l-.97,210.7c-.09,19.64,15.75,35.63,35.39,35.72l233.38,1.06'/%3E%3Cpath class='cls-6' d='M371.15,916.09h444.77c11.08,0,20.06-8.98,20.06-20.06V331.99c0-5.6-2.34-10.95-6.46-14.75l-247.16-228.01c-3.71-3.42-8.56-5.32-13.6-5.32H187.28c-11.16,0-21.31,7.37-21.31,18.53l-.25,393.88s-6.11,58.74,77.09,114.76c14.15,9.53,204.25,134.53,171.55,178.04-28.63,30.62-81.33,5.76-128.37-16.97-47.04-22.73-94.16-55.5-115.7-45.87-25,18.7,30.51,58.85,65.08,86.04,34.57,27.2,61.93,44.21,53.75,64.29-3.24,6.59-10.56,8.99-17.79,9.24-15.53.62-33.53-6.85-48.76-12.34-15.24-5.49-44.78-25.94-50.4-7.32-3.08,15.9,30.6,48.02,32.52,49.88'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                width: 24px;
                height: 24px;
            }

            .Covr-ai-h1{
                font-weight: 400;
                font-family: "Noto Serif", serif;
                font-size: 18px;
                margin-left: 12px;
                user-select: none;
            }

            #AutoCV-content-head{
                padding: 0px 12px;
                display: flex;
                flex-direction: row;
                justify-content: start;
                width: calc(100% - 12px);
                flex-wrap: wrap;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }

            AutoCVbr{
                width: 100%;
                border-bottom: solid 1px var(--shade-2);
                margin: 6px 0px;
            }

            .Covr-ai-close{
                margin-left: auto;
                transition: 0.3s all cubic-bezier(.67,0,.39,1);
                user-select: none;
            }

            .Covr-ai-close:hover{
                cursor:pointer;
                animation-name: wiggle;
                animation-duration: 0.4s;
                user-select: none;
            }

            #AutoCV-loggedInUserInfo{
                display: flex;
                font-family: Noto Sans, sans-serif;
                font-weight: 600;
                margin: 12px 0px;
                font-size: 16px;
            }

            AutoCVUserName{
                margin-left: 6px;
            }

            #AutoCV-edit-info-link{
                all:unset;
                text-decoration: none;
                color: var(--shade-3);
            }

            #AutoCV-buttons{
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
                font-family: Noto Sans, sans-serif;
                }

            @keyframes wiggle {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(8deg); }
                75% { transform: rotate(-8deg); }
                100% { transform: rotate(0deg); }
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
            .loader {
            width: 15px;
            aspect-ratio: 1;
            border-radius: 50%;
            animation: l5 1s infinite linear alternate;
            display: inline-block;
            }
            @keyframes l5 {
                0%  {box-shadow: 20px 0 var(--palette-blue-1), -20px 0 var(--palette-red-1);background: var(--palette-blue-1) }
                33% {box-shadow: 20px 0 var(--palette-blue-1), -20px 0 var(--palette-red-1);background: var(--palette-red-1)}
                66% {box-shadow: 20px 0 var(--palette-red-1),-20px 0 var(--palette-blue-1); background: var(--palette-red-1)}
                100%{box-shadow: 20px 0 var(--palette-red-1),-20px 0 var(--palette-blue-1); background: var(--palette-blue-1) }
            }

        `;

        
        document.documentElement.append(promptContainer);
        document.head.append(style);
        console.log(document.getElementById("prompt-container"));

        // buttons //
        
        // pin
        let isPinned = false;
        const promptContent = promptContainer.querySelector("#AutoCV-container");
        //const pinButton = promptContent.querySelector('#AutoCV-pin-button');
        const closeButton = promptContainer.querySelector('#AutoCV-close-button');
        const pullButton = promptContainer.querySelector('#AutoCV-pull-tab');

        pullButton.addEventListener('click', ()=>{
            console.log("pulling");
            promptContent.classList.remove("AutoCV-not-pinned");
            pullButton.classList.add("AutoCV-pull-not-pinned");
        });

        closeButton.addEventListener('click', ()=>{
            console.log("closing");
            promptContent.classList.add("AutoCV-not-pinned");
            pullButton.classList.remove("AutoCV-pull-not-pinned");
        });

        // extract
        const extractButton = promptContent.querySelector("#AutoCV-action-button");
        extractButton.addEventListener('click', ()=>{
            extractButton.disabled = true;
            console.log("generating cv by calling sendExtracted()");
            extractButton.innerHTML="<div class='loader'></div>";
            sendExtracted();
            
        });

        
     
        // change information
        let info = await cookieData();
        console.log("Info: ", info.name);   
        let fullName = info.name;
        let names = fullName.split(' ');
        if (fullName.length >= 25) {
            fullName = names[0] + ' ' + Array.from(names[1])[0] + '.';
            if (fullName.length >= 25) {
                fullName = Array.from(names[0])[0] + '. ' + Array.from(names[1])[0] + '.';
            }
        }
        document.querySelector("AutoCVUserName").innerHTML = fullName;
    };


})();
