# Mozilla Frontend Infra Neutrino Preset

`neutrino-preset-mozilla-frontend-infra` is a Neutrino preset that supports building React web applications,
React components, or Node.js applications and linting them with Airbnb's ESLint config,
following the Airbnb styleguide with Mozilla additions. This preset is used for supporting Mozilla's
Frontend Infra team.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]

## Features

This preset exposes a few base presets for working with projects:

- `neutrino-preset-mozilla-frontend-infra/react`:
  - Extends from [`@neutrinojs/react`](https://neutrino.js.org/packages/react)
  - Ability to automatically change asset versions using an optional ID.
  - Supports React Hot Loader v4
  - Skips source-maps when building PRs in CI
- `neutrino-preset-mozilla-frontend-infra/node`:
  - Extends from [`@neutrinojs/node`](https://neutrino.js.org/packages/node)
  - Skips source-maps when building PRs in CI
- `neutrino-preset-mozilla-frontend-infra/react-components`:
  - Extends from [`@neutrinojs/react-components`](https://neutrino.js.org/packages/react-components)
  - Generates two builds: one for our browser-support matrix to use within our own
  web apps; one for use in ES5 builds, such as community project based on Create React App.
  - Skips source-maps when building PRs in CI

Each of these base presets also come with one of the following variants our own
linting customizations. They also bake in Prettier for unifying code style.

- `neutrino-preset-mozilla-frontend-infra/react-lint`:
  - Extends from [`@neutrinojs/airbnb`](https://neutrino.js.org/packages/airbnb)
  - For linting React and React Component-based projects
  - Highly visible during development, fails compilation when building for production
- `neutrino-preset-mozilla-frontend-infra/node-lint`:
  - Extends from [`@neutrinojs/airbnb-base`](https://neutrino.js.org/packages/airbnb-base)
  - For linting Node.js-based projects
  - Highly visible during development, fails compilation when building for production

You do not need to add this linting preset separately unless you are not using one of the
above configurations.
  
If you wish to add [React Styleguidist](https://react-styleguidist.js.org/) for previewing
components in isolation from an application, there is additional middleware for that,
to be used with the `react` and `react-components` presets:  

- `neutrino-preset-mozilla-frontend-infra/styleguide`:
  - Extends from [`neutrino-middleware-styleguidist`](https://github.com/eliperelman/neutrino-middleware-styleguidist)
  - Automatically generated from any components in `src/components/**/*.{js,jsx}`
  - Must be placed in `.neutrinorc.js` before the `react` or `react-components` presets.

  - Production-optimized bundles with Babel minification, easy chunking, and scope-hoisted modules for faster execution
  - Easily extensible to customize your project as needed
- Extends from [@neutrinojs/airbnb](https://neutrino.js.org/packages/airbnb/)
  - Zero upfront configuration necessary to start linting your React project
  - Modern Babel knowledge supporting ES modules, JSX, and more
  - Highly visible during development, fails compilation when building for production
- Also bakes in Prettier for unifying code style, with automatic code-fixing when starting or building.

## Requirements

- Node.js v6.10+
- Yarn or npm client
- Neutrino v8

## Installation

`neutrino-preset-mozilla-frontend-infra` can be installed via the Yarn or npm clients. Inside your project, make sure
`neutrino` and `neutrino-preset-mozilla-frontend-infra` are development dependencies.
**Yarn is highly preferred for Mozilla Frontend Infra projects.**

#### Yarn

```bash
❯ yarn add --dev neutrino neutrino-preset-mozilla-frontend-infra
```

#### npm

```bash
❯ npm install --save-dev neutrino neutrino-preset-mozilla-frontend-infra
```

## Project Layout

`neutrino-preset-mozilla-frontend-infra` follows the standard [project layout](https://neutrino.js.org/project-layout)
specified by Neutrino. This means that by default all project source code should live in a directory named `src` in the
root of the project. This includes JavaScript files, CSS stylesheets, images, and any other assets that would be
available to import your compiled project.

## Project Docs

- [`react`](./react.md)
- [`react-components`](./react-components.md)
- [`node`](./node.md)

[npm-image]: https://img.shields.io/npm/v/neutrino-preset-mozilla-frontend-infra.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-preset-mozilla-frontend-infra.svg
[npm-url]: https://npmjs.org/package/neutrino-preset-mozilla-frontend-infra
