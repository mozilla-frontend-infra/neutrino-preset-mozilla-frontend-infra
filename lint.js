const loaderMerge = require('@neutrinojs/loader-merge');

module.exports = (neutrino, options = {}) => {
  if (!options.use) {
    throw new Error('The linting middleware requires a base middleware to extend');
  }

  if (!Array.isArray(options.use)) {
    throw new Error('The linting middleware requires an array pair of [base, overrides]')
  }

  const [airbnb, overrides] = options.use;

  neutrino.use(airbnb, {
    eslint: {
      emitWarning: process.env.NODE_ENV === 'development',
      baseConfig: {
        extends: [
          'plugin:react/recommended',
          'eslint-config-prettier',
        ]
      },
      plugins: ['eslint-plugin-prettier'],
      rules: {
        // Specify the maximum length of a line in your program
        'max-len': ['error', 80, 2, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
        // Allow using class methods with static/non-instance functionality
        // React lifecycle methods commonly do not use an instance context for anything
        'class-methods-use-this': 'off',
        // Allow console during development, otherwise throw an error
        'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
        // Allow extra parentheses since multiline JSX being wrapped in parens is considered idiomatic
        'no-extra-parens': 'off',
        // Our frontend strives to adopt functional programming practices, so we prefer const over let
        'prefer-const': 'error',
        'prettier/prettier': ['error', {
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: true,
        }],
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
          { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
          { blankLine: 'always', prev: '*', next: ['if', 'do', 'for', 'switch', 'try', 'while'] },
          { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'consistent-return': 'off',
        'no-unused-expressions': 'off',
        'no-shadow': 'off',
        'no-return-assign': 'off',
        'babel/new-cap': 'off',
        'no-mixed-operators': 'off',
      },
    },
  });

  if (overrides) {
    neutrino.use(loaderMerge('lint', 'eslint'), overrides);
  }
};
