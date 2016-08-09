var express = require('express')
var router = express.Router()

var elastic = require('./elasticsearch');

var twelveHoursTweets = {
  _index: "twitter-2016.08",
  _type: "tweet",
  body: {
    query: {
      filtered: {
        query: {
          constant_score : {
            filter : {
                terms : { "place.name" : ["brooklyn", "queens", "bronx", "manhattan"]}
            }
          }
        },
        filter: {
          and: [
            {
              range: {
                "@timestamp": {
                  from: "now-24h",
                  to: "now"
                }
              }
            },
            {
              and: [
                {
                  exists: { "field": "coordinates"}
                },
                {
                  exists: { "field": "entities.hashtags.text"} 
                }
              ]
              //exists: { "field": "entities.hashtags.text"} 
            }
          ]
        }
      }
    },
    size: 0,
    aggs : {
      hashtags : {
        terms: { 
          field : "entities.hashtags.text",
          size: 70
        }
      }
    }
  }
};

var lastMonthTweets = {
  _index: "twitter-2016.08",
  _type: "tweet",
  body: {
    query: {
      filtered: {
        query: {
          constant_score : {
              filter : {
                  terms : { "place.name" : ["brooklyn", "queens", "bronx", "manhattan"]}
              }
          }
        },
        filter: {
          and: [
            {
              range: {
                "@timestamp": {
                  from: "now-48h",
                  to: "now-24h"
                }
              }
            },
            {
              and: [
                {
                  exists: { "field": "coordinates"}
                },
                {
                  exists: { "field": "entities.hashtags.text"} 
                }
              ] 
              //exists: { "field": "entities.hashtags.text"} 
            }
          ]
        }
      }
    },
    size: 0,
    aggs : {
      hashtags : {
          terms: { 
            field : "entities.hashtags.text",
            size: 50
          }
      }
    }
  }
};

function getHashtag(hashtag) {
  return {
    _index: "twitter-2016.08",
    _type: "tweet",
    body: {
      query: {
        filtered: {
          query: {
            constant_score : {
                filter : {
                    terms : { "place.name" : ["brooklyn", "queens", "bronx", "manhattan"]}
                }
            }
          },
          filter: {
            and: [
              {
                range: {
                  "@timestamp": {
                    from: "now-24h",
                    to: "now"
                  }
                }
              },
              {
                and: [
                  {
                    exists: { "field": "coordinates"}
                  },
                  {
                    term:{"text": hashtag}
                    //prefix: {"entities.hashtags.text": hashtag} 
                  }
                ]
              }
            ]
          }
        }
      },
      size: 2000,
      sort: [
        {
          id: { "order" : "desc"}  
        }
      ],
      aggs:{
        tweets_per_hour:{
          date_histogram: {
            "field": "@timestamp",
            "interval": "hour"
          }
        }
      },
      highlight:{
        fields : {
          "text": {}
        }
      }
    }
  };
};

function getTimestamp(hashtag) {
  return {
    _index: "twitter-2016.08",
    _type: "tweet",
    body: {
      query: {
        filtered: {
          query: {
            constant_score : {
                filter : {
                    terms : { "place.name" : ["brooklyn", "queens", "bronx", "manhattan"]}
                }
            }
          },
          filter: {
            and: [
              {
                range: {
                  "@timestamp": {
                    from: "now-24h",
                    to: "now"
                  }
                }
              },
              {
                and: [
                  {
                    exists: { "field": "coordinates"}
                  },
                  {
                    term:{"text": hashtag}
                    //prefix: {"entities.hashtags.text": hashtag} 
                  }
                ]
              }
            ]
          }
        }
      },
      size: 0,
      aggs:{
        tweets_per_hour:{
          date_histogram: {
            "field": "@timestamp",
            "interval": "hour"
          }
        }
      }
    }
  };
};

router.get('/nytweets', function (req, res, next) {
    elastic.getNewYorkTweets(twelveHoursTweets).then(function (result) {
        res.json(result);
    });
});

router.get('/nytweets2', function (req, res, next) {
    elastic.getNewYorkTweets(lastMonthTweets).then(function (result) {
        res.json(result);
    });
});

router.get('/nytweets3/:hashtag', function (req, res, next) {
    //console.log(JSON.stringify(getHashtag(req.params["hashtag"]), null, 10));
    elastic.getNewYorkTweets(getHashtag(req.params["hashtag"])).then(function (result) {
        res.json(result);
    });
});

router.get('/nytweets4/:hashtag', function (req, res, next) {
    //console.log(JSON.stringify(getHashtag(req.params["hashtag"]), null, 10));
    elastic.getNewYorkTweets(getHashtag(req.params["hashtag"])).then(function (result) {
        res.json(result);
    });
});

module.exports = router;
