//editorjs
import { IconMarker } from '@codexteam/icons';
import { API, InlineTool } from '@editorjs/editorjs';

//style
import './index.scss';

export default class Marker implements InlineTool {
  api: API;
  button: HTMLButtonElement | null;
  tag: string;
  iconClasses: {
    active: string;
    base: string;
  };

  constructor({ api }: { api: API }) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLButtonElement|null}
     */
    this.button = null;

    /**
     * Tag that should is rendered in the editor
     *
     * @type {string}
     */
    this.tag = 'MARK';

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  public static isInline = true;

  /**
   * Title for hover-tooltip
   */
  public static title: string = 'Marker';

  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return 'cdx-marker';
  }

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return IconMarker;
  }

  /**
   * Sanitizer rule
   * @return {{mark: {class: string}}}
   */
  static get sanitize() {
    return {
      mark: {
        class: Marker.CSS
      }
    };
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render(): HTMLButtonElement {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range: Range): void {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag, Marker.CSS);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range: Range): void {
    /**
     * Create a wrapper for highlighting
     */
    let marker = document.createElement(this.tag);

    marker.classList.add(Marker.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(span);
     */
    marker.appendChild(range.extractContents());
    range.insertNode(marker);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(marker);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper: HTMLElement): void {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel?.getRangeAt(0);

    const unwrappedContent = range?.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode?.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range?.insertNode(unwrappedContent as Node);

    /**
     * Restore selection
     */
    sel?.removeAllRanges();
    sel?.addRange(range as Range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState(selection: Selection): boolean {
    const termTag = this.api.selection.findParentTag(this.tag, Marker.CSS);
    this.button?.classList.toggle(this.iconClasses.active, !!termTag);

    return !!termTag;
  }
}
