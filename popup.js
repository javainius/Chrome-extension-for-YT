chrome.storage.local.get(["checkBoxBool"], function(data) {
    if(data.checkBoxBool) {
        document.querySelector('#validator').checked = true;
    } 
    else {
        document.querySelector('#validator').checked = false;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#validator').addEventListener('click', 
    onclick, false)

    function onclick () {
        let checkBox = document.querySelector('#validator');
        chrome.storage.local.set({checkBoxBool: checkBox.checked});
        }
}, false)
