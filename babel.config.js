const util = require('util');

const PRESETS = ['@babel/preset-env'];
const PLUGINS = [];

module.exports = function(api) {
  const config = {};

  if (api.env('production')) {
    addPreset('minify');
    config.comments = false;
  } else {
  }

  config.presets = PRESETS;
  config.plugins = PLUGINS;

  console.log('Building with Babel config:');
  console.log(`ENV: ${api.env()}`);
  console.log(
    util.inspect(config, { depth: Infinity, colors: true, compact: false }),
  );

  return config;
};

function addPlugin(name, config) {
  add(PLUGINS, name, config);
}

function addPreset(name, config) {
  add(PRESETS, name, config);
}

function add(array, name, config) {
  if (!config) {
    return array.push(name);
  }
  array.push([name, config]);
}
