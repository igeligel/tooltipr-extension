import ReactDOM from "react-dom";
import stuff from "./renderElement";

console.log('Initialized');

const doStuffWithDom =(domContent: string) => {
  console.log('I received the following DOM content:\n' + domContent);
  // firstHeading
  // debugger
  // const document.getElementById("firstHeading")
  // ReactDOM.render(stuff, );
}

chrome.browserAction.onClicked.addListener(function (tab) {
  if (!tab?.id) {
    console.log('No tab found');
    return;
  }
  // ...check the URL of the active tab against our pattern and...
  // ...if it matches, send a message specifying a callback too
  chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDom);
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.sendMessage(tabId, { text: 'report_back' }, doStuffWithDom);
  }
})