const airbnb = require('neutrino-preset-airbnb-base');
const banner = require('neutrino-middleware-banner');
const loaderMerge = require('neutrino-middleware-loader-merge');
const react = require('neutrino-preset-react');
const { merge } = require('neutrino-middleware-compile-loader');
const nodeExternals = require('webpack-node-externals');
const { readdirSync } = require('fs');
const { basename, join } = require('path');

const MODULES = join(__dirname, 'node_modules'); // eslint-disable-line padding-line-between-statements

module.exports = (neutrino, options = {}) => {
  if (
    (options.components || options.library) &&
    neutrino.options.output.endsWith('build')
  ) {
    neutrino.options.output = 'lib'; // eslint-disable-line no-param-reassign

    try {
      const pkg = require(join(neutrino.options.root, 'package.json')); // eslint-disable-line
      const hasSourceMap =
        (pkg.dependencies && 'source-map-support' in pkg.dependencies) ||
        (pkg.devDependencies && 'source-map-support' in pkg.devDependencies);

      if (hasSourceMap) {
        neutrino.use(banner);
      }
    } catch (ex) {} // eslint-disable-line
  }

  neutrino.config.resolve.modules.add(MODULES);
  neutrino.config.resolveLoader.modules.add(MODULES);

  neutrino.use(airbnb, {
    eslint: {
      plugins: ['eslint-plugin-react', 'eslint-plugin-prettier'],
      baseConfig: {
        extends: [
          'plugin:react/recommended',
          'eslint-config-prettier',
          'eslint-config-prettier/react'
        ]
      },
      rules: {
        // There are external dependencies we sometimes can't control, and
        // renaming their variable to lowercase would not be idiomatic
        'babel/new-cap': 'off',
        // Allow using class methods with static/non-instance functionality
        // React lifecycle methods commonly do not use an instance context for anything
        'class-methods-use-this': 'off',
        // We turn off consistent-return to allow more efficient early returning from functions
        'consistent-return': 'off',
        // Allow console during development, otherwise throw an error
        'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
        // Shadowing variables can be useful with array reduction and other FP calls
        'no-shadow': 'off',
        // Add extra lines between certain statements to improve readability and breathe-ability via whitespace
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          {
            blankLine: 'never',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var']
          },
          { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
          {
            blankLine: 'always',
            prev: '*',
            next: ['if', 'do', 'for', 'switch', 'try', 'while']
          },
          { blankLine: 'always', prev: '*', next: 'return' }
        ],
        // Our frontend strives to adopt functional programming practices, so we prefer const over let
        'prefer-const': 'error',
        // Use prettier to automatically format the style of application code
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            trailingComma: 'none',
            bracketSpacing: true,
            jsxBracketSameLine: true
          }
        ],
        // Validate JSX has key prop when in array or iterator
        'react/jsx-key': 'error',
        // Prevent comments from being inserted as text nodes
        'react/jsx-no-comment-textnodes': 'error',
        // Prevent usage of unsafe target="_blank", ensure anchors also have rel="noreferrer noopener"
        'react/jsx-no-target-blank': 'error',
        // Ensure JSX components are PascalCase
        'react/jsx-pascal-case': 'error',
        // Disable forced validation of React prop types
        'react/prop-types': 'off'
      }
    }
  });

  if (options.eslint) {
    neutrino.use(loaderMerge('lint', 'eslint'), options.eslint);
  }

  if (options.cssModules) {
    neutrino.config.module
      .rule('plain-style')
      .test(/\.css$/)
      .include.add(neutrino.options.node_modules)
      .end()
      .use('style')
      .loader(require.resolve('style-loader'))
      .end()
      .use('css')
      .loader(require.resolve('css-loader'));

    neutrino.config.module
      .rule('style')
      .exclude.add(neutrino.options.node_modules)
      .end()
      .use('css')
      .options({ modules: true });
  }

  if (!options.react) {
    Object.assign(options, { react: {} });
  }

  const reactOptions =
    options.library || options.components
      ? Object.assign(options.react, {
          html: options.components ? { title: 'React Preview' } : undefined,
          babel: merge(options.react.babel || {}, {
            presets: [
              [
                'babel-preset-env',
                {
                  targets: {
                    browsers: [
                      'last 1 Chrome versions',
                      'last 1 Firefox versions',
                      'last 1 Edge versions',
                      'last 1 Safari versions',
                      'last 1 iOS versions'
                    ]
                  }
                }
              ]
            ]
          })
        })
      : options.react;

  neutrino.use(react, reactOptions);

  if (options.envs) {
    neutrino.config.plugin('env').tap(envs => [...envs, ...options.envs]);
  }

  neutrino.config.module
    .rule('compile')
    .use('cache')
    .before('babel')
    .loader(require.resolve('cache-loader'));

  if (options.components) {
    const components = join(neutrino.options.source, 'components');

    neutrino.config.when(
      neutrino.options.command === 'start',
      () => {
        neutrino.options.entry = 'stories'; // eslint-disable-line no-param-reassign
      },
      () => {
        neutrino.config.entryPoints.delete('index');
        readdirSync(components).map(component =>
          neutrino.config
            .entry(basename(component, '.js'))
            .add(join(components, component))
        );
      }
    );
  }

  if (options.library || options.components) {
    const name =
      typeof options.library === 'string' ? options.library : '[name]';

    neutrino.config
      .devtool('source-map')
      .performance.hints('warning')
      .end()
      .output.filename('[name].js')
      .library(name)
      .libraryTarget('umd')
      .umdNamedDefine(true);

    neutrino.config.when(process.env.NODE_ENV !== 'test', config => {
      config.plugins
        .delete('html')
        .end()
        .externals([nodeExternals()]);
    });

    neutrino.config.when(
      neutrino.config.plugins.has('runtime-chunk'),
      config => {
        config.plugins
          .delete('runtime-chunk')
          .delete('vendor-chunk')
          .delete('named-modules')
          .delete('named-chunks')
          .delete('name-all');
      }
    );
  }
};
