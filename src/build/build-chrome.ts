import path from "path";
import { zipDirectory } from "./zipDirectory";
import { cleanDirectory } from "./cleanDirectory";
import { buildWebpack } from "./buildWebpack";

const buildChromeRelease = async () => {
  console.log("Clearing /dist directory");
  const distPath = path.resolve(__dirname, "../../dist");
  await cleanDirectory(distPath);

  console.log("Starting webpack build");
  await buildWebpack();

  const bundlePath = path.resolve(
    __dirname,
    "../../tooltipr-release-chrome.zip"
  );
  console.log(`Bundling
  ${distPath} to
  ${bundlePath}`);
  await zipDirectory(distPath, bundlePath);
};

const run = async () => {
  try {
    await buildChromeRelease();
  } catch (e) {
    console.error(e);
  }
};

run();
