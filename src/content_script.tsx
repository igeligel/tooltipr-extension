import ReactDOM from "react-dom";
import { findAndReplace } from "dom-find-and-replace";
import PopoverApp from "./PopoverApp";
import findAndReplaceDOMText from "findAndReplaceDOMText";
// document.onreadystatechange = function () {
//   if (document.readyState === 'interactive') {
//     // debugger;
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

const dictionary = {
  "5984e2f2-a800-4567-8cd8-a643bcf5fdef": {
    replacer: 'GAAP',
    title: "Knowledge Management Hub",
    description:
      "is the main control center of tooltipr to manage user accounts and company-internal keyword directories",
    tags: ["tooltipr", "product"],
  },
};

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("test test");
  const allIds: Array<any> = [];

  // If the received message has the expected format...
  if (msg.text === "report_back") {
    setTimeout(() => {
      // Object.entries(dictionary).forEach(([key, value]) => {
      //   value.replacer

      // })


      const nodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      let node;
      while ((node = nodes.nextNode())) {
        let text = node.nodeValue;
        if (text && text.includes("GAAP")) {
          node.parentNode.innerHTML = findAndReplace(
            node.parentNode.innerHTML,
            {
              find: "GAAP",
              replace: (offsetText, foundText) => {
                const uuid = uuidv4();
                const bold = document.createElement("span");
                bold.textContent = offsetText;
                bold.id = uuid;
                bold.style.display = "inline-block";
                bold.className = "tooltipr-component-root";
                allIds.push(uuid);
                return bold;
              },
            }
          );
        }
      }

      const fullNodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT
      );
      let fullNode;
      while ((fullNode = fullNodes.nextNode())) {
        if (
          fullNode.innerHTML.includes("GAAP") &&
          allIds.every((id) => !fullNode.outerHTML.includes(id))
        ) {
          fullNode.innerHTML = findAndReplace(fullNode.innerHTML, {
            find: "GAAP",
            replace: (offsetText, foundText) => {
              const uuid = uuidv4();
              const bold = document.createElement("span");
              bold.textContent = offsetText;
              bold.id = uuid;
              bold.style.display = "inline-block";
              bold.className = "tooltipr-component-root";
              allIds.push(uuid);
              return bold;
            },
          });
        }
      }

      allIds.forEach((uuid) => {
        const selector = document.getElementById(uuid);
        if (!selector) return;
        ReactDOM.render(
          PopoverApp({
            title: "Knowledge Management Hub",
            description:
              "is the main control center of tooltipr to manage user accounts and company-internal keyword directories",
            tags: ["tooltipr", "product"],
            replacementText: "GAAP",
          }),
          selector
        );
      });
    }, 2000);
  }
});
