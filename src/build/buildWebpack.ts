import webpack from "webpack";
import webpackProductionConfig from "../../webpack/webpack.prod.js";

export const buildWebpack = (): Promise<webpack.Stats> => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackProductionConfig);
    compiler.run((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};
