var q1Times =0;
var q2Times =0;
var hashTimes=0;

var dataUrl = "https://shielded-tundra-83707.herokuapp.com/nytweets";
var dataUrl2 = "https://shielded-tundra-83707.herokuapp.com/nytweets2";
var dataUrl3 = "https://shielded-tundra-83707.herokuapp.com/nytweets3/";
var dataUrl4 = "https://shielded-tundra-83707.herokuapp.com/nytweets4/";

function getTweets(){
    tNewHash = [];
    $.ajax({
        url: dataUrl,
        header : "Access-control-allow-origin:*",
        type: "GET",
        dataType: 'JSON',
        success: function(data){ 
            newTweets(data);
            q1Times++;
            execUniq(tNewHash, tPreHash);
        },
        error: function() {
            console.log("WTF?");
        }
    });
};  


function getTweets2(){
    tPreHash = [];
    $.ajax({
        url: dataUrl2,
        header : "Access-control-allow-origin:*",
        type: "GET",
        dataType: 'JSON',
        success: function(data){ 
            preTweets(data);
            q2Times++;
            execUniq(tNewHash, tPreHash);
        },
        error: function() {
            console.log("WTF?");
        }
    });
};


function getTweets3(hash){
    $.ajax({
        url: dataUrl3.concat(hash),
        header : "Access-control-allow-origin:*",
        type: "GET",
        dataType: 'JSON',
        success: function(data){ 
            hashDetail(data);
        },
        error: function() {
            console.log("WTF?");
        }
    });
}

function getTweets4(hash){
    hashTimes = 0;
    $.ajax({
        url: dataUrl4.concat(hash),
        header : "Access-control-allow-origin:*",
        type: "GET",
        dataType: 'JSON',
        success: function(data){ 
            timeDetail(data);
            hashTimes++;
        },
        error: function() {
            console.log("WTF?");
        }
    });
}

getTweets();
getTweets2();
setInterval(function(){
    if (q1Times==q2Times) {
        getTweets();
        getTweets2();
    }
}, 10*1000);






