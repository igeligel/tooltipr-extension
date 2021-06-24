import { getGlossaries } from "./api/getGlossaries";
import { getLocalConfiguration } from "./configuration/getLocalConfiguration";
import { AwsGlossary } from "./glossaries/aws";
import { FrontendRoadmapGlossary } from "./glossaries/frontend-developer-roadmap";

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
    const publicGlossaries = [AwsGlossary, FrontendRoadmapGlossary];
    // Filter Glossaries based on client configuration
    const localConfiguration = await getLocalConfiguration();
    // Only Public for now!
    const filteredPublicGlossaries = publicGlossaries.filter((glossary) => {
      return localConfiguration.publicGlossaries.some(
        (e) => e.allowAll && e.uuid === glossary.uuid
      );
    });

    let serviceGlossaries = [];

    try {
      const dictionaryResponse = await getGlossaries({ cookies });
      serviceGlossaries = [
        ...dictionaryResponse.data.results.personalGlossaries,
        ...dictionaryResponse.data.results.organizationGlossaries,
      ];
    } catch (error) {}
    const allGlossaries = [...serviceGlossaries, ...filteredPublicGlossaries];

    const toPush = allGlossaries.reduce((acc, currentGlossary) => {
      const currentGlossaryTerms = currentGlossary.terms.reduce(
        (acc, currentTerm) => {
          acc[currentTerm.uuid] = {
            replacer: currentTerm.term,
            title: currentTerm.title,
            description: currentTerm.description,
            tags: currentTerm.tags.map((e) => e.name),
          };
          return acc;
        },
        {}
      );
      return { ...acc, ...currentGlossaryTerms };
    }, {});

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
  if (changeInfo.status == "complete" && tab.active) {
    console.log("Idle State!");
    if (dictionary === null) return;
    chrome.tabs.sendMessage(
      tabId,
      { text: "report_back", serverDictionary: dictionary },
      doStuffWithDom
    );
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
  } else {
    userLoggedIn = false;
  }
}

let data = [];
chrome.cookies.onChanged.addListener((changeInfo) => {
  const cookie = changeInfo.cookie;
  if (cookie.domain === "127.0.0.1") {
    data = data.filter((oldCookie) => oldCookie.name !== cookie.name);
    data.push(cookie);
  }
});
