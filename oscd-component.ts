import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot something - You can put something here
 *
 * @fires fake-event - This is just to show off README generation
 *
 * @cssprop --oscd-component-text-color - Controls the color of foo
 */
@customElement('oscd-component')
export class OscdComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--oscd-component-text-color, #000);
    }
  `;

  /** The counter's title */
  @property({ type: String }) title = 'Hey there';

  /** Another description without information content */
  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
    this.dispatchEvent(new CustomEvent('fake-event', {}));
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <slot name="something"></slot>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}
