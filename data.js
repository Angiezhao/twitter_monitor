var tNewHash = [];
var tPreHash = [];
var uniqHash = [];
var uniqRound = 0;
var tweetLine = [];
function newTweets (tN){
    tNewHash = tN;
    var hitTweets = [];
    var cleanHitTweets;
    for(var i = 0; i < tN["hits"]["hits"].length; i++){
        hitTweets.push(tN["hits"]["hits"][i]["_source"]);

    };
    //clean the null data of user_mention          
    function cleanHits(actual){
        cleanHitTweets = new Array();
        for(var i = 0; i < actual.length; i++){
            if (actual[i]["entities"]["user_mentions"][0]){
                cleanHitTweets.push(actual[i]);
            }
        }
    }
    cleanHits(hitTweets);
};


function preTweets(tP){
    for(var i = 0; i < tP["aggregations"]["hashtags"]["buckets"].length; i++){
        tPreHash.push({"key": "#" + tP["aggregations"]["hashtags"]["buckets"][i]["key"], "value": tP["aggregations"]["hashtags"]["buckets"][i]["doc_count"]})
    }
};

function uniq(tN,tP){
    uniqHash = [];
    for(var i = 0; i < tN["aggregations"]["hashtags"]["buckets"].length; i++){
        var uniq = true;
        for (var n = 0; n < tP.length; n++){
            if (tP[n]["key"] == ("#" + tN["aggregations"]["hashtags"]["buckets"][i]["key"])){
                uniq = false;
            }
        }; 
        if(uniq) {
            uniqHash.push(tN["aggregations"]["hashtags"]["buckets"][i]);
        }   
    }

    //plot Hashtags for passive interaction
    settings = setup('#topBar');
    redraw(settings, uniqHash);
    // var events = document.getElementById("event");
    // events.innerHTML = uniqHash[uniqRound]["key"];

    //Concatinate hashtag parameter
    getTweets3(uniqHash[uniqRound]["key"]);

    for(var i = 0; i < 10; i++){
        getTweets4(uniqHash[i]["key"]);
    }

};

function execUniq(tN, tP){
    console.log(q1Times, q2Times);
    if(q1Times == q2Times){
        uniq(tN, tP);
    }
};

function hashDetail(hashdata){
    //console.log(hashdata);
    var relatedTweets=[];
    var actualCoordinate = [];
    var clusterCoordinate = [];
    //sort by followers_count
    for(var i = 0; i < hashdata["hits"]["hits"].length; i++){
        var source =  hashdata["hits"]["hits"][i]["_source"];
        source.text = hashdata["hits"]["hits"][i].highlight.text[0];
        relatedTweets.push(source);
    }

    // relatedTweets.sort(function(a,b){ 
    //     //return b["id"]-a["id"]
    //     return (0.5*b["user"]["followers_count"] + 0.5*b["retweet_count"] ) - (0.5*a["user"]["followers_count"] + 0.5*b["retweet_count"]); 
    // });
    console.log(relatedTweets);
    //plot tweet list
    setUps = init('#tweetList');
    redrawTweetDetail(setUps, relatedTweets);

    for(var i = 0; i < relatedTweets.length; i++){
        actualCoordinate.push(relatedTweets[i]["coordinates"]);
    };
    
    var overlap = [];
    var radius = [];
    for(var i=0; i < relatedTweets.length; i++) {
        overlap.push(false);
        radius.push(1.0);
    }
    for(var i = 0; i < relatedTweets.length; i++){
        if (!overlap[i]) {
            for(var n = i+1; n < relatedTweets.length; n++){
                if(Math.abs(relatedTweets[i]["coordinates"]["coordinates"][0] - relatedTweets[n]["coordinates"]["coordinates"][0]) < 0.0005 && Math.abs(relatedTweets[i]["coordinates"]["coordinates"][1] - relatedTweets[n]["coordinates"]["coordinates"][1]) < 0.0005){
                    overlap[n] = true;
                    radius[i] += 0.1;
                    radius[n] = 0;
                }
            }            
        }
    };
    
    //plot map
    tweetsMap(actualCoordinate, radius);
    //console.log(uniqRound);
    if(uniqRound < 9){
        uniqRound++;
    } else {
        uniqRound = 0;
    };
};

function timeDetail(timedata){
    // console.log(hashTimes);
    // console.log(timedata);
    tweetLine.push(timedata["aggregations"]["tweets_per_hour"]["buckets"]);
    //console.log('.hashLine'.concat(hashTimes));  

    drawBar('.hashLine'.concat(hashTimes), tweetLine[hashTimes]);
};

// function cleanCoordinates(actual){
//     cleanedCoordinate = new Array();
//     for(var i = 0; i < actual.length; i++){
//         if (actual[i] != null){
//             cleanedCoordinate.push(actual[i]);
//         }
//     }
// }
// cleanCoordinates(actualCoordinate);


