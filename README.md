# Mozilla Frontend Infra Neutrino React Preset

`neutrino-preset-mozilla-frontend-infra` is a Neutrino preset that supports building React web applications and linting
them with Airbnb's ESLint config, following the Airbnb styleguide with Mozilla additions. This preset is used for web
projects within Mozilla's Frontend Infra team.

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]

## Features

- Extends from [`@neutrinojs/react`](https://neutrino.js.org/packages/react/)
  - Zero upfront configuration necessary to start developing and building a React web app
  - Modern Babel compilation adding JSX, object rest spread syntax, and class properties.
  - Support for React Hot Loader
  - Write JSX in .js or .jsx files
  - Automatic import of React.createElement, no need to import react or React.createElement yourself
- Ability to automatically change asset versions using an optional ID.
- Extends from [@neutrinojs/web](https://neutrino.js.org/packages/web/)
  - Modern Babel compilation supporting ES modules, last 2 major browser versions, async functions, and dynamic imports
  - webpack loaders for importing HTML, CSS, images, icons, fonts, and web workers
  - webpack Dev Server during development
  - Automatic creation of HTML pages, no templating necessary
  - Automatic stylesheet extraction; importing stylesheets into modules creates bundled external stylesheets
  - Pre-configured to support CSS Modules via *.module.css file extensions
  - Hot Module Replacement support including CSS
  - Tree-shaking to create smaller bundles
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

`neutrino-preset-mozilla-frontend-infrab` can be installed via the Yarn or npm clients. Inside your project, make sure
`neutrino` and `neutrino-preset-mozilla-frontend-infra` are development dependencies.
You will also need React and React DOM for actual
React development. **Yarn is highly preferred for Mozilla web projects.**

#### Yarn

```bash
❯ yarn add --dev neutrino neutrino-preset-mozilla-frontend-infra
❯ yarn add react react-dom
```

#### npm

```bash
❯ npm install --save-dev neutrino neutrino-preset-mozilla-frontend-infra
❯ npm install --save react react-dom
```

## Project Layout

`neutrino-preset-mozilla-frontend-infra` follows the standard [project layout](https://neutrino.js.org/project-layout)
specified by Neutrino. This means that by default all project source code should live in a directory named `src` in the
root of the project. This includes JavaScript files, CSS stylesheets, images, and any other assets that would be
available to import your compiled project.

## Quickstart

After installing Neutrino and the this preset, add a new directory named `src` in the root of the project, with
a single JS file named `index.js` in it.

```bash
❯ mkdir src && touch src/index.jsx
```

This React preset exposes an element in the page with an ID of `root` to which you can mount your application. Edit
your `src/index.jsx` file with the following:

```jsx
import React from 'react';
import { render } from 'react-dom';

render(<h1>Hello world!</h1>, document.getElementById('root'));
```

Now edit your project's package.json to add commands for starting, building, and linting the application:

```json
{
  "scripts": {
    "start": "neutrino start",
    "build": "neutrino build",
    "lint": "neutrino lint"
  }
}
```

Then create a `.neutrinorc.js` file in the root of the project, add this preset to your use array:

```js
module.exports = {
  use: ['neutrino-preset-mozilla-frontend-infra']
};
```

Start the app, then open a browser to the address in the console:

#### Yarn

```bash
❯ yarn start

✔ Development server running on: http://localhost:5000
✔ Build completed
```

#### npm

```bash
❯ npm start

✔ Development server running on: http://localhost:5000
✔ Build completed
```

## Building

neutrino-preset-mozilla-frontend-infra` builds static assets to the `build` directory by default when running
`neutrino build`. Using the quick start example above as a reference:

```bash
❯ yarn build

✔ Building project completed
Hash: b26ff013b5a2d5f7b824
Version: webpack 3.10.1
Time: 9773ms
                           Asset       Size    Chunks             Chunk Names
   index.dfbad882ab3d86bfd747.v1.js     181 kB     index  [emitted]  index
 runtime.3d9f9d2453f192a2b10f.v1.js    1.51 kB   runtime  [emitted]  runtime
                      index.html  846 bytes            [emitted]
✨  Done in 4.62s.
```

You can either serve or deploy the contents of this `build` directory as a static site.

## Static assets

If you wish to copy files to the build directory that are not imported from application code, you can place
them in a directory within `src` called `static`. All files in this directory will be copied from `src/static`
to `build/static`.

## Paths

The `neutrino-preset-web` preset loads assets relative to the path of your application by setting Webpack's
[`output.publicPath`](https://webpack.js.org/configuration/output/#output-publicpath) to `./`. If you wish to load
assets instead from a CDN, or if you wish to change to an absolute path for your application, customize your build to
override `output.publicPath`. See the [Customizing](#Customizing) section below.

## Preset options

You can provide custom options and have them merged with this preset's default options to easily affect how this
preset builds. You can modify the React and ESLint preset settings from `.neutrinorc.js` by overriding with an options
object. Use an array pair instead of a string to supply these options in `.neutrinorc.js`.

The following shows how you can pass an options object to this preset and override its options. See the
[Web documentation](https://neutrino.js.org/presets/neutrino-preset-web#presetoptions) or
[Airbnb ESLint documentation](https://neutrino.js.org/presets/neutrino-preset-airbnb-base#presetoptions)
for specific options you can override with this object.

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra', {
      eslint: {
        rules: {
          semi: 'off'
        }
      },
      react: {
        // Example: disable Hot Module Replacement
        hot: false,
  
        // Example: change the page title
        html: {
          title: 'Epic React App'
        }
      }
    }]
  ]
};
```

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`neutrino-preset-mozilla-frontend-infra` does not use any additional named rules, loaders, or plugins that aren't already in use by the
Web preset. See the [Web documentation customization](https://neutrino.js.org/presets/neutrino-preset-web#customizing)
for preset-specific configuration to override.

### Overriding configuration

By following the [customization guide](https://neutrino.js.org/customization) and knowing the rule, loader, and plugin IDs from
`neutrino-preset-web`, you can override and augment the build by providing a function to your `.neutrinorc.js` use
array. You can also make these changes from the Neutrino API in custom middleware.

#### Vendoring

By defining an entry point named `vendor` you can split out external dependencies into a chunk separate
from your application code.

_Example: Put React and React DOM into a separate "vendor" chunk:_

```js
module.exports = {
  use: [
    'neutrino-preset-mozilla-frontend-infra',
    (neutrino) => {
      neutrino.config
        .entry('vendor')
          .add('react')
          .add('react-dom');
    }
  ]
};
```

## Hot Module Replacement

While `neutrino-preset-react` supports Hot Module Replacement your app using React Hot Loader, it does require some
application-specific changes in order to operate.

First, install `react-hot-loader` as a dependency, this **must** be React Hot Loader v3. You can use React Hot Loader
v4, but it takes configuration changes to use.

#### Yarn

```bash
❯ yarn add react-hot-loader@next
```

#### npm

```bash
❯ npm install --save react-hot-loader@next
```

---

- From your `index` entry point (defaults to `src/index.*` from `neutrino.options.entry`), import an `AppContainer`
from `react-hot-loader`. The main file may be named `index.js` or `index.jsx`. The extension is resolved by Webpack.
- Wrap your top-level React component in the `AppContainer`.
- Perform the application render in a reusable function for initial load and subsequent reloads.
- Add the `hot` acceptance to call this function.

For example:

```jsx
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MyApp from './MyApp';

const load = () => render((
  <AppContainer>
    <MyApp />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./MyApp', load);
}

load();
```

[npm-image]: https://img.shields.io/npm/v/neutrino-preset-mozilla-frontend-infra.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-preset-mozilla-frontend-infra.svg
[npm-url]: https://npmjs.org/package/neutrino-preset-mozilla-frontend-infra
