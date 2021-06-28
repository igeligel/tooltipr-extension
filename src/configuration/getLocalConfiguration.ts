const LOCAL_CONFIGURATION_KEY = "TOOLTIPR_LOCAL_CONFIG";

type GlossaryTermConfiguration = {
  uuid: string;
  allowList: Array<string>;
  denyList: Array<string>;
};

export type GlossarySelection = {
  uuid: string;
  allowAll: boolean;
  allowList: Array<string>;
  denyList: Array<string>;
  terms: Array<GlossaryTermConfiguration>;
};

export type LocalConfiguration = {
  userId?: number;
  personalGlossaries: Array<GlossarySelection>;
  organizationGlossaries: Array<GlossarySelection>;
  publicGlossaries: Array<GlossarySelection>;
  allowList: Array<string>;
  denyList: Array<string>;
};

const initialConfig: LocalConfiguration = {
  allowList: [],
  denyList: [],
  organizationGlossaries: [],
  personalGlossaries: [],
  publicGlossaries: [],
};

export const getLocalConfiguration = (): Promise<LocalConfiguration> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(LOCAL_CONFIGURATION_KEY, (result) => {
      if (!(LOCAL_CONFIGURATION_KEY in result)) {
        setLocalConfiguration(initialConfig);
        return resolve(initialConfig);
      }
      const config = result[LOCAL_CONFIGURATION_KEY] as LocalConfiguration;
      return resolve(config);
    });
  });
};

export const setLocalConfiguration = (
  configuration: LocalConfiguration
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      { [LOCAL_CONFIGURATION_KEY]: configuration },
      () => {
        resolve(true);
      }
    );
  });
};
