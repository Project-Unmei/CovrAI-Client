// WaterlooWorks Module

// Module Lead  - Leo Chai (TheLeoChai)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "WaterlooWorks";



(() => {
    chrome.runtime.onMessage.addListener((request, sender, response) => {
        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);
        const { type } = request;


        if (type === "NEW") {
            console.log(`${extName} Extension received NEW Message.`);

            const cont_aaaa = document.getElementsByClassName('aaaa')[0];
            const cont_postingDiv = document.getElementById('postingDiv');

            // tab loaded is job-posting-list
            if (cont_aaaa) {
                console.log('coop posting list loaded');
                addCheckBoxes();
            }

            // tab loaded is job-posting
            else if (cont_postingDiv) {
                console.log('coop job posting loaded');
                addGenButton();
            }
        }
    });

    const addCheckBoxes = () => {
        const checkBoxes = document.getElementsByClassName('CovGenCheckbox')[0];
        if(checkBoxes) return;

        let postingTableDiv = document.getElementById('postingsTableDiv');
        let postingTable = postingTableDiv.getElementsByClassName('table')[0];
        let postingTableThread = postingTable.getElementsByTagName('thead')[0];

        let postingTableThreadRow = postingTableThread.getElementsByTagName('tr')[0];

        let newThreadHead = document.createElement('th');
        let newButton = document.createElement('a');
        newButton.innerHTML = 'Generate CL';

        newButton.classList.add('btn');
        newButton.classList.add('btn-primary');
        newButton.classList.add('btn-small');
        newButton.style = 'font-weight: normal;';

        newThreadHead.appendChild(newButton);
        postingTableThreadRow.insertBefore(newThreadHead, postingTableThreadRow.firstChild);

        let postingTableBody = postingTable.getElementsByTagName('tbody')[0];

        for (child of postingTableBody.children) {
            let newThreadData = document.createElement('td');
            let newCheckBox = document.createElement('input');

            newCheckBox.type = 'checkbox';
            newCheckBox.className = 'CovGenCheckbox';

            newThreadData.appendChild(newCheckBox);
            child.insertBefore(newThreadData, child.firstChild);
        }

    }

    const addGenButton = () => {
        document.body.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`;

        const checkGenButton = document.getElementById('postingsTableDiv');
        if(checkGenButton) return;

        let dashboardHeader = document.getElementsByClassName('dashboard-header__profile-information')[0];
        let dashboardHeaderDiv = dashboardHeader.getElementsByTagName('div')[0];

        let newButton = document.createElement('button');
        newButton.innerHTML = 'OneClick Cover Letter 📃';
        newButton.id = 'CVGenButton';
        newButton.classList.add('btn__default--text');
        newButton.classList.add('btn--default');
        newButton.type = 'button';
        //newButton.setAttribute('onClick', 'javascript: GenerateCoverLetter()');
        newButton.setAttribute("style", "transition:width 0.3s;width: 200px;height: 36px;");
        newButton.onclick = function() {
            console.log('button clicked');

            newButton.disabled = true;
            newButton.style.width = "210px";
            newButton.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i> OneClick Cover Letter 📃';


            var data = outPackage;

            let JobPostingInformationBody = document.getElementsByClassName('panel-body')[0];
            let JobPostingInformationTable = JobPostingInformationBody.children[0];
            let JobPostingInformationTableBody = JobPostingInformationTable.children[0];
            let JobPostingInformationTableRows = JobPostingInformationTableBody.children;

            for (child of JobPostingInformationTableRows) {
                let childField = child.getElementsByTagName('td')[0].children[0].innerHTML.trim();;
                let childValue = "";
                console.log(childField);
                if (childField.includes("Level:")) {

                    let childTbody = child.getElementsByTagName('td')[1].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

                    for(miniChild of childTbody.children) childValue = childValue + miniChild.children[0].innerHTML + " ";

                } else if (childField.includes("Work Term:")) {
                    childValue = child.getElementsByTagName('td')[1].innerHTML;
                }
                else {
                    childValue = child.getElementsByTagName('td')[1].children[0].innerHTML;
                }
                childValue = childValue.replace(/<[^<>]*>/g, "");
                childValue = childValue.replace(/[\r\n\t]/g, "");
                childValue = childValue.replace(/&nbsp;/g, "");
                childValue = childValue.trim();
                console.log(childValue);
                
                switch (childField) {
                    case "Work Term:":
                        jobWorkTerm = childValue;
                        break;
                    case "Job Type:":
                        jobJobType = childValue;
                        break;
                    case "Job Title:":
                        jobJobTitle = childValue;
                        break;
                    case "Number of Job Openings:":
                        jobOpenings = childValue;
                        break;
                    case "Job Category (NOC):":
                        jobCategory = childValue;
                        break;
                    case "Level:":
                        jobLevel = childValue;
                        break;
                    case "Region:":
                        jobRegion = childValue;
                        break;
                    case "Job - Address Line One:":
                        jobAddress1 = childValue;
                        break;
                    case "Job - Address Line Two:":
                        jobAddress2 = childValue;
                        break;
                    case "Job - City:":
                        jobCity = childValue;
                        break;
                    case "Job - Province / State:":
                        jobProvince = childValue;
                        break;
                    case "Job - Postal Code / Zip Code (X#X #X#):":
                        jobPostalCode = childValue;
                        break;
                    case "Job - Country:":
                        jobCountry = childValue;
                        break;
                    case "Work Term Duration:":
                        jobDuration = childValue;
                        break;
                    case "Special Job Requirements:":
                        jobRequirements = childValue;
                        break;
                    case "Job Summary:":
                        jobSummary = childValue;
                        break;
                    case "Job Responsibilities:":
                        jobResponsibilities = childValue;
                        break;
                    case "Required Skills:":
                        jobSkills = childValue;
                        break;
                    case "Compensation and Benefits Information:":
                        jobCompensation = childValue;
                        break;
                    case "Targeted Degrees and Disciplines:":
                        jobDegrees = childValue;
                        break;
                }
            }

            
            // Fetching main block of WaterlooWorks Content
            let dashboardHeader = document.getElementsByClassName('dashboard-header__profile-information')[0];
            let dashboardHeaderH1 = dashboardHeader.getElementsByTagName('h1')[0].innerHTML;
            let dashboardHeaderH2 = dashboardHeader.getElementsByTagName('h2')[0].innerHTML;

            dashboardHeaderH1 = dashboardHeaderH1.replace(/[\r\n\t]/g, "");
            dashboardHeaderH2 = dashboardHeaderH2.replace(/[\r\n\t]/g, "");

            //data.UID = dashboardHeaderH1.substring(0, dashboardHeaderH1.indexOf('-')).trim();
            data.DATA.JOB.TITLE = dashboardHeaderH1.substring(dashboardHeaderH1.indexOf('-') + 1).trim().split(',')[0].split(' - ')[0].split('/')[0];
            data.DATA.JOB.COMPANY = dashboardHeaderH2.substring(0, dashboardHeaderH2.indexOf(' - ')).trim();
            
            // data.DATA.USER = []

            //data.DATA.JOB.TITLE = jobPosition;
            //data.DATA.JOB.COMPANY = jobCompany;
            data.DATA.JOB.DESCRIPTION = jobSummary + jobResponsibilities + jobSkills;

            console.log(data);

            generateFromData(data).then(()=>{
                newButton.disabled = false;
                newButton.style.width = "200px";
                newButton.innerHTML = 'OneClick Cover Letter 📃';
            });
        };

        dashboardHeaderDiv.appendChild(newButton);
    }

    
})();
