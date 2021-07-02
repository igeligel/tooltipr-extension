import path from "path";
import fs from "fs";
import { zipDirectory } from "./zipDirectory";
import { cleanDirectory } from "./cleanDirectory";
import { buildWebpack } from "./buildWebpack";
import { changeManifestForFirefox } from "./firefoxManifest";

const buildFirefoxRelease = async () => {
  console.log("Clearing /dist directory");
  const distPath = path.resolve(__dirname, "../../dist");
  await cleanDirectory(distPath);

  const { pathToManifest, oldManifestBackup } = changeManifestForFirefox();

  console.log("Starting webpack build");
  await buildWebpack();

  const bundlePath = path.resolve(
    __dirname,
    "../../tooltipr-release-firefox.zip"
  );
  console.log(`Bundling
  ${distPath} to
  ${bundlePath}`);

  await zipDirectory(distPath, bundlePath);
  fs.writeFileSync(pathToManifest, oldManifestBackup);
};

const run = async () => {
  try {
    await buildFirefoxRelease();
  } catch (e) {
    console.error(e);
    // Deal with the fact the chain failed
  }
};

run();
