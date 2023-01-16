import { html, TemplateResult } from 'lit';

import '@material/mwc-button';

import './oscd-dialog.js';

export default {
  title: 'oscd-dialog',
  component: 'oscd-dialog',
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  headings: string;
  open: boolean;
  stacked?: boolean;
}

const SinglePageTemplate: Story<ArgTypes> = ({
  headings: heading = 'Heading',
  open = true,
  stacked = false,
}) =>
  html`
    <oscd-dialog heading=${heading} ?open=${open} ?stacked=${stacked}>
      <input label="label" />
      <mwc-button slot="primaryAction" label="save"></mwc-button>
    </oscd-dialog>
  `;

interface MultiArgTypes {
  heading1: string;
  heading2: string;
  heading3: string;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  stacked1?: boolean;
  stacked2?: boolean;
  stacked3?: boolean;
}

const MultiPageTemplate: Story<MultiArgTypes> = ({
  heading1 = 'Heading1',
  heading2 = 'Heading2',
  heading3 = 'Heading3',
  open1 = true,
  open2 = false,
  open3 = false,
  stacked1 = false,
  stacked2 = false,
  stacked3 = false,
}) =>
  html`
    <oscd-dialog heading=${heading1} ?open=${open1} ?stacked=${stacked1}>
      Content1
    </oscd-dialog>
    <oscd-dialog heading=${heading2} ?open=${open2} ?stacked=${stacked2}>
      Content1
    </oscd-dialog>
    <oscd-dialog heading=${heading3} ?open=${open3} ?stacked=${stacked3}>
      <mwc-button slot="primaryAction" label="save"></mwc-button>
    </oscd-dialog>
  `;

const UserDefinedMultiPageTemplate: Story<MultiArgTypes> = ({
  heading1 = 'Heading1',
  heading2 = 'Heading2',
  heading3 = 'Heading3',
  open1 = true,
  open2 = false,
  open3 = false,
  stacked1 = false,
  stacked2 = false,
  stacked3 = false,
}) =>
  html`
    <oscd-dialog heading=${heading1} ?open=${open1} ?stacked=${stacked1}>
      Content1
      <mwc-button
        slot="primaryAction"
        dialogAction="+2"
        label="Jump2"
        icon="navigate_next"
        trailingIcon
      ></mwc-button>
    </oscd-dialog>
    <oscd-dialog heading=${heading2} ?open=${open2} ?stacked=${stacked2}>
      Content1
    </oscd-dialog>
    <oscd-dialog heading=${heading3} ?open=${open3} ?stacked=${stacked3}>
      <mwc-button slot="primaryAction" label="save"></mwc-button>
    </oscd-dialog>
  `;

export const SinglePage = SinglePageTemplate.bind({});
SinglePage.args = {
  headings: 'Heading',
  open: true,
  stacked: false,
};

export const MultiPage = MultiPageTemplate.bind({});
MultiPage.args = {
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  open1: true,
  open2: false,
  open3: false,
  stacked1: false,
  stacked2: false,
  stacked3: false,
};

export const UserDefinedMultiPage = UserDefinedMultiPageTemplate.bind({});
UserDefinedMultiPage.args = {
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  open1: true,
  open2: false,
  open3: false,
  stacked1: false,
  stacked2: false,
  stacked3: false,
};
