const APPLICATION_KEY = "1b955de3207750463ac95bd5481207ac";
APPLICATION_ID = "f6a32887";

var myApp = angular.module('SummarizerExtension', ['ngRoute']);
myApp.controller("PopupListController", function ($scope) {

var URL;
var textapi;

$( document ).ready(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {'command': 'getURL'}, function(response) {
      URL = response;
      var AYLIENTextAPI = require('aylien_textapi');
      textapi = new AYLIENTextAPI({
          application_id: APPLICATION_ID,
          application_key: APPLICATION_KEY
      });
      var num = 10;
      summarizeText(num);
    });
  });
});

$('#insert').keypress(function(e){
  if(e.which == 13){
    var num_sentences = $(this).val();
    summarizeText(num_sentences);
    $(this).val('');
  }
});

function summarizeText(val){
  textapi.summarize({
    url: URL,
    sentences_number: val
    },function(error, response) {
      if (error === null) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'text':response.sentences});
      });
        $scope.sentences = response.sentences;
        $scope.$apply();
      }
    });
  }
});

/****************************************************************
HASHTAG STUFF DOWN BELOW!
****************************************************************/

var myApp = angular.module('HashtagSuggestion', ['ngRoute']);
myApp.controller("HashtagController", function ($scope) {

var textapi;
var URL;

$( document ).ready(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {'command': 'getURL'}, function(response) {
      URL = response;
      var AYLIENTextAPI = require('aylien_textapi');
      textapi = new AYLIENTextAPI({
        application_id: APPLICATION_ID,
        application_key: APPLICATION_KEY
      });

    });
  });
});

function Hashtag(textapi){

}


});
