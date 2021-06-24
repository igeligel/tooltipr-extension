const ACCOUNT_MODE = "ACCOUNT_MODE";

export type AccountMode = "USER" | "ANONYMOUS";

export const getAccountModeFromStore = (): Promise<AccountMode | null> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(ACCOUNT_MODE, (result) => {
      if (!result) return resolve(null);
      if (!(ACCOUNT_MODE in result)) {
        return resolve(null);
      }
      // @ts-ignore
      const accountMode = result[ACCOUNT_MODE];
      return resolve(accountMode);
    });
  });
};

export const setAccountModeToStore = (
  accountMode: AccountMode
): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [ACCOUNT_MODE]: accountMode }, () => {
      resolve();
    });
  });
};
