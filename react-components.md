## React Components Quickstart

After installing Neutrino and the this preset, if you want to have automatically
wired sourcemaps added to your project, add `source-map-support`:

#### Yarn

```bash
❯ yarn add source-map-support
```

#### npm

```bash
❯ npm install --save source-map-support
```

## Project Layout

`@neutrinojs/react-components` follows the standard [project layout](https://neutrino.js.org/project-layout)
specified by Neutrino. This means that by default all project source code should live in a directory named `src` in the
root of the project. This includes JavaScript files that would be available to your compiled project.

All components should be their own module within a directory named `components` inside the source directory.

```bash
❯ mkdir -p src/components
```

Add this preset to your `use` array in `.neutrinorc.js`:

```js
module.exports = {
  use: ['neutrino-preset-mozilla-frontend-infra/react-components'],
};
```

## Building

`@neutrinojs/react-components` builds components to the `build` directory by default when running `neutrino build`.
Using the quick start example above as a reference:

```bash
❯ yarn build

✔ Building project completed
Hash: 453804a130a959d313a1
Version: webpack 3.6.1
Time: 350ms
                     Asset     Size  Chunks             Chunk Names
    YourCustomComponent.js  4.12 kB       0  [emitted]  YourCustomComponent
YourCustomComponent.js.map  4.11 kB       0  [emitted]  YourCustomComponent

[components-cra] ✔ Building project completed
[components-cra] Hash: 453804a130a959d313a1
[components-cra] Version: webpack 3.6.1
[components-cra] Time: 350ms
[components-cra]                      Asset     Size  Chunks             Chunk Names
[components-cra]     YourCustomComponent.js  4.12 kB       0  [emitted]  YourCustomComponent
[components-cra] YourCustomComponent.js.map  4.11 kB       0  [emitted]  YourCustomComponent

✨  Done in 3.69s.
```

You can then publish these components to npm. When publishing your project to npm, consider excluding your `src`
directory in `package.json` by using the `files` property to whitelist `build`, or via `.npmignore` to blacklist `src`.
Components are generated as UMD named modules, with the name corresponding to the component file name. e.g.
`src/components/Custom/index.js` maps to `Custom`, as well as `src/components/Custom.js` mapping to `Custom`.

These modules are ES-compatible modules, so they can be `import`ed as expected. If you want to use them with CJS
`require`, you'll need to use the `.default` property to access the default exports:

```js
const YourCustomComponent = require('your-custom-component').default;
```

By default this preset creates an individual entry point for every top-level component found in `src/components`. These
are set and accessible via the API at [`neutrino.options.mains`](https://neutrino.js.org/api#optionsmains).

Notice that two builds are running during this phase: one for browsers within our support matrix,
and `.es5.js` for use in ES5 environments, such as community-used CRA projects.

## Customizing

To override the build configuration, start with the documentation on [customization](https://neutrino.js.org/customization).
`@neutrinojs/react-components` uses a few rules and plugins in addition to the ones in use by the React and Web presets.
See the [Web documentation customization](https://neutrino.js.org/packages/web#customizing)
for preset-specific configuration to override.

By default this preset creates an individual entry point for every top-level component found in `src/components`. These
are set and accessible via the API at [`neutrino.options.mains`](https://neutrino.js.org/api#optionsmains).

### Rules

This preset does not define any additional rules or loaders in addition to those already used
by `@neutrinojs/web` and `@neutrinojs/react`.

### Plugins

This preset does not define any additional plugins in addition to those already used
by `@neutrinojs/web` and `@neutrinojs/react`.

---

By following the [customization guide](https://neutrino.js.org/customization) and knowing the rule, loader, and plugin IDs above,
you can override and augment the build by by providing a function to your `.neutrinorc.js` use array. You can also
make these changes from the Neutrino API in custom middleware.

_Example: Change the name of the components directory:_

```js
module.exports = {
  use: [
    ['neutrino-preset-mozilla-frontend-infra/react-components', {
      components: 'react-stuff' // now you can put your components in src/react-stuff/
    }]
  ]
}
```

## Styleguide

You can preview your React components in isolation from the React app using the `styleguide` middleware.
Any components within `src/components/**/*.{js,jsx}` can be rendered. Add the
styleguide middleware to your `use` array before the `react-components` preset:

```js
module.exports = {
  use: [
    'neutrino-preset-mozilla-frontend-infra/styleguide',
    'neutrino-preset-mozilla-frontend-infra/react-components',
  ],
};
```

To start the styleguide, use `neutrino styleguide:start`; to build the styleguide,
use `neutrino styleguide:build`. You can alias these to scripts in package.json
to make it more convenient.
