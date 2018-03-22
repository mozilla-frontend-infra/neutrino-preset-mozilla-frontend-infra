const fork = require('@neutrinojs/fork');
const merge = require('deepmerge');
const lint = require('./react-lint');
const decorators = require('./decorators');
const devtool = require('./devtool');
const localModules = require('./local-modules');

const reactComponents = require.resolve('@neutrinojs/react-components');

module.exports = (neutrino, options = {}) => {
  neutrino.use(lint, options.eslint);
  neutrino.use(reactComponents, options);
  neutrino.use(devtool);
  neutrino.config.when(neutrino.options.command === 'build', () => {
    neutrino.use(fork, {
      configs: {
        'components-cra': {
          use: [
            [
              reactComponents,
              merge(options, {
                clean: false,
              }),
            ],
            require.resolve('./react-components-cra'),
          ],
        },
      },
    });
  });
  neutrino.use(decorators);
  neutrino.use(localModules);
};
