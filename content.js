var vid =  document.querySelector('video');
const desirableTimeSpan = 360; // seconds

vid.addEventListener('ended', function(e) {
    var listOfVideos = getElementByXpath(
        '/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/div[11]/ytd-watch-next-secondary-results-renderer/div[2]');
    
    if(listOfVideos === null){
        listOfVideos = getElementByXpath("/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[2]/div/div[3]/ytd-watch-next-secondary-results-renderer/div[2]")
    }
    var nextVideo = getNextVideo(listOfVideos.childNodes);
    var nextVideoAchors = nextVideo.getElementsByTagName('a');

    nextVideoAchors[0].click();
});

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getNextVideo(listOfVideos){
    var arrayOfVideos = getRidOfUndesirableVideos(listOfVideos);

    return findVideoWithMostViews(arrayOfVideos);    
}

function getRidOfUndesirableVideos(listOfVideos){
    var arrayOfVideos = Array.from(listOfVideos);
    return arrayOfVideos.filter(video => !removeVideo(video));
}

function findVideoWithMostViews(arrayOfVideos){
    var mostViews = getNumberOfViews(arrayOfVideos[0]);
    var videoWithMostViews = arrayOfVideos[0];

    for(var video of arrayOfVideos){
        numberOfViews = getNumberOfViews(video);

        if(mostViews < numberOfViews){
            mostViews = numberOfViews;
            videoWithMostViews = video;
        }
    }

    return videoWithMostViews;
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

function getNumberOfViews(video){
    var views = video.querySelector("span.ytd-video-meta-block").innerText
    var numberOfViews = parseFloat(views.replace(',', '.')) * getMultiplier(views);
    
    return numberOfViews;
}

function getMultiplier(views){
    if(views.search("mln") !== -1) return 1000000;
    if(views.search("tūkst") !== -1) return 1000;
    if(views.search("mlrd") !== -1) return 1000000000;
    return 1;
}