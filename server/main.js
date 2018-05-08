import { Meteor } from 'meteor/meteor';
global.Buffer = global.Buffer || require("buffer").Buffer;

Meteor.startup(() => {
            var Fiber = require('fibers');
            var Twit = require('twit');
            Tweets = new Mongo.Collection('developer_db');
            var T = new Twit({
              consumer_key:         '', //put your twitter consumer key here
              consumer_secret:      '', //twiter secret
              access_token:         '', //twitter access token
              access_token_secret:  '', //twitter access token secret
              timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
              app_only_auth: true
            });
           

Meteor.publish('Tweets');

Meteor.methods({
'getStreams': function () {
  
        function fetch(){

          	  var stream = T.stream('statuses/filter', { track: ['#developer']});
              stream.on('tweet', function (tweet) {
          		    var userName = tweet.user.screen_name;
                  var userTweet = tweet.text;
                  var tweetDate = tweet.created_at;
                  var profileImg = tweet.user.profile_image_url;
                  console.log(userName+' '+userTweet+' '+tweetDate);
                  Fiber(function(){
                  Tweets.insert({name: userName, tweet: userTweet, date: tweetDate, img: profileImg, createdAt: new Date() });
         		  }).run();

                return tweet;

        	    });
            }

            var response = setTimeout(function(data) { 
                
                

                	fetch();

              

            }, 60000);




            console.log(response); 

            return response;

}

});

});




