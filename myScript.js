chrome.runtime.sendMessage(window.location.href);

// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse) {
// 		if(request.command == "getURL") {
// 			var URL = window.location.href;
// 		}
// 		sendResponse(URL);
// 	});
