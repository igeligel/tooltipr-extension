import rimraf from "rimraf";

export const cleanDirectory = (distPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    rimraf(distPath, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};
