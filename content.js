var vid =  document.querySelector('video');
const desirableTimeSpan = 360; // seconds

vid.addEventListener('ended', function(e) {
    var listOfVideos = getElementByXpath(
        '/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/div[11]/ytd-watch-next-secondary-results-renderer/div[2]')
    // var achors = listOfVideos.getElementsByTagName('a');
    // console.log(listOfVideos.childNodes);
    // listOfVideos.childNodes.forEach(removeVideo)
    getPlayableVideo(listOfVideos.childNodes);
    // achors[0].click();
});

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getPlayableVideo(listOfVideos){
    var arrayOfVideos = getRidOfUndesirableVideos(listOfVideos);
    
}

function getRidOfUndesirableVideos(listOfVideos){
    var arrayOfVideos = Array.from(listOfVideos);
    return arrayOfVideos.filter(video => !removeVideo(video));
}

function removeVideo(video){

    if (isVideoTimeStatusSuitable(video) && !isVideoAlreadyWatched(video)){
        return false;
    }

    return true;
}

function isVideoTimeStatusSuitable(video){
    timeSpan = video.getElementsByClassName("ytd-thumbnail-overlay-time-status-renderer");
    
    if(timeSpan[1] !== undefined){
        var timeStringParts = timeSpan[1].innerText.split(':');

        if(timeStringParts.length > 2){
            return false;
        }

        seconds = convertToSeconds(timeStringParts)

        if(seconds <= desirableTimeSpan){
            return true;
        }
        
        return false;
    }

    return false;
}

function isVideoAlreadyWatched(video){
    var watchedIndicator = video.querySelector("#progress");

    if(watchedIndicator === null)
        return false;
    return true;
}

function convertToSeconds(timeStringParts){
    var minutes = parseInt(timeStringParts[0]);
    var seconds = parseInt(timeStringParts[1]);

    return minutes * 60 + seconds;
}