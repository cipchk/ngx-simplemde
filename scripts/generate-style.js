const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');

function compileLess(content, savePath, min) {
  return new Promise((resolve, reject) => {
    const plugins = [];
    if (min) {
      const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});
      plugins.push(cleanCSSPlugin);
    }
    return less.render
      .call(less, content, { plugins })
      .then(({ css }) => {
        fs.writeFileSync(savePath, css);
        resolve();
      })
      .catch(err => reject(err));
  });
}

const sourcePath = path.resolve(__dirname, '../lib');
const targetPath = path.resolve(__dirname, '../publish/src');

fse.copySync(`${sourcePath}/index.less`, `${targetPath}/index.less`);
fse.copySync(`${sourcePath}/styles`, `${targetPath}/styles`);

const lessContent = `@import "${targetPath}/index.less";`;
compileLess(lessContent, path.join(targetPath, 'index.css'), false),
compileLess(lessContent, path.join(targetPath, 'index.min.css'), true)
