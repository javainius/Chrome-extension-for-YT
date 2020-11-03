chrome.runtime.onMessage.addListener(function (checkBoxBool, sender,
    sendResponse) {
    if (checkBoxBool){
        console.log("auto play is enabled")
        enableAutoVideoPlay();
    }
    else{
        console.log("auto play is disabled")
    }
    sendResponse({ message: "request"})
})

const enableAutoVideoPlay = () => {
    const vid =  document.querySelector('video');
    const desirableTimeSpan = 360; // seconds
    
    vid.addEventListener('ended', function(e) {
        console.log("asfasdfasdfasdfasdf")
        let listOfVideos = getElementByXpath(
            '/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[1]/div/div[11]/ytd-watch-next-secondary-results-renderer/div[2]');
        
        if(listOfVideos === null){
            listOfVideos = getElementByXpath("/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[4]/div[2]/div/div[3]/ytd-watch-next-secondary-results-renderer/div[2]")
        }
        let nextVideo = getNextVideo(listOfVideos.childNodes);
        let nextVideoAchors = nextVideo.getElementsByTagName('a');
    
        nextVideoAchors[0].click();
    });
    
    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    
    function getNextVideo(listOfVideos){
        let arrayOfVideos = getRidOfUndesirableVideos(listOfVideos);
    
        return findVideoWithMostViews(arrayOfVideos);    
    }
    
    function getRidOfUndesirableVideos(listOfVideos){
        let arrayOfVideos = Array.from(listOfVideos);
        return arrayOfVideos.filter(video => !removeVideo(video));
    }
    
    function findVideoWithMostViews(arrayOfVideos){
        let mostViews = getNumberOfViews(arrayOfVideos[0]);
        let videoWithMostViews = arrayOfVideos[0];
    
        for(let video of arrayOfVideos){
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
            let timeStringParts = timeSpan[1].innerText.split(':');
    
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
        let watchedIndicator = video.querySelector("#progress");
    
        if(watchedIndicator === null)
            return false;
        return true;
    }
    
    function convertToSeconds(timeStringParts){
        let minutes = parseInt(timeStringParts[0]);
        let seconds = parseInt(timeStringParts[1]);
    
        return minutes * 60 + seconds;
    }
    
    function getNumberOfViews(video){
        let views = video.querySelector("span.ytd-video-meta-block").innerText
        let numberOfViews = parseFloat(views.replace(',', '.')) * getMultiplier(views);
        
        return numberOfViews;
    }
    
    function getMultiplier(views){
        if(views.search("mln") !== -1) return 1000000;
        if(views.search("tūkst") !== -1) return 1000;
        if(views.search("mlrd") !== -1) return 1000000000;
        return 1;
    }
}
