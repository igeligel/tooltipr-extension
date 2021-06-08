import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
  const [count, setCount] = useState(0);
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.browserAction.setBadgeText({ text: count.toString() });
  }, [count]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const changeBackground = () => {
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   const tab = tabs[0];
    //   if (tab.id) {
    //     chrome.tabs.sendMessage(
    //       tab.id,
    //       {
    //         color: "#555555",
    //       },
    //       (msg) => {
    //         console.log("result message:", msg);
    //       }
    //     );
    //   }
    // });
    // chrome.tabs.query(
    //   { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    //   (tabs) => {
    //     const activeTab = tabs[0]
    //     const url = activeTab.url
    //     if (!url) return
    //     const { id: tabId } = activeTab;
    //     let code = `document.querySelector('h2')`;
    //     if (!tabId) return
    //     // http://infoheap.com/chrome-extension-tutorial-access-dom/
    //     chrome.tabs.executeScript(tabId, { code }, function (result) {
    //       debugger
    //       // result has the return value from `code`
    //     });
    //   }
    // );
  };

  

  return (
    <>
      <ul style={{ minWidth: "700px" }}>
        <li>Current URL: {currentURL}</li>
        <li>Current Time: {new Date().toLocaleTimeString()}</li>
      </ul>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "5px" }}
      >
        count up
      </button>
      <button onClick={changeBackground}>change background</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
