# \<oscd-dialog>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i oscd-dialog
```

## Usage

```html
<script type="module">
  import 'oscd-dialog';
</script>

<oscd-dialog></oscd-dialog>
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


## `oscd-dialog.ts`:

### class: `OscdDialog`

#### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

#### Fields

| Name      | Privacy | Type      | Default | Description                        | Inherited From |
| --------- | ------- | --------- | ------- | ---------------------------------- | -------------- |
| `open`    |         | `boolean` | `false` | Whether dialog is open             |                |
| `stacked` |         | `boolean` | `false` | Whether dialog actions are stacked |                |
| `heading` |         | `string`  | `''`    | Dialogs header content             |                |
| `dialog`  |         | `Dialog`  |         |                                    |                |

#### Events

| Name        | Type | Description                                         | Inherited From |
| ----------- | ---- | --------------------------------------------------- | -------------- |
| `turn-page` |      | Navigate to the next, previous or user defined page |                |

#### CSS Properties

| Name                | Default | Description                |
| ------------------- | ------- | -------------------------- |
| `--mdc-theme-error` |         | Color of the cancel button |

#### Slots

| Name              | Description                                    |
| ----------------- | ---------------------------------------------- |
| `default`         | Content of the dialog                          |
| `secondaryAction` | Overwrites default \`secondaryAction\` buttons |
| `primaryAction`   | Overwrites default \`primaryAction\` buttons   |

<details><summary>Private API</summary>

#### Fields

| Name             | Privacy | Type                 | Default | Description | Inherited From |
| ---------------- | ------- | -------------------- | ------- | ----------- | -------------- |
| `prevPage`       | private | `OscdDialog \| null` |         |             |                |
| `nextPage`       | private | `OscdDialog \| null` |         |             |                |
| `allDescendants` | private | `Element[]`          |         |             |                |

#### Methods

| Name                | Privacy | Description | Parameters                                    | Return          | Inherited From |
| ------------------- | ------- | ----------- | --------------------------------------------- | --------------- | -------------- |
| `invalidDescendant` | private |             |                                               | `boolean`       |                |
| `turnPage`          | private |             | `increment: number`                           | `Promise<void>` |                |
| `onTurnPage`        | private |             | `evt: CustomEvent<TurnPageDetail>`            | `void`          |                |
| `onClosed`          | private |             | `ae: CustomEvent<{ action: string } \| null>` | `Promise<void>` |                |

</details>

<hr/>

### Exports

| Kind | Name         | Declaration | Module         | Package |
| ---- | ------------ | ----------- | -------------- | ------- |
| `js` | `OscdDialog` | OscdDialog  | oscd-dialog.ts |         |


&copy; 2023 THE AUTHORS
