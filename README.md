<p align="center">
  <img width="100px" src="./docs/logo.svg" alt="Tooltipr Logo" />
  <h1 align="center">tooltipr</h1>
  <br/>
  <p align="center">
    <img src="https://github.com/igeligel/tooltipr-extension/workflows/build/badge.svg" alt="Github Build" />
    <a href="https://chrome.google.com/webstore/detail/tooltipr/amlhfkcdbngifgpdgnaihjamanlejngi/"><img src="https://img.shields.io/chrome-web-store/stars/amlhfkcdbngifgpdgnaihjamanlejngi?label=Chrome%20Rating&style=flat&logo=google" alt="Chrome Ratings" /></a>
    <a href="https://chrome.google.com/webstore/detail/tooltipr/amlhfkcdbngifgpdgnaihjamanlejngi/"><img src="https://img.shields.io/chrome-web-store/users/amlhfkcdbngifgpdgnaihjamanlejngi?label=Chrome%20Users&style=flat&logo=google" alt="Chrome Users" /></a>
    <a href="https://addons.mozilla.org/en-US/firefox/addon/tooltipr/"><img src="https://img.shields.io/amo/stars/tooltipr?label=Firefox%20Rating&style=flat&logo=firefox" alt="Firefox Ratings" /></a>
    <a href="https://addons.mozilla.org/en-US/firefox/addon/tooltipr/"><img src="https://img.shields.io/amo/users/tooltipr?label=Firefox%20Users&style=flat&logo=firefox" alt="Firefox Users" /></a>
  </p>
</p>

> 🦮 A web extension that enables you to see tooltips for common topics and integrates with tooltipr.com to show you individual tooltips, set up by you or your team. 🦮

![A banner showing the functionality of tooltipr](./docs/promo-banner.png)

## 📝 Installation instructions - For users

tooltipr is a browser extension. Unfortunately, at the point of writing this you cannot install the extension via the Chrome Extension Store or the Firefox extension store.

For now the installation has to be done manually, you can find a guide below:

<details>
 <summary>Chrome (official)</summary>

1. Head over to the [Chrome Extension Page](https://chrome.google.com/webstore/detail/tooltipr/amlhfkcdbngifgpdgnaihjamanlejngi)
2. Click Add on Chrome

</details>

<details>
 <summary>Firefox (official)</summary>

1. Head over to the [Firefox Add-On Page of tooltipr](https://addons.mozilla.org/en-US/firefox/addon/tooltipr/)
2. Add the Add-On to your Firefox

</details>

<details>
 <summary>Chrome (manually - not recommended)</summary>

1. Head over to our [releases tab](https://github.com/igeligel/tooltipr-extension/releases): https://github.com/igeligel/tooltipr-extension/releases
2. You will find a `tooltipr-release-chrome.zip` file at the bottom of the release. Download this file. Put it somewhere where you do not delete it.
3. In Chrome, go to the extensions page ([`chrome://extensions/`](about:debugging#/runtime/this-firefox)). Just paste this into the URL bar.
4. Enable Developer Mode on the top right of the screen.
5. Drag the `tooltipr-release-chrome.zip` file anywhere on the page to import it (do not delete zip afterward).

</details>

## 💻 Installation instructions - Developers

If you want to develop and contribute to this project, or simply want to create a build of this extension you will need to have the following requirements installed on your machine:

- [Node.js v14](https://nodejs.org/)
- yarn

After that you will need to install the dependencies with:

```bash
yarn
```

## 🏗️ Build

You can build this project in different ways. It is important though that you run through the installation instructions for developers first. For a simple build that works in most browsers simply use:

```bash
yarn build
```

<details>
 <summary>For Firefox Production Build</summary>

Go to the main directory and use the following command

```
yarn build:firefox
```

This will create a zip file in the root directory called similar to `tooltipr-release-firefox.zip`.

</details>

<details>
 <summary>For Chrome Production Build</summary>

Go to the main directory and use the following command

```
yarn build:chrome
```

This will create a zip file in the root directory called similar to `tooltipr-release-chrome.zip`.

</details>

## 🧑‍💻 Development

To develop the extension run the installation commands. Once this is done and the dependencies are installed you can start the development process with:

```bash
yarn watch
```

This will generate a `/dist` directory with all the necessary files to load the extension in the browser.

We recommend to use Google Chrome as a development browser. Simply go to `chrome://extensions/` (in your URL bar) and enable "Developer mode" on the top right if not activated yet. Then click on the "Load unpacked" button on the top left. Then select the `./dist` folder of this repository or the manifest.json file that is in that folder. And now you can develop the extension.

## 🤔 FAQ

No questions yet, so no answers 😶

## ⚖️ License

This repository is published under the Creative Commons Attribution-NonCommercial 3.0 Unported license. You can find a reference [here](https://creativecommons.org/licenses/by-nc/3.0/).
