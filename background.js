function func_submit(){
	for (i=0;i<data.length;i++){
			alert(data[i]);
	}
}


chrome.runtime.onMessage.addListener(function(response , sender , sendResponse){
	data[index]=response.trim();
	index = index+1;
});
chrome.browserAction.onClicked.addListener(func_submit);