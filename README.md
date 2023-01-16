# \<oscd-component>

## Renaming the component

After instantiating this template repository, you will want to rename your component and then remove this section from the `README.md` file.

To find places where you have to search for and replace the string `oscd-component` you can use

```sh
$ git grep oscd-component
```

<details>
  <summary>=></summary>

```
README.md:# \<oscd-component>
README.md:npm i oscd-component
README.md:  import 'oscd-component';
README.md:<oscd-component></oscd-component>
index.html:    import './dist/oscd-component.js';
index.html:        <oscd-component .title=${title}>
index.html:        </oscd-component>
oscd-component.stories.ts:import './oscd-component.js';
oscd-component.stories.ts:  component: 'oscd-component',
oscd-component.stories.ts:  <oscd-component
oscd-component.stories.ts:    style="--oscd-component-text-color: ${textColor || 'black'}"
oscd-component.stories.ts:  </oscd-component>
oscd-component.spec.ts:import './oscd-component.js';
oscd-component.spec.ts:import type { OscdComponent } from './oscd-component.js';
oscd-component.spec.ts:      html`<oscd-component></oscd-component>`
oscd-component.spec.ts:      html`<oscd-component></oscd-component>`
oscd-component.spec.ts:      html`<oscd-component title="attribute title"></oscd-component>`
oscd-component.spec.ts:      html`<oscd-component></oscd-component>`
oscd-component.ts:@customElement('oscd-component')
oscd-component.ts:      color: var(--oscd-component-text-color, #000);
package.json:  "name": "oscd-component",
package.json:  "description": "Webcomponent oscd-component following open-wc recommendations",
package.json:  "main": "dist/oscd-component.js",
package.json:  "module": "dist/oscd-component.js",
package.json:    ".": "./dist/oscd-component.js"
```

</details>

In order to replace all instances of the string `oscd-component` in your repository at once, you can use a tool like [git sed](https://github.com/ext/git-sed/blob/master/git-sed) in order to execute a substitute expression on all files in the worktree:

```sh
git sed s/oscd-component/my-widget/g
```

Make sure to use a dash `-` in the new component name and to rename all files with names starting with `oscd-component`:

```
oscd-component.stories.ts
oscd-component.spec.ts
oscd-component.ts
```

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i oscd-component
```

## Usage

```html
<script type="module">
  import 'oscd-component';
</script>

<oscd-component></oscd-component>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
