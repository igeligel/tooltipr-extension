import axios from "axios";

console.log("Initialized");

const doStuffWithDom = (domContent: string) => {
  console.log("I received the following DOM content:\n" + domContent);
};

let dictionary = null;
let lastUpdate: Date | null = null;

const FIVE_MIN = 5 * 60 * 1000;
const FIVE_SEC = 5 * 1000;

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.command === "SYNCHRONIZE_GLOSSARIES") {
    const currentDate = new Date();
    if (
      lastUpdate !== null &&
      currentDate.getTime() - lastUpdate.getTime() <= FIVE_SEC
    ) {
      return;
    }
    await queryAndUpdateDictionaries();
  }
});

const queryAndUpdateDictionaries = async () => {
  chrome.cookies.getAll({ domain: "127.0.0.1" }, async (cookies) => {
    const dictionaryResponse = await axios.get<any>(
      "http://127.0.0.1:3000/api/extension/dictionaries",
      {
        headers: {
          "anti-csrf": cookies.find(
            (cookie) => cookie.name === "tooltipr_sAntiCsrfToken"
          ).value,
          Cookie: cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; "),
        },
        withCredentials: true,
      }
    );
    const toPush = dictionaryResponse.data.results.reduce(
      (acc, currentGlossary) => {
        const currentGlossaryTerms = currentGlossary.terms.reduce(
          (acc, currentTerm) => {
            acc[currentTerm.uuid] = {
              replacer: currentTerm.term,
              title: currentTerm.title,
              description: currentTerm.description,
              tags: currentTerm.tags.map((e) => e.tag.name),
            };
            return acc;
          },
          {}
        );
        return { ...acc, ...currentGlossaryTerms };
      },
      {}
    );

    dictionary = toPush;
    lastUpdate = new Date();
  });
};

const updateDictionaries = async () => {
  const currentDate = new Date();

  if (
    lastUpdate !== null &&
    currentDate.getTime() - lastUpdate.getTime() <= FIVE_MIN
  ) {
    return;
  }
  await queryAndUpdateDictionaries();
};

updateDictionaries();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("Listening to idle callback");
  // @ts-ignore
  // window.requestIdleCallback(() => testFunction(tabId, changeInfo), { timeout: 10000 })
  if (changeInfo.status == "complete" && tab.active) {
    console.log("Idle State!");
    if (dictionary === null) return;
    chrome.tabs.sendMessage(
      tabId,
      { text: "report_back", serverDictionary: dictionary },
      doStuffWithDom
    );
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
  const cookie = changeInfo.cookie;
  if (cookie.domain === "127.0.0.1") {
    data = data.filter((oldCookie) => oldCookie.name !== cookie.name);
    data.push(cookie);
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
