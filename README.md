# Mozilla R&P Web Neutrino React Preset
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads]][npm-url] [![Join Slack][slack-image]][slack-url]

`neutrino-preset-mozilla-rpweb` is a Neutrino preset that supports building React web applications,
React libraries, or JavaScript web libraries, and linting them with Airbnb's base ESLint config, following
the Airbnb styleguide with Mozilla additions. This preset is used for web projects within Mozilla's
former Release and Productivity team.

## Features

- Extends from [neutrino-preset-react](https://neutrino.js.org/presets/neutrino-preset-react)
- Zero upfront configuration necessary to start developing and building a React web app
- Modern Babel compilation adding JSX and object rest spread syntax.
- Support for React Hot Loader
- Write JSX in .js or .jsx files
- Extends from [neutrino-preset-web](https://neutrino.js.org/presets/neutrino-preset-web)
  - Modern Babel compilation supporting ES modules, last 2 major browser versions (1 for libraries), async functions, and dynamic imports
  - Webpack loaders for importing HTML, CSS, images, icons, fonts, and web workers
  - Webpack Dev Server during development
  - Automatic creation of HTML pages, no templating necessary
  - Hot module replacement support
  - Production-optimized bundles with Babel minification and easy chunking
  - Easily extensible to customize your project as needed

Extends from [neutrino-preset-airbnb-base](https://neutrino.js.org/presets/neutrino-preset-airbnb-base/)
- Zero upfront configuration necessary to start linting your project
- Modern Babel knowledge supporting ES modules, JSX, and React apps
- Highly visible during development, fails compilation when building for production
- Easily extensible to customize your project as needed

## Requirements

- Node.js v6.10+
- Yarn or npm client
- Neutrino v7

## Installation

`neutrino-preset-mozilla-rpweb` can be installed via the Yarn or npm clients. Inside your project, make sure
`neutrino` and `neutrino-preset-rpweb` are development dependencies. You will also need React and React DOM for actual
React development. **Yarn is highly preferred for Mozilla web projects.**

#### Yarn

```bash
❯ yarn add --dev neutrino neutrino-preset-mozilla-rpweb
❯ yarn add react react-dom
```

#### npm

```bash
❯ npm install --save-dev neutrino neutrino-preset-mozilla-rpweb
❯ npm install --save react react-dom
```

## Project Layout

`neutrino-preset-mozilla-rpweb` follows the standard [project layout](https://neutrino.js.org/project-layout) specified
by Neutrino. This means that by default all project source code should live in a directory named `src` in the root of the
project. This includes JavaScript files, CSS stylesheets, images, and any other assets that would be available
to import your compiled project.

| Project Type | Source | Output |
| --- | --- | --- |
| React app | `src` | `build` |
| Web Library | `src` | `lib` |
| React components | `src/components` | `lib` |

## Quickstart React App

After installing Neutrino and the this preset, add a new directory named `src` in the root of the project, with
a single JS file named `index.js` in it.

```bash
❯ mkdir src && touch src/index.js
```

This React preset exposes an element in the page with an ID of `root` to which you can mount your application. Edit
your `src/index.js` file with the following:

```jsx
import React from 'react';
import { render } from 'react-dom';

render(<h1>Hello world!</h1>, document.getElementById('root'));
```

Now edit your project's package.json to add commands for starting and building the application:

```json
{
  "scripts": {
    "start": "neutrino start --use neutrino-preset-mozilla-rpweb",
    "build": "neutrino build --use neutrino-preset-mozilla-rpweb"
  }
}
```

If you are using `.neutrinorc.js`, add this preset to your use array instead of `--use` flags:

```js
module.exports = {
  use: ['neutrino-preset-mozilla-rpweb']
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

## Building React App

`neutrino-preset-mozilla-rpweb` builds static assets to the `build` directory by default when running `neutrino build`.
Using the quick start example above as a reference:

```bash
❯ yarn build

✔ Building project completed
Version: webpack 3.6.0
Time: 9773ms
                           Asset       Size    Chunks             Chunk Names
   index.dfbad882ab3d86bfd747.js     181 kB     index  [emitted]  index
polyfill.57dabda41992eba7552f.js    69.2 kB  polyfill  [emitted]  polyfill
 runtime.3d9f9d2453f192a2b10f.js    1.51 kB   runtime  [emitted]  runtime
                      index.html  846 bytes            [emitted]
✨  Done in 14.62s.
```

You can either serve or deploy the contents of this `build` directory as a static site.

## Static assets

If you wish to copy files to the build directory that are not imported from application code, you can place
them in a directory within `src` called `static`. All files in this directory will be copied from `src/static`
to `build/static`. This can be overridden with the `neutrino-middleware-copy` middleware.

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
    ['neutrino-preset-mozilla-rpweb', {
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

By passing a `library` option, you can switch from building a React application to a web library. Set `library`
to the name of your library as it would be exposed on the `window` object.

_Example: create a `taskcluster` web library:_

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-rpweb', {
      library: 'taskcluster'
    }]
  ]
};
```

By passing a `components` option, you can switch from building a React application to a set of React components.
Set `components` to `true`.

_Example: create a `taskcluster` React components library:_

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-rpweb', {
      components: true
    }]
  ]
};
```

## Building libraries and components

When building libraries and components, they are output to the `lib` directory by default when running `neutrino build`.
Using the quick start example above as a reference:

```bash
❯ yarn build

