
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
  var URL = response;
//  alert(response);



  var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "f6a32887",
  application_key: "1b955de3207750463ac95bd5481207ac"
});

textapi.summarize({
  url : URL
}, function(error, response) {
  if (error === null) {
    alert(response.sentences);
  }

});

});
