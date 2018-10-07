const { merge } = require('@neutrinojs/compile-loader');

module.exports = neutrino => {
  // Decorators generally need to be enabled *before* other
  // syntax which exists in both normal plugins, and
  // development environment plugins.
  // Tap into the existing Babel options and merge our
  // decorator options *before* the rest of the existing
  // Babel options
  neutrino.config.module
    .rule('compile')
    .use('babel')
    .tap(options =>
      merge(
        {
          plugins: [
            [
              require.resolve('@babel/plugin-proposal-decorators'),
              {
                legacy: true,
              },
            ],
            require.resolve('@babel/plugin-proposal-class-properties'),
          ],
        },
        options
      )
    );
};