✔ Building project completed
Hash: 453804a130a959d313a1
Version: webpack 3.6.0
Time: 350ms
                     Asset     Size  Chunks             Chunk Names
    YourCustomComponent.js  4.12 kB       0  [emitted]  YourCustomComponent
YourCustomComponent.js.map  4.11 kB       0  [emitted]  YourCustomComponent
✨  Done in 3.69s.
```

You can then publish these components to npm. When publishing your project to npm, consider excluding your `src`
directory by using the `files` property to whitelist `lib`, or via `.npmignore` to blacklist `src`.

When creating React components, these are generated as UMD named modules, with the name corresponding to the component
file name. e.g. `src/components/Custom/index.js` maps to `Custom`, as well as `src/components/Custom.js`
mapping to `Custom`. By default this will create an individual entry point for every top-level component found in
`src/components`.

When creating a web library, these are generated as UMD named modules based on the value you provided for the preset's
`library` option.

These modules are ES-compatible modules, so they can be `import`ed as expected. If you want to use them with CJS
`require`, you'll need to use the `.default` property to access the default exports:

```js
const YourCustomComponent = require('your-custom-component').default;
```

Your library or components can also be used from script tags provided your dependencies have been loaded prior to the
inclusion of your generated library or components.

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`neutrino-preset-mozilla-rpweb` does not use any additional named rules, loaders, or plugins that aren't already in use by the
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
    'neutrino-preset-mozilla-rpweb',
    (neutrino) => neutrino.config
      .entry('vendor')
        .add('react')
        .add('react-dom')
  ]
};
```

## CSS Modules

You can enable CSS modules for project code using the `cssModules` option. This only enables CSS modules for
code within `src` and not external dependencies like those in `node_modules`.

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-rpweb', {
      cssModules: true
    }]
  ]
};
```

## Hot Module Replacement

While `neutrino-preset-react` supports Hot Module Replacement your app using React Hot Loader, it does require some
application-specific changes in order to operate.

First, install `react-hot-loader` as a dependency, this **must** be React Hot Loader v3+ (currently in beta):

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

## Creating React components

This preset exposes 3 React components from `neutrino-preset-mozilla-rpweb/lib` to generate a component previewer
interface:

### Stories

The `<Stories />` component is the container for how a series of components should be rendered. It is responsible
for rendering the navigation menu, switching between components and component states, and rendering the selected
component.

The `<Stories />` component should be given 1 or more `<Story />` components as children.

```js
import React from 'react';
import { render } from 'react-dom';
import { Stories } from 'neutrino-preset-react-component/lib';

const root = document.getElementById('root');

render((
  <Stories>
    ...
  </Stories>
), root);
```

### Story

The `<Story />` component defines how a particular component is previewed. It accepts a `component` property which
is the component to preview.

The `<Story />` component should be given 1 or more `<Props />` components as children which will be used to
render the specified component upon selection.

```js
import React from 'react';
import { render } from 'react-dom';
import { Stories, Story } from 'neutrino-preset-mozilla-rpweb/lib';

const root = document.getElementById('root');

class Example extends React.Component {}

render((
  <Stories>
    <Story component={Example}>
      ...
    </Story>
  </Stories>
), root);
```

### Props

The `<Props />` component defines what props are passed to the `<Story />`'s component when this story is
selected. All props and children passed to this `Props` will be passed as props to the component.

The `<Props />` component should be given a `name` property for displaying in the `Stories` UI.

```js
import React from 'react';
import { render } from 'react-dom';
import { Stories, Story, Props } from 'neutrino-preset-mozilla-rpweb/lib';

const root = document.getElementById('root');

class Example extends React.Component {
  render() {
    return <h1>Hello {this.props.message || 'world'}</h1>;
  }
}

render((
  <Stories>
    <Story component={Example}>
      <Props name="Default" />
      <Props name="With 'Internet'" message="Internet" />
      <Props name="With emphasis" message="WORLD!!!" />
    </Story>
  </Stories>
), root);
```

![example gif](neutrino-react-components-example.gif)

[npm-image]: https://img.shields.io/npm/v/neutrino-preset-mozilla-rpweb.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-preset-mozilla-rpweb.svg
[npm-url]: https://npmjs.org/package/neutrino-preset-mozilla-rpweb
[slack-image]: https://neutrino-slack.herokuapp.com/badge.svg
[slack-url]: https://neutrino-slack.herokuapp.com/
