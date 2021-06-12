console.log("Initialized");

const doStuffWithDom = (domContent: string) => {
  console.log("I received the following DOM content:\n" + domContent);
};

chrome.browserAction.onClicked.addListener(function (tab) {
  if (!tab?.id) {
    console.log("No tab found");
    return;
  }
  // ...check the URL of the active tab against our pattern and...
  // ...if it matches, send a message specifying a callback too
  chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDom);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tab.active) {
    chrome.tabs.sendMessage(tabId, { text: "report_back" }, doStuffWithDom);
  }
});

let userLoggedIn = false;
function updatePopup(status) {
  if (status === userLoggedIn) {
    return;
  }
  chrome.runtime.sendMessage({
    msg: "something_completed",
    data: {
      subject: "Loading",
      content: "Just completed!",
    },
  });

  if (status) {
    userLoggedIn = true;
    // chrome.browserAction.setPopup({ popup: "popup.html" });
  } else {
    userLoggedIn = false;
    // chrome.browserAction.setPopup({ popup: "signin.html" });
  }
}

let data = [];
chrome.cookies.onChanged.addListener((changeInfo) => {
  const cookie = changeInfo.cookie
  if (cookie.domain === 'localhost') {
    data = data.filter(oldCookie => oldCookie.name !== cookie.name)
    data.push(cookie)
  }
   console.log({changeInfo})
  // const cookie = changeInfo.cookie;
  // if (cookie.name === COOKIE_NAME && cookie.domain === `.${DOMAIN_NAME}`) {
  //   updatePopup(!changeInfo.removed);
  // }
});
// chrome.cookies.get(
//   {
//     url: `https://www.${DOMAIN_NNAME}`,
//     name: COOKIE_NAME,
//   },
//   (cookie) => {
//     if (cookie !== null) {
//       console.log(`Found ${COOKIE_NAME} on intial run`);
//       updatePopup(true);
//       console.log("set popup to popup.html");
//     }
//   }
// );
