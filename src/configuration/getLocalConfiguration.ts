const LOCAL_CONFIGURATION_KEY = "TOOLTIPR_LOCAL_CONFIG";

type GlossarySelection = {
  uuid: string;
  allowAll: boolean;
  selection: Array<{ uuid: string }>;
};

export type LocalConfiguration = {
  userId?: number;
  personalGlossaries: Array<GlossarySelection>;
  organizationGlossaries: Array<GlossarySelection>;
  publicGlossaries: Array<GlossarySelection>;
};

const initialConfig = {
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
      const config = result[LOCAL_CONFIGURATION_KEY];
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
