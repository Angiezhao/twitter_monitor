var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  host: 'http://user:8Tp138GMxi@vgc.poly.edu/projects/es-gateway/twitter-2016.08'
  // log: 'trace'
});

function getNewYorkTweets(query) {
    return elasticClient.search(query);
}
exports.getNewYorkTweets = getNewYorkTweets;

