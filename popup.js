document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#validator').addEventListener('click', 
    onclick, false)

    function onclick () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            let checkBox = document.querySelector('#validator');
            chrome.tabs.sendMessage(tabs[0].id, checkBox.checked, setCount);
        })
    }
    function setCount (res) {
        console.log(res.message);
    }
}, false)



chrome.tabs.query({currentWindow: true, active: true},
    function (tabs) {
        let checkBox = document.querySelector('#validator');
        chrome.tabs.sendMessage(tabs[0].id, checkBox.checked, setCount);
    })
function setCount (res) {
    console.log(res.message);
}