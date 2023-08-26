//editorjs
import { IconMarker } from '@codexteam/icons';
import { API, InlineTool, ToolConfig } from '@editorjs/editorjs';
import { markerIcon, textIcon } from './icons';

//style
import './index.scss';
import { getDefaultColorCache, handleCSSVariables } from './Picker/utils/main';
import ColorPlugin from './Picker';

export default class Color implements InlineTool {
  api: API;
  config: ToolConfig;

  clickedOnLeft: boolean;
  pluginType: string;
  parentTag: string;
  hasCustomPicker: boolean;
  picker: any;
  color: any;
  icon: any;
  button: HTMLButtonElement | null;
  iconClasses: { base: string; active: string };

  constructor({ api, config }: { api: API; config?: ToolConfig }) {
    this.api = api;
    this.config = config;
    this.clickedOnLeft = false;
    this.pluginType = this.config.type || 'text';
    this.parentTag = this.pluginType === 'marker' ? 'MARK' : 'FONT';
    this.hasCustomPicker = this.config.customPicker || false;
    this.color = handleCSSVariables(getDefaultColorCache(this.config.defaultColor, this.pluginType));
    this.picker = null;
    this.icon = null;

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
    //this.tag = 'MARK';

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
  public static title: string = 'Color';

  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  // static get CSS() {
  //   return 'cdx-text-color';
  // }

  /**
   * Sanitizer rule
   * @return {{color: {class: string}}}
   */
  static get sanitize() {
    return {
      font: true,
      span: true,
      mark: true
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
    this.button.classList.add('colorPlugin');
    this.button.classList.add(this.iconClasses.base);
    this.button.appendChild(this.createLeftButton());
    this.button.appendChild(this.createRightButton(this));

    return this.button;
  }

  /**
   * Create left part button
   *
   * @return {HTMLElement}
   */
  createLeftButton(): HTMLElement {
    if (!this.icon) {
      this.icon = document.createElement('div');
      this.icon.id = 'color-left-btn';
      this.icon.appendChild(this.createButtonIcon());
      this.icon.addEventListener('click', () => (this.clickedOnLeft = true));
    }

    return this.icon;
  }

  /**
   * Create button icon
   *
   * @return {HTMLElement}
   */
  createButtonIcon(): HTMLElement {
    const buttonIcon = document.createElement('div');
    buttonIcon.id = 'color-btn-text';
    const defaultIcon = this.pluginType === 'marker' ? markerIcon : textIcon;
    buttonIcon.innerHTML = this.config.icon || defaultIcon;
    return buttonIcon;
  }

  /**
   * Create right part button
   *
   * @return {HTMLElement}
   */
  createRightButton(sharedScope: any): HTMLElement {
    if (!this.picker) {
      this.picker = new ColorPlugin({
        onColorPicked: function (value: string) {
          sharedScope.color = value;
        },
        hasCustomPicker: this.hasCustomPicker,
        defaultColor: this.config.defaultColor,
        colorCollections: this.config.colorCollections,
        type: this.pluginType
      });
    }
    return this.picker;
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

    /**
     * clean legacy wrapper generated before editorjs-text-color-plugin v3.0
     */
    const legacySpanWrapper = this.api.selection.findParentTag('SPAN');
    if (legacySpanWrapper) this.unwrap(legacySpanWrapper);

    /**
     * If start or end of selection is in the highlighted block
     */
    const termWrapper = this.api.selection.findParentTag(this.parentTag);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }

    this.clickedOnLeft = false;
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range: Range): void {
    const selectedText = range.extractContents();
    const newWrapper = document.createElement(this.parentTag);

    newWrapper.appendChild(selectedText);
    range.insertNode(newWrapper);

    if (this.pluginType === 'marker') {
      this.wrapMarker(newWrapper);
    } else {
      this.wrapTextColor(newWrapper);
    }

    this.api.selection.expandToTag(newWrapper);
  }

  /**
   * Wrap selected marker fragment
   *
   * @param newWrapper - wrapper for selected fragment
   */
  wrapMarker(newWrapper: HTMLElement) {
    newWrapper.style.backgroundColor = this.color;
    const colorWrapper = this.api.selection.findParentTag('FONT');
    if (colorWrapper) newWrapper.style.color = colorWrapper.style.color;
  }

  /**
   * Wrap selected text color fragment
   *
   * @param {Range} newWrapper - wrapper for selected fragment
   */
  wrapTextColor(newWrapper: HTMLElement) {
    newWrapper.style.color = this.color;
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper: HTMLElement) {
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
    if (this.clickedOnLeft) {
      this.removeWrapper(termWrapper);
    } else {
      this.updateWrapper(termWrapper);
    }

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
   * update color without create a new tag
   *
   * @param {Range} termWrapper - parent of selected fragment
   */
  updateWrapper(termWrapper: HTMLElement) {
    if (this.pluginType === 'marker') {
      termWrapper.style.backgroundColor = this.color;
    } else {
      termWrapper.style.color = this.color;
    }
  }

  /**
   * remove wrapper
   *
   * @param {Range} termWrapper - parent of selected fragment
   */
  removeWrapper(termWrapper: HTMLElement) {
    termWrapper.parentNode?.removeChild(termWrapper);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState(selection: Selection): boolean {
    const legacyWrapper = this.api.selection.findParentTag('SPAN');
    const termTag = this.api.selection.findParentTag(this.parentTag);
    let isWrapped = legacyWrapper ? this.handleLegacyWrapper(legacyWrapper, termTag) : termTag;
    this.button?.classList.toggle(this.iconClasses.active, !!isWrapped);

    return !!isWrapped;
  }

  /**
   * handle icon active state for legacy wrappers
   */
  handleLegacyWrapper(legacyWrapper: any, termTag: any) {
    return this.pluginType === 'marker' ? legacyWrapper : termTag & legacyWrapper;
  }

  clear() {
    this.picker = null;
    this.icon = null;
  }
}
