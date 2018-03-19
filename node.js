const airbnb = require('@neutrinojs/airbnb-base');
const node = require('@neutrinojs/node');
const loaderMerge = require('@neutrinojs/loader-merge');
const lint = require('./lint');
const decorators = require('./decorators');
const versioning = require('./versioning');
const devtool = require('./devtool');

const MODULES = join(__dirname, 'node_modules');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, {
    use: [airbnb],
  });

  neutrino.use(node, options);

  if (options.eslint) {
    neutrino.use(loaderMerge('lint', 'eslint'), options.eslint);
  }

  neutrino.use(decorators);
  neutrino.use(versioning);
  neutrino.use(devtool);
  neutrino.config.resolve.modules.add(MODULES);
  neutrino.config.resolveLoader.modules.add(MODULES);
};
