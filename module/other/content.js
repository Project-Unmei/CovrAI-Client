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
            document.getElementById('AutoCV-pull-tab').click();
        }
    });

    const sendExtracted = async () => {

        console.log("sendExtraced called: sending extracted");
    
        const data = {"DATA": {
            "TARGET": document.body.innerText
        }};
        
        const jobInfo = await covrAIFetch(data, 'POST', 'http://localhost/ext/extract/job_info', async (jobInfo) =>{
            console.log(`job info is `, jobInfo);

            const jobTitle = await jobInfo.DATA.JOB.TITLE;
            const jobCompany= await jobInfo.DATA.JOB.COMPANY;
            const jobDescription = await jobInfo.DATA.JOB.DESCRIPTION;
    
            const package = outPackage;
            package.DATA.JOB.COMPANY = await jobCompany;
            package.DATA.JOB.TITLE = await jobTitle;
            package.DATA.JOB.DESCRIPTION = await jobDescription;
    
            console.log(`out package becomes:`, outPackage);
    
            return await generateFromData(await package).then(()=>{
                const extractButton = promptContent.querySelector("#AutoCV-action-button");
                document.getElementById('AutoCV-action-button').disabled = false;
            });

        });
        //const jobInfo = await jobInfoRaw.json();
        
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
                        <!--<AutoCVh1 class="AutoCV">CoverAI Extractor</AutoCVh1>-->
                        <button class="AutoCV" id="AutoCV-action-button"><grad>Extract</grad></button>
                    </AutoCVdiv>
                    <AutoCVdiv id="AutoCV-prompt-head-right">
                        <!--<AutoCVdiv class="AutoCV" id="AutoCV-pin-button"><svg width="32px" height="32px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#499C9B" stroke-width="1.5"></circle> <path d="M14.4947 7.9751L15.0253 7.44504V7.44504L14.4947 7.9751ZM16.0358 9.51781L15.5052 10.0479L16.0358 9.51781ZM10.8692 15.2145L10.3386 15.7446L10.8692 15.2145ZM8.81084 13.1541L9.34144 12.624H9.34144L8.81084 13.1541ZM15.2835 12.9971L15.0197 12.2951L15.2835 12.9971ZM14.3249 13.3573L14.5887 14.0594H14.5887L14.3249 13.3573ZM10.6661 9.69089L9.96188 9.43287V9.43287L10.6661 9.69089ZM11.0133 8.74318L11.7175 9.0012V9.0012L11.0133 8.74318ZM9.42252 10.8367L9.62186 11.5598H9.62186L9.42252 10.8367ZM10.1508 10.5676L9.71263 9.9589L9.71263 9.9589L10.1508 10.5676ZM10.3379 10.3952L10.9087 10.8817L10.9087 10.8817L10.3379 10.3952ZM13.6255 13.6902L14.1165 14.2572L14.1165 14.2572L13.6255 13.6902ZM13.1903 14.6006L12.4672 14.4016L12.4672 14.4016L13.1903 14.6006ZM13.4585 13.8733L12.8491 13.4361L12.8491 13.4361L13.4585 13.8733ZM7.85923 11.8776L7.10925 11.8823V11.8823L7.85923 11.8776ZM7.96523 11.476L7.31531 11.1017L7.31531 11.1017L7.96523 11.476ZM12.1526 16.1716L12.1537 15.4216H12.1537L12.1526 16.1716ZM12.5466 16.0673L12.1749 15.4159L12.1749 15.4159L12.5466 16.0673ZM12.3486 6.51803L12.5102 7.25042L12.3486 6.51803ZM6.9694 15.9699C6.67666 16.263 6.6769 16.7379 6.96994 17.0306C7.26298 17.3233 7.73786 17.3231 8.0306 17.0301L6.9694 15.9699ZM10.3572 14.7011C10.65 14.408 10.6497 13.9332 10.3567 13.6404C10.0636 13.3477 9.58876 13.3479 9.29601 13.641L10.3572 14.7011ZM13.9641 8.50516L15.5052 10.0479L16.5664 8.98775L15.0253 7.44504L13.9641 8.50516ZM11.3998 14.6844L9.34144 12.624L8.28024 13.6841L10.3386 15.7446L11.3998 14.6844ZM15.0197 12.2951L14.0611 12.6552L14.5887 14.0594L15.5473 13.6992L15.0197 12.2951ZM11.3703 9.94891L11.7175 9.0012L10.3091 8.48516L9.96188 9.43287L11.3703 9.94891ZM9.62186 11.5598C9.95037 11.4692 10.3003 11.3841 10.589 11.1762L9.71263 9.9589C9.6936 9.9726 9.66055 9.99313 9.22318 10.1137L9.62186 11.5598ZM9.96188 9.43287C9.80569 9.85915 9.78243 9.89071 9.76708 9.90872L10.9087 10.8817C11.1395 10.6109 11.253 10.2692 11.3703 9.9489L9.96188 9.43287ZM10.589 11.1762C10.7071 11.0913 10.8144 10.9923 10.9087 10.8817L9.76708 9.90872C9.75099 9.9276 9.73271 9.94444 9.71263 9.9589L10.589 11.1762ZM14.0611 12.6552C13.7429 12.7748 13.403 12.8908 13.1345 13.1233L14.1165 14.2572C14.1342 14.2418 14.1652 14.2185 14.5887 14.0594L14.0611 12.6552ZM13.9134 14.7995C14.0335 14.363 14.054 14.3298 14.0678 14.3105L12.8491 13.4361C12.6421 13.7245 12.5574 14.0736 12.4672 14.4016L13.9134 14.7995ZM13.1345 13.1233C13.0275 13.216 12.9317 13.321 12.8491 13.4361L14.0678 14.3105C14.0819 14.2909 14.0982 14.273 14.1165 14.2572L13.1345 13.1233ZM9.34144 12.624C9.01182 12.294 8.81105 12.0914 8.68524 11.9334C8.55844 11.7741 8.60863 11.7796 8.60922 11.8729L7.10925 11.8823C7.11189 12.3016 7.32137 12.6285 7.5116 12.8675C7.70282 13.1077 7.97683 13.3804 8.28024 13.6841L9.34144 12.624ZM9.22318 10.1137C8.80952 10.2278 8.43666 10.3294 8.15177 10.4437C7.86833 10.5575 7.52462 10.7383 7.31531 11.1017L8.61515 11.8503C8.56846 11.9314 8.52184 11.9115 8.71061 11.8357C8.89793 11.7605 9.17241 11.6837 9.62186 11.5598L9.22318 10.1137ZM8.60922 11.8729C8.60917 11.8649 8.61123 11.8571 8.61515 11.8503L7.31531 11.1017C7.17862 11.3391 7.10752 11.6085 7.10925 11.8823L8.60922 11.8729ZM10.3386 15.7446C10.6439 16.0502 10.918 16.3262 11.1596 16.5186C11.3999 16.71 11.7292 16.9209 12.1515 16.9216L12.1537 15.4216C12.2482 15.4217 12.2543 15.4729 12.0941 15.3453C11.9352 15.2188 11.7315 15.0165 11.3998 14.6844L10.3386 15.7446ZM12.4672 14.4016C12.3426 14.8543 12.2653 15.131 12.1895 15.3197C12.1132 15.5099 12.0931 15.4626 12.1749 15.4159L12.9184 16.7187C13.285 16.5095 13.4671 16.1636 13.5816 15.8785C13.6966 15.5918 13.7987 15.2163 13.9134 14.7995L12.4672 14.4016ZM12.1515 16.9216C12.4204 16.922 12.6848 16.852 12.9184 16.7187L12.1749 15.4159C12.1684 15.4197 12.1611 15.4216 12.1537 15.4216L12.1515 16.9216ZM15.5052 10.0479C16.0457 10.5889 16.3893 10.9357 16.5946 11.2127C16.692 11.3442 16.7296 11.4234 16.7435 11.465C16.7496 11.4833 16.75 11.4911 16.75 11.4913C16.75 11.4916 16.75 11.4915 16.75 11.4912C16.75 11.491 16.75 11.4917 16.7495 11.494L18.2156 11.811C18.3445 11.2151 18.0948 10.7178 17.7997 10.3196C17.5126 9.93206 17.0717 9.49359 16.5664 8.98775L15.5052 10.0479ZM15.5473 13.6992C16.2163 13.4479 16.7989 13.2311 17.2205 12.9971C17.6538 12.7566 18.0868 12.407 18.2156 11.811L16.7495 11.494C16.749 11.4962 16.7487 11.4969 16.7488 11.4966C16.7489 11.4964 16.749 11.4962 16.7489 11.4965C16.7488 11.4966 16.7452 11.5035 16.7322 11.5176C16.7025 11.5496 16.6356 11.6061 16.4926 11.6855C16.1914 11.8527 15.7354 12.0262 15.0197 12.2951L15.5473 13.6992ZM15.0253 7.44504C14.5162 6.9354 14.0752 6.4912 13.6858 6.2021C13.2862 5.90541 12.786 5.65351 12.187 5.78564L12.5102 7.25042C12.5123 7.24996 12.513 7.24995 12.5125 7.24998C12.5121 7.25001 12.5118 7.24999 12.512 7.25001C12.5123 7.25002 12.5142 7.25015 12.518 7.25093C12.5219 7.25172 12.5284 7.25329 12.5378 7.25641C12.5795 7.27027 12.6591 7.30808 12.7917 7.40647C13.0705 7.61346 13.4197 7.9602 13.9641 8.50516L15.0253 7.44504ZM11.7175 9.0012C11.9826 8.27767 12.1539 7.81604 12.32 7.51081C12.3989 7.36573 12.4554 7.29779 12.4875 7.26759C12.4947 7.2608 12.5 7.25662 12.5032 7.25423C12.5064 7.25189 12.5081 7.25097 12.5083 7.25084C12.5085 7.25072 12.5083 7.25086 12.5079 7.25101C12.5075 7.25115 12.5081 7.25088 12.5102 7.25042L12.187 5.78564C11.5883 5.91775 11.2403 6.35664 11.0024 6.79385C10.7706 7.21994 10.557 7.80847 10.3091 8.48516L11.7175 9.0012ZM8.0306 17.0301L10.3572 14.7011L9.29601 13.641L6.9694 15.9699L8.0306 17.0301Z" fill="#499C9B"></path> </g></svg></AutoCVdiv>-->
                        <AutoCVdiv class="AutoCV" id="AutoCV-delete-button"><svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="#E34640" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#E34640" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></AutoCVdiv>
                    </AutoCVdiv>
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
            
            font-size: 16px;
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

            body {
                background-color: var(--shade-1);
                font-weight: 400;
                font-family: 'Noto Serif', sans-serif;
            }
        }

        #AutoCV-container {
            background-color: var(--shade-1);
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
            height: 2.4rem;
            transition: all 0.2s cubic-bezier(.67,0,.39,1);
        }

        AutoCVh1 {
            font-family: 'Noto Serif', sans-serif;
            font-size: 1.2rem;
            font-weight: 400;
            color: var(--shade-4);
            margin: 0;
            text-align: left;
        }

        AutoCVh2 {
            font-family: 'Noto Sans', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            color: var(--shade-4);
            margin: 0;
        }

        AutoCVh3 {
            font-family: 'Noto Sans', sans-serif;
            font-size: .8rem;
            font-weight: 400;
            color: var(--shade-3);
            margin: 0;
        }

        AutoCVh4 {
            text-align: right;
            font-family: 'Noto Sans', sans-serif;
            font-size: .6rem;
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
            font-size: 1rem;
            font-weight: 700;
            padding: .5rem 1rem;
            border-radius: 0.3125rem;
            cursor: pointer;
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
            border: 1px solid var(--shade-2) !important;
            box-shadow: 0 0 .4rem 0 #0003;
        }

        .AutoCV-button {
            width: 100%;
            box-shadow: 0 0 .4rem 0rem rgba(0, 0, 0, 0.2);
            color: var(--palette-blue-2) !important;
            background: var(--shade-1) !important;
            border: 1px solid var(--shade-2) !important;
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
            height: 2.4rem;
        }

        #AutoCV-prompt-content{
            padding: 0.75em;
            background-color: #fefefe;
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
            margin-right: 0.5rem;
        }
        #AutoCV-prompt-head-right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 100%;    
            margin-left: 0.5rem;        
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
            console.log("generating cv by calling sendExtracted()");
            sendExtracted();
        });
    
    
        // Append elements to the body
        document.body.appendChild(promptContainer);
        document.head.appendChild(style);
    };

})();