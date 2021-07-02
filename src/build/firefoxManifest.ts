import path from "path";
import { zipDirectory } from "./zipDirectory";
import { cleanDirectory } from "./cleanDirectory";
import { buildWebpack } from "./buildWebpack";
import deepmerge from "deepmerge";
import fs from "fs";

const firefoxManifest = {
  applications: {
    gecko: {
      id: "tooltipr@gmail.com",
      strict_min_version: "53.0",
    },
  },
};

export const changeManifestForFirefox = () => {
  const pathToManifest = path.resolve(__dirname, "../../public/manifest.json");
  const oldManifestBackup = fs.readFileSync(pathToManifest).toString();
  const manifestJson = JSON.parse(oldManifestBackup);

  // We need to extend the manifest.json
  const result = deepmerge(manifestJson, firefoxManifest);
  fs.writeFileSync(pathToManifest, JSON.stringify(result, null, 2));
  return {
    pathToManifest,
    oldManifestBackup,
  };
};
