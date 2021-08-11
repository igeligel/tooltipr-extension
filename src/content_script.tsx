import ReactDOM from "react-dom";
import { unescape } from "html-escaper";
import outOfCharacter from "out-of-character";
import micromatch from "micromatch";
import _ from "lodash";
import renderTooltip from "./renderTooltip";
import { Dictionary } from "./types";
import { getDocumentThemeMode } from "./helper/getDocumentThemeMode";

const uuidv4 = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const spanGenerator = (offsetText) => {
  const newElement = document.createElement("span");
  newElement.textContent = offsetText;
  newElement.style.display = "inline-block";
  newElement.className = "tooltipr-component-root";
  const uuid = uuidv4();
  newElement.dataset.tooltiprId = uuid;

  return { newElement, uuid };
};

type DataIdDictionaryMapping = { dataId: string; dictionaryId: string };

const replaceText = (
  serverDictionary: Dictionary
): Array<DataIdDictionaryMapping> => {
  const flatDictionary = Object.entries(serverDictionary);
  const allIds: Array<DataIdDictionaryMapping> = [];

  const ignoredTypes = ["STYLE", "SCRIPT", "TEXTAREA", "INPUT"];

  const iterator = document.createNodeIterator(document, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      // @ts-ignore
      if (ignoredTypes.includes(node.parentNode.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let temp: Node = null;

  const allDomNodes: Array<Node> = [];

  while ((temp = iterator.nextNode())) {
    if ("tooltiprSkip" in temp.parentElement.dataset) {
      continue;
    }

    allDomNodes.push(temp);
  }

  const allGaapNodes = allDomNodes.filter((domNode) => {
    const unescapedContent = outOfCharacter.replace(
      unescape(domNode.textContent)
    );

    return flatDictionary.some(([key, value]) => {
      return unescapedContent.includes(value.replacer);
    });
  });

  allGaapNodes.forEach((node) => {
    const unescapedContent = outOfCharacter.replace(unescape(node.textContent));

    const flatDictionaryItem = flatDictionary.find(([key, value]) => {
      return unescapedContent.includes(value.replacer);
    });

    const [flatDictionaryItemKey, flatDictionaryItemValue] = flatDictionaryItem;

    const parent = node.parentElement;
    if (!parent) {
      return;
    }

    if (unescapedContent === flatDictionaryItemValue.replacer) {
      // Check if parent element has attributes already
      // Then we do not need to adjust it.
      if (parent.parentElement?.dataset?.tooltiprId) {
        return;
      }

      const { newElement, uuid } = spanGenerator(
        flatDictionaryItemValue.replacer
      );
      allIds.push({ dataId: uuid, dictionaryId: flatDictionaryItemKey });
      // @ts-ignore
      parent.replaceChildren(...[newElement]);
      return;
    }

    const matches = unescapedContent.split(flatDictionaryItemValue.replacer);
    const countOfMatches = matches.length;
    let newChildren = [];
    matches.forEach((match, index) => {
      const isLastItem = countOfMatches - 1 === index;
      if (isLastItem) {
        newChildren.push(match);
        return;
      }

      newChildren.push(match);

      const { newElement, uuid } = spanGenerator(
        flatDictionaryItemValue.replacer
      );
      allIds.push({ dataId: uuid, dictionaryId: flatDictionaryItemKey });
      newChildren.push(newElement);
    });
    const newMasterSpan = document.createElement("span");
    // @ts-ignore
    newMasterSpan.replaceChildren(...newChildren);
    // @ts-ignore
    node.replaceWith(newMasterSpan);
  });

  return allIds;
};

const debouncedCallback = _.debounce(
  (allIds, serverDictionary) => {
    const isDarkMode = getDocumentThemeMode(document, window) === "dark";
    allIds = replaceText(serverDictionary);

    const targetElement = document.querySelector("#tooltipr-tippy-root");
    if (!targetElement) {
      const body = document.querySelector("body");
      var elem = document.createElement("div");
      elem.id = "tooltipr-tippy-root";

      body.appendChild(elem);
    }

    allIds.forEach((idPair) => {
      const selector = document.querySelector(
        `[data-tooltipr-id="${idPair.dataId}"]`
      );
      if (!selector) return;
      const dictionaryElement = serverDictionary[idPair.dictionaryId];
      if (!dictionaryElement) return;

      ReactDOM.render(
        renderTooltip({
          title: dictionaryElement.title,
          description: dictionaryElement.description,
          tags: dictionaryElement.tags,
          replacementText: dictionaryElement.replacer,
          isDarkMode,
        }),
        selector
      );
    });
  },
  2000,
  {}
);

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  let allIds: Array<DataIdDictionaryMapping> = [];

  const normalizedDenyList = msg.denyList || [];
  const isOnDenyList = normalizedDenyList.some((pattern: string) =>
    micromatch.isMatch(window.location.href, pattern)
  );
  if (isOnDenyList) return;

  if (msg.text === "tabIsReady") {
    // Call at least once to care for condition that mutation observer does not
    // track document changes.
    debouncedCallback(allIds, msg.serverDictionary);

    // Start mutation observer
    var observer = new MutationObserver((_changed, _observer) => {
      debouncedCallback(allIds, msg.serverDictionary);
    });
    observer.observe(document, { childList: true, subtree: true });
  }
});
