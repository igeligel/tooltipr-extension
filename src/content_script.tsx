import ReactDOM from "react-dom";
import {escape, unescape} from 'html-escaper';
import outOfCharacter from 'out-of-character'
import PopoverApp from "./PopoverApp";
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

type Dictionary = Record<
  string,
  { replacer: string; title: string; description: string; tags: Array<string> }
>;

const dictionary: Dictionary = {
  "5984e2f2-a800-4567-8cd8-a643bcf5fdef": {
    replacer: "GAAP",
    title: "Generally Accepted Accounting Principles",
    description:
      "is the accounting standard adopted by the U.S. Securities and Exchange Commission (SEC).",
    tags: ["tooltipr", "product"],
  },
  "d41ae5de-3d47-4669-93b3-a10e771dde10": {
    replacer: "FASB",
    title: "Financial Accounting Standards Board",
    description: `is really great because of Julius`,
    tags: ["tooltipr", "fintech"],
  },
  "3884dca8-09b9-478b-a2a5-21d4ac77aa5f": {
    replacer: "Gen Z",
    title: "Generation Z",
    description: `is a really nice generation`,
    tags: ["tooltipr", "fintech"],
  },
  "8b7a0311-2ac7-43fd-b3fa-a6657f6f6078": {
    replacer: "Beekeeper Studio",
    title: "Beekeeper Studio",
    description: `is a cross-platform SQL editor and database manager available for Linux, Mac, and Windows.`,
    tags: ["tooltipr", "onboarding", "tech"]
  },
  "476f12af-e9e5-48f7-af3d-e693e81db74f": {
    replacer: "VS Code",
    title: "Visual Studio Code",
    description: "is a source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git.",
    tags: ["tooltipr", "onboarding", "tech"]
  }
};

const flatDictionary = Object.entries(dictionary);

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

const replaceText = (): Array<DataIdDictionaryMapping> => {
  const allIds: Array<DataIdDictionaryMapping> = [];

  const iterator = document.createNodeIterator(document, NodeFilter.SHOW_TEXT, {
    acceptNode: () => NodeFilter.FILTER_ACCEPT,
  });

  let temp: Node = null;

  const allDomNodes: Array<Node> = [];

  while ((temp = iterator.nextNode())) {
    allDomNodes.push(temp);
  }

  const allGaapNodes = allDomNodes.filter((e) => {
    const unescapedContent = outOfCharacter.replace(unescape(e.textContent))

    return flatDictionary.some(([key, value]) => {
      return unescapedContent.includes(value.replacer);
    })
  });

  allGaapNodes.forEach((node) => {
    const unescapedContent = outOfCharacter.replace(unescape(node.textContent))

    const flatDictionaryItem = flatDictionary.find(([key, value]) => {
      return unescapedContent.includes(value.replacer)
    })

    const [flatDictionaryItemKey, flatDictionaryItemValue] = flatDictionaryItem

    const parent = node.parentElement;
    if (!parent) {
      return;
    }

    if (unescapedContent === flatDictionaryItemValue.replacer) {
      const { newElement, uuid } = spanGenerator(flatDictionaryItemValue.replacer);
      allIds.push({ dataId: uuid, dictionaryId: flatDictionaryItemKey })
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

      const { newElement, uuid } = spanGenerator(flatDictionaryItemValue.replacer);
      allIds.push({ dataId: uuid, dictionaryId: flatDictionaryItemKey })
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

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  let allIds: Array<DataIdDictionaryMapping> = [];

  // If the received message has the expected format...
  if (msg.text === "report_back") {
    setTimeout(() => {
      allIds = replaceText();

      console.log({allIds})

      allIds.forEach((idPair) => {
        const selector = document.querySelector(
          `[data-tooltipr-id="${idPair.dataId}"]`
        );
        if (!selector) return;
        const dictionaryElement = dictionary[idPair.dictionaryId];
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
    }, 2000);
  }
});
