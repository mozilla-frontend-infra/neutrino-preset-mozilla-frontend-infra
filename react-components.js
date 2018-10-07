const copy = require('@neutrinojs/copy');
const lint = require('./react-lint');
const decorators = require('./decorators');
const devtool = require('./devtool');
const localModules = require('./local-modules');
const stage = require('./stage');

const reactComponents = require.resolve('@neutrinojs/react-components');

module.exports = (neutrino, options = {}) => {
  neutrino.use(copy);
  neutrino.use(lint, options.eslint);
  neutrino.use(reactComponents, options);
  neutrino.use(devtool);
  neutrino.use(decorators);
  neutrino.use(localModules);
  neutrino.use(stage, options.staging);
};
