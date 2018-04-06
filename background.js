const APPLICATION_KEY = "1b955de3207750463ac95bd5481207ac";
APPLICATION_ID = "f6a32887";

var myApp = angular.module('SummarizerExtension', ['ngRoute']);
myApp.controller("PopupListController", function ($scope) {

var URL;
var textapi;
var font_size_index = 1;
var font_sizes = ['small', 'medium', 'large', 'x-large', 'xx-large'];

$( document ).ready(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {'command': 'getURL'}, function(response) {
      URL = response;
      var AYLIENTextAPI = require('aylien_textapi');
      textapi = new AYLIENTextAPI({
          application_id: APPLICATION_ID,
          application_key: APPLICATION_KEY
      });
      var num = 3;
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

$('#inc_font').click(function(){
  if(font_size_index != 4){
    $('#summary_container').css('font-size', 'xx-large'/*font_sizes[font_size_index + 1]*/);
    font_size_index++;
  }
});

$('#dec_font').click(function(){
  if(font_size_index != 0){
    $('#summary_container').css('font-size', font_sizes[font_size_index - 1]);
    font_size_index--;
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
var tag_size = ['','','','','','','','','',''];

$( document ).ready(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {'command': 'getURL'}, function(response) {
      URL = response;
      var AYLIENTextAPI = require('aylien_textapi');
      textapi = new AYLIENTextAPI({
        application_id: APPLICATION_ID,
        application_key: APPLICATION_KEY
      });
      //Add function calls below
      Hashtag(textapi);
    });
  });
});

function Hashtag(textapi){
  textapi.hashtags({
    url: URL
    },function(error, response) {
      if (error === null) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'text':response.hashtags});
      });
        for(var i = 0; i < tag_size.length; i++){
          tag_size[i] = response.hashtags[i];
        }
        $scope.hashtags = tag_size;
        $scope.$apply();
      }
    });
  }
});

/****************************************************************
CITAION STUFF DOWN BELOW!
****************************************************************/

var myApp = angular.module('CitaionCreation', ['ngRoute']);
myApp.controller('CitaionController', function ($scope) {

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
      //Add function calls below

    });
  });
});

function Hashtag(textapi){
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
