import ReactDOM from "react-dom";
import { escape, unescape } from "html-escaper";
import outOfCharacter from "out-of-character";
import PopoverApp from "./PopoverApp";
import _ from "lodash";
import { Dictionary } from "./types";
import { getLocalConfiguration } from "./configuration/getLocalConfiguration";
// document.onreadystatechange = function () {
//   if (document.readyState === 'interactive') {
//     // ;
//   }
// };

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

  const iterator = document.createNodeIterator(document, NodeFilter.SHOW_TEXT, {
    acceptNode: () => NodeFilter.FILTER_ACCEPT,
  });

  let temp: Node = null;

  const allDomNodes: Array<Node> = [];

  while ((temp = iterator.nextNode())) {
    allDomNodes.push(temp);
  }

  const allGaapNodes = allDomNodes.filter((domNode) => {
    const ignoredTypes = ["STYLE", "SCRIPT"];
    // @ts-ignore
    if (ignoredTypes.includes(domNode.parentNode.tagName)) return false;
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
    allIds = replaceText(serverDictionary);

    console.log({ allIds });

    allIds.forEach((idPair) => {
      const selector = document.querySelector(
        `[data-tooltipr-id="${idPair.dataId}"]`
      );
      if (!selector) return;
      const dictionaryElement = serverDictionary[idPair.dictionaryId];
      if (!dictionaryElement) return;
      ReactDOM.render(
        PopoverApp({
          title: dictionaryElement.title,
          description: dictionaryElement.description,
          tags: dictionaryElement.tags,
          replacementText: dictionaryElement.replacer,
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

  if (msg.text === "report_back") {
    var observer = new MutationObserver((_changed, _observer) => {
      debouncedCallback(allIds, msg.serverDictionary);
    });

    console.log("Observer started");
    observer.observe(document, { childList: true, subtree: true });
  }
});
