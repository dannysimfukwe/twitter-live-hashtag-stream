import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
global.Buffer = global.Buffer || require("buffer").Buffer;

import './main.html';

var Twit = require('twit');

Tweets = new Mongo.Collection('developer_db');
var T = new Twit({
  consumer_key:         '', //put your twitter consumer key here
  consumer_secret:      '', //twiter secret
  access_token:         '', //twitter access token
  access_token_secret:  '', //twitter access token secret
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  app_only_auth: true
})

Template.tweets.onCreated(function tweetsOnCreated() {

  
Meteor.subscribe('Tweets');

Meteor.call("getStreams", function(error, res) {

console.log(error);

    });
});

Template.tweets.helpers({
  
  'streams': function() {

		return Tweets.find({}, {sort: {createdAt: -1}, limit: 15});
	}


});


Template.tweets.events({
  'streams': function () {
    Meteor.call("getStreams", function(error, res) {
	  console.log(error);
	  var tweet = ServerSession.get("tweet");
    
     });

  
    }
});





