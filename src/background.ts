import { getGlossaries } from "./api/getGlossaries";
import { Configuration } from "./configuration";
import { getLocalConfiguration } from "./configuration/getLocalConfiguration";
import { AwsGlossary } from "./glossaries/aws";
import { FrontendRoadmapGlossary } from "./glossaries/frontend-developer-roadmap";
import { TechRecruitmentGlossary } from "./glossaries/tech-recruitement";

let dictionary = null;
let denyList: Array<string> = null;
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

  if (msg.command === "SYNCHRONIZE_DENYLIST") {
    const localConfiguration = await getLocalConfiguration();
    denyList = localConfiguration.denyList;
  }
});

const filterGlossary = (glossariesToFilter, glossaryConfiguration) => {
  const filteredPublicGlossaries = glossariesToFilter.filter((glossary) => {
    return glossaryConfiguration.some(
      (publicGlossary) =>
        publicGlossary.allowAll && publicGlossary.uuid === glossary.uuid
    );
  });
  return filteredPublicGlossaries;
};

const queryAndUpdateDictionaries = async () => {
  chrome.cookies.getAll({ domain: Configuration.HOST }, async (cookies) => {
    const publicGlossaries = [
      AwsGlossary,
      FrontendRoadmapGlossary,
      TechRecruitmentGlossary,
    ];

    // Filter Glossaries based on client configuration
    const localConfiguration = await getLocalConfiguration();

    // Only Public for now!
    const filteredPublicGlossaries = filterGlossary(
      publicGlossaries,
      localConfiguration.publicGlossaries
    );

    let serviceGlossaries = [];

    try {
      const dictionaryResponse = await getGlossaries({ cookies });

      // Filter dictionaries
      const filteredPersonalGlossaries = filterGlossary(
        dictionaryResponse.data.results.personalGlossaries,
        localConfiguration.personalGlossaries
      );

      const filteredOrganizationGlossaries = filterGlossary(
        dictionaryResponse.data.results.organizationGlossaries,
        localConfiguration.organizationGlossaries
      );

      serviceGlossaries = [
        ...filteredPersonalGlossaries,
        ...filteredOrganizationGlossaries,
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
    denyList = localConfiguration.denyList;
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
  if (changeInfo.status == "complete" && tab.active) {
    chrome.tabs.sendMessage(tabId, {
      command: "VALIDATE_TOOLTIPR_EXTENSION",
    });

    if (dictionary === null) return;
    chrome.tabs.sendMessage(tabId, {
      text: "tabIsReady",
      serverDictionary: dictionary,
      denyList,
    });
  }
});

let data = [];
chrome.cookies.onChanged.addListener((changeInfo) => {
  const cookie = changeInfo.cookie;
  if (cookie.domain === Configuration.HOST) {
    data = data.filter((oldCookie) => oldCookie.name !== cookie.name);
    data.push(cookie);
  }
});
