console.log("Initialized");

const doStuffWithDom = (domContent: string) => {
  console.log("I received the following DOM content:\n" + domContent);
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('Listening to idle callback')
  // @ts-ignore
  // window.requestIdleCallback(() => testFunction(tabId, changeInfo), { timeout: 10000 })
  if (changeInfo.status == "complete" && tab.active) {
    console.log("Idle State!")

    chrome.tabs.sendMessage(tabId, { text: "report_back" }, doStuffWithDom);
  }


  // if (changeInfo.status == "complete" && tab.active) {
  //   console.log("Page loaded!")

  //   debugger
  //   chrome.tabs.sendMessage(tabId, { text: "report_back", requestIdleCallback }, doStuffWithDom);
  // }
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
  //  console.log({changeInfo})
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
