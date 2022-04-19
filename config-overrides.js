const path = require('path');
const fs = require('fs');
const {
  override,
  fixBabelImports,
  addWebpackPlugin,
} = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
const { getLessVars } = require('antd-theme-generator');

const themeVariables = getLessVars(
  path.join(__dirname, './src/styles/vars.less')
);
const darkVars = {
  ...themeVariables,
  ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'),
  '@picker-basic-cell-active-with-range-color': 'darken(@primary-color, 20%)',
  ...getLessVars('./src/styles/dark.less'),
};
const lightVars = {
  ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'),
  ...themeVariables,
  ...getLessVars('./src/styles/light.less'),
};
fs.writeFileSync('./src/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/light.json', JSON.stringify(lightVars));
fs.writeFileSync('./src/theme.json', JSON.stringify(themeVariables));

const options = {
  stylesDir: path.join(__dirname, './src'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  themeVariables: Array.from(
    new Set([
      ...Object.keys(darkVars),
      ...Object.keys(lightVars),
      ...Object.keys(themeVariables),
    ])
  ),
  generateOnce: true, // generate color.less on each compilation
};

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  })
);
