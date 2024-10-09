// Others Module

// Module Lead  - Leo Chai (TheLeoChai)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "forAll";




(() => {
    chrome.runtime.onMessage.addListener((request, sender, response) => {

        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);

        console.log("request is", request);

        const { type } = request;


        if (type == "getContent") {
            console.log("getContent");
            sendExtracted();
        }
    });

    const sendExtracted = async () => {

        console.log("sending extracted");
    
        const data = {"DATA": {
            "TARGET": document.body.innerText
        }};
        
        const jobInfo = await covrAiFetch(data, 'POST', 'http://localhost')

        format_and_send_data(jobInfo);
    }

})();