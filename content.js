var vid =  document.querySelector('video');

allVidDiv =  document.getElementById('items');

vids = allVidDiv.children

vid.addEventListener('ended', function(e) {
    var listOfVideos = getElementByXpath(
        '/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/div[11]/ytd-watch-next-secondary-results-renderer/div[2]')
    console.log(listOfVideos);
});

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}