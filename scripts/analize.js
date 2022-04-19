process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webConfigProd = require('react-scripts/config/webpack.config')(
  'production'
);
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const green = (text) => chalk.green.bold(text);
webConfigProd.plugins.push(new BundleAnalyzerPlugin());
webConfigProd.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')} ${green(
      '[:percent]'
    )} ${green('[:elapsed seconds]')} - :msg`,
  })
);
webpack(webConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
});
