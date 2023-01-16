import { fixture, html } from '@open-wc/testing';
import { visualDiff } from '@web/test-runner-visual-regression';

import '@material/mwc-button';

import './oscd-dialog.js';
import type { OscdDialog } from './oscd-dialog.js';

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(2000 * factor);

describe('Customized OpenSCD dialog', () => {
  describe('as a single page dialog', () => {
    let dialogPage: OscdDialog;

    beforeEach(async () => {
      dialogPage = await fixture(
        html`<oscd-dialog open heading="Heading">Content</oscd-dialog>`
      );
      await dialogPage.updateComplete;
      const div = document.createElement('div');
      div.style.width = '100%';
      div.style.height = '100%';

      document.body.prepend(div);
      document.body.prepend(dialogPage);
    });

    afterEach(() => dialogPage.remove());

    it('looks like the latest screenshot', async () => {
      await timeout(300);
      await visualDiff(document.body, `oscd-dialog-single-default`);
    });
  });

  describe('as a single page dialog with primary action', () => {
    let dialogPage: OscdDialog;

    beforeEach(async () => {
      dialogPage = await fixture(
        html`<oscd-dialog open heading="Heading"
          >Content<mwc-button
            slot="primaryAction"
            label="prim"
            icon="edit"
            trailingIcon
          ></mwc-button
        ></oscd-dialog>`
      );
      await dialogPage.updateComplete;

      document.body.prepend(dialogPage);
    });

    afterEach(() => dialogPage.remove());

    it('looks like the latest screenshot', async () => {
      await timeout(300);
      await visualDiff(document.body, `oscd-dialog-single-primary`);
    });

    it('with stacked option looks like the latest screenshot', async () => {
      dialogPage.stacked = true;
      await timeout(300);

      await visualDiff(document.body, `oscd-dialog-stacked`);
    });
  });

  describe('as a multiple paged dialog', () => {
    let dialogPage1: OscdDialog;
    let dialogPage2: OscdDialog;
    let dialogPage3: OscdDialog;

    beforeEach(async () => {
      dialogPage1 = await fixture(
        html`<oscd-dialog heading="Heading1">Content Page 1</oscd-dialog>`
      );
      dialogPage2 = await fixture(html`<oscd-dialog heading="Heading2"
        >Content Page 2</oscd-dialog
      >`);
      dialogPage3 = await fixture(html`<oscd-dialog heading="Heading3"
        >Content Page 3
        <mwc-button
          slot="primaryAction"
          label="prim"
          icon="edit"
          trailingIcon
        ></mwc-button>
      </oscd-dialog>`);

      document.body.prepend(dialogPage3);
      document.body.prepend(dialogPage2);
      document.body.prepend(dialogPage1);
    });

    afterEach(() => {
      dialogPage1.remove();
      dialogPage2.remove();
      dialogPage3.remove();
    });

    describe('with next dialog sibling', () => {
      beforeEach(async () => {
        dialogPage1.open = true;

        await dialogPage1.updateComplete;
      });

      it('looks like the latest screenshot', async () => {
        await timeout(300);
        await visualDiff(document.body, `oscd-dialog-multi-w-next-sibling`);
      });
    });

    describe('with next and prev dialog sibling', () => {
      beforeEach(async () => {
        dialogPage2.open = true;

        await dialogPage2.updateComplete;
      });

      it('looks like the latest screenshot', async () => {
        await timeout(300);
        await visualDiff(
          document.body,
          `oscd-dialog-multi-w-next-and-prev-sibling`
        );
      });
    });

    describe('with prev dialog sibling', () => {
      beforeEach(async () => {
        dialogPage3.open = true;

        await dialogPage3.updateComplete;
      });

      it('looks like the latest screenshot', async () => {
        await timeout(300);
        await visualDiff(document.body, `oscd-dialog-multi-w-prev-sibling`);
      });
    });
  });

  describe('with non-default secondary or primary action slots', () => {
    let dialogPage1: OscdDialog;
    let dialogPage2: OscdDialog;
    let dialogPage3: OscdDialog;

    beforeEach(async () => {
      dialogPage1 = await fixture(
        html`<oscd-dialog heading="Heading1">
          Content Page 1
          <mwc-button
            slot="secondaryAction"
            label="secButton1"
            icon="edit"
          ></mwc-button
          ><mwc-button slot="secondaryAction" label="secButton2"></mwc-button
          ><mwc-button
            slot="secondaryAction"
            label="secButton3"
            icon="add"
            trailingIcon
          ></mwc-button
        ></oscd-dialog>`
      );
      dialogPage2 = await fixture(html`<oscd-dialog heading="Heading2"
        >Content Page 2</oscd-dialog
      >`);
      dialogPage3 = await fixture(html`<oscd-dialog heading="Heading3">
        Content Page 3
        <mwc-button
          slot="primaryAction"
          label="primButton1"
          icon="edit"
        ></mwc-button
        ><mwc-button slot="primaryAction" label="primButton2"></mwc-button
        ><mwc-button
          slot="primaryAction"
          label="primButton3"
          icon="add"
          trailingIcon
        ></mwc-button>
      </oscd-dialog>`);

      document.body.prepend(dialogPage3);
      document.body.prepend(dialogPage2);
      document.body.prepend(dialogPage1);
    });

    afterEach(() => {
      dialogPage1.remove();
      dialogPage2.remove();
      dialogPage3.remove();
    });

    it('overload default secondary action', async () => {
      dialogPage1.open = true;

      await timeout(300);
      await visualDiff(document.body, `oscd-dialog-overload-secondaryAction`);
    });

    it('overload default primary action', async () => {
      dialogPage3.open = true;

      await timeout(300);
      await visualDiff(document.body, `oscd-dialog-overload-primaryAction`);
    });
  });
});
