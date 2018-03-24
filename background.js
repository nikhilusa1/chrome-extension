var myApp = angular.module('SummarizerExtension', ['ngRoute']);
myApp.controller("PopupListController", function ($scope) {

var URL;
const APPLICATION_KEY = "1b955de3207750463ac95bd5481207ac";
APPLICATION_ID = "f6a32887";

$( document ).ready(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {'command': 'getURL'}, function(response) {
      URL = response;
      var AYLIENTextAPI = require('aylien_textapi');
      var textapi = new AYLIENTextAPI({
          application_id: APPLICATION_ID,
          application_key: APPLICATION_KEY
      });
      textapi.summarize({
        url: URL,
        sentences_number: 2
      }, function(error, response) {
        if (error === null) {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {'command': 'highlight', 'text':response.sentences});
            });
            $scope.sentences = response.sentences;
            $scope.$apply();
            }
          });
        });
      });
    });
});
