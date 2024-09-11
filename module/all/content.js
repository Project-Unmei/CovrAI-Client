// Others Module

// Module Lead  - Leo Chai (TheLeoChai)
// Contributors - N/A
let extName = "[ AutoCV ]"
let pageName = "forAll";




(() => {
    chrome.runtime.onMessage.addListener((request, sender, response) => {

        console.log(`${extName} Extension loaded and customized for \"${pageName}\"`);
        const { type } = request;


        if (type == "getContent") {
            sendExtracted();
        }
    });

    const sendExtracted = () => {

        console.log("sending extracted");
    
        data = {"type": 2,
            "content": document.body.innerText};
    
        format_and_send_data(data);
    }

})();