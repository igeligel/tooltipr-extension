import ReactDOM from 'react-dom';
import { findAndReplace } from 'dom-find-and-replace';
import PopoverApp from './PopoverApp'
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
    ).toString(16),
  );
};

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log('test test');
  // If the received message has the expected format...
  if (msg.text === 'report_back') {
    console.log('adwwadwad');
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    sendResponse(document.all[0].outerHTML);

    // Collect all nodes to change
    const allIds: Array<any> = [];
    debugger
    // @ts-ignore
    document.body.innerHTML = findAndReplace(document.body.innerHTML, {
      find: 'GAAP',
      replace: (offsetText, foundText) => {
        const uuid = uuidv4();
        const bold = document.createElement('span');
        bold.textContent = offsetText;
        bold.id = uuid;
        bold.style.display = "inline-block"
        bold.className = 'tooltipr-component-root'
        allIds.push(uuid);
        return bold;
      },
    });

    allIds.forEach(uuid => {
      const selector = document.getElementById(uuid);
      if (!selector) return;
      ReactDOM.render(PopoverApp, selector);
    })
  }
});
