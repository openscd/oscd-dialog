import { customElement, property, query } from 'lit/decorators.js';
import { html, LitElement, nothing, TemplateResult } from 'lit';

import '@material/mwc-button';
import '@material/mwc-dialog';
import type { Dialog } from '@material/mwc-dialog';

import {
  newTurnPageEvent,
  TurnPageDetail,
} from './foundation/turn-page-event.js';

type Checkable = Element & { checkValidity: () => boolean };

function isCheckable(element: Element): element is Checkable {
  return (element as Checkable).checkValidity !== undefined;
}

/**
 * @slot default - Content of the dialog
 * @slot secondaryAction - Overwrites default `secondaryAction` buttons
 * @slot primaryAction - Overwrites default `primaryAction` buttons
 *
 * @fires turn-page - Navigate to the next, previous or user defined page
 *
 * @cssprop --mdc-theme-error - Color of the cancel button
 */

@customElement('oscd-dialog')
/** Slottable (multi page) dialog */
export class OscdDialog extends LitElement {
  /** Whether dialog is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Whether dialog actions are stacked */
  @property({ type: Boolean, reflect: true })
  stacked = false;

  /** Dialogs header content */
  @property({ type: String, reflect: true })
  heading = '';

  @query('mwc-dialog') dialog!: Dialog;

  private get prevPage(): OscdDialog | null {
    if (this.previousElementSibling instanceof OscdDialog)
      return this.previousElementSibling as OscdDialog;

    return null;
  }

  private get nextPage(): OscdDialog | null {
    if (this.nextElementSibling instanceof OscdDialog)
      return this.nextElementSibling as OscdDialog;

    return null;
  }

  private get allDescendants(): Element[] {
    return Array.from(this.children);
  }

  private invalidDescendant(): boolean {
    return Array.from(this.allDescendants).some(element =>
      isCheckable(element) ? !element.checkValidity() : false
    );
  }

  private async turnPage(increment: number): Promise<void> {
    if (this.invalidDescendant()) {
      await this.dialog.updateComplete;
      this.dialog.show();
      return;
    }

    if (increment === 0) return;
    if (increment < 0) {
      if (!this.prevPage) return;

      this.prevPage.open = true;
      this.open = false;

      this.prevPage.dispatchEvent(newTurnPageEvent(increment + 1));
    } else if (increment > 0) {
      if (!this.nextPage) return;

      this.nextPage.open = true;
      this.open = false;

      this.nextPage.dispatchEvent(newTurnPageEvent(increment - 1));
    }
  }

  private onTurnPage(evt: CustomEvent<TurnPageDetail>): void {
    this.turnPage(evt.detail.increment);
  }

  private async onClosed(
    ae: CustomEvent<{ action: string } | null>
  ): Promise<void> {
    this.open = false;
    const increment = Number.parseInt(ae.detail!.action, 10);

    if (ae.detail!.action === 'close' || Number.isNaN(increment)) return;

    this.turnPage(increment);
  }

  constructor() {
    super();

    this.addEventListener('turn-page', this.onTurnPage);
  }

  render(): TemplateResult {
    return html`<mwc-dialog
      heading=${this.heading}
      ?open=${this.open}
      ?stacked=${this.stacked}
      @closed=${this.onClosed}
      ><slot></slot>
      <slot name="secondaryAction" slot="secondaryAction">
        ${this.prevPage?.heading
          ? html`<mwc-button
              slot="secondaryAction"
              dialogAction="-1"
              icon="navigate_before"
              label="${this.prevPage.heading}"
            ></mwc-button>`
          : nothing}
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          label="close"
          style="--mdc-theme-primary: var(--mdc-theme-error)"
        ></mwc-button>
      </slot>
      <slot name="primaryAction" slot="primaryAction">
        ${this.nextPage?.heading
          ? html`<mwc-button
              slot="primaryAction"
              dialogAction="+1"
              icon="navigate_next"
              label="${this.nextPage.heading}"
              trailingIcon
            ></mwc-button>`
          : nothing}
      </slot>
    </mwc-dialog>`;
  }
}
