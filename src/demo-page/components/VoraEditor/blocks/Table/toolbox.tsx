import Popover from './utils/popover';
import * as $ from './utils/dom';
import ToolboxIcon from './img/toolboxIcon.svg';
import { API } from '@editorjs/editorjs';

/**
 * Toolbox is a menu for manipulation of rows/cols
 *
 * It contains toggler and Popover:
 *   <toolbox>
 *     <toolbox-toggler />
 *     <popover />
 *   <toolbox>
 */
export default class Toolbox {
  api: API;
  items: any;
  onOpen: any;
  onClose: any;
  cssModifier: any;
  popover: any;
  wrapper: HTMLElement;

  /**
   * Creates toolbox buttons and toolbox menus
   *
   * @param {object} api - Editor.js api
   * @param {PopoverItem[]} items - Editor.js api
   * @param {function} onOpen - callback fired when the Popover is opening
   * @param {function} onClose - callback fired when the Popover is closing
   * @param {string} [cssModifier] - the modifier for the Toolbox. Allows to add some specific styles.
   */
  constructor({ api, items, onOpen, onClose, cssModifier = '' }: any) {
    this.api = api;

    this.items = items;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.cssModifier = cssModifier;

    this.popover = null;
    this.wrapper = this.createToolbox();
  }

  /**
   * Style classes
   */
  static get CSS() {
    return {
      toolbox: 'tc-toolbox',
      toolboxShowed: 'tc-toolbox--showed',
      toggler: 'tc-toolbox__toggler'
    };
  }

  /**
   * Returns rendered Toolbox element
   */
  get element() {
    return this.wrapper;
  }

  /**
   * Creating a toolbox to open menu for a manipulating columns
   *
   * @returns {Element}
   */
  createToolbox() {
    const wrapper = $.make('div', [Toolbox.CSS.toolbox, this.cssModifier ? `${Toolbox.CSS.toolbox}--${this.cssModifier}` : '']);
    const popover = this.createPopover();
    const toggler = this.createToggler();

    wrapper.appendChild(toggler);
    wrapper.appendChild(popover);

    return wrapper;
  }

  /**
   * Creates the Toggler
   *
   * @returns {Element}
   */
  createToggler() {
    const toggler = $.make('div', Toolbox.CSS.toggler, {
      innerHTML: `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <rect width="18" height="18" fill="#F4F5F7" rx="2"/>
          <circle cx="11.5" cy="6.5" r="1.5"/>
          <circle cx="11.5" cy="11.5" r="1.5"/>
          <circle cx="6.5" cy="6.5" r="1.5"/>
          <circle cx="6.5" cy="11.5" r="1.5"/>
        </svg>
      `
    });

    toggler.addEventListener('click', () => {
      this.togglerClicked();
    });

    return toggler;
  }

  /**
   * Creates the Popover instance and render it
   *
   * @returns {Element}
   */
  createPopover() {
    this.popover = new Popover({
      items: this.items
    });

    return this.popover.render();
  }

  /**
   * Toggler click handler. Opens/Closes the popover
   *
   * @returns {void}
   */
  togglerClicked() {
    if (this.popover.opened) {
      this.popover.close();
      this.onClose();
    } else {
      this.popover.open();
      this.onOpen();
    }
  }

  /**
   * Shows the Toolbox
   *
   * @param {function} computePositionMethod - method that returns the position coordinate
   * @returns {void}
   */
  show(computePositionMethod: any) {
    const position = computePositionMethod();

    /**
     * Set 'top' or 'left' style
     */
    Object.entries(position).forEach(([prop, value]) => {
      (this.wrapper.style as any)[prop] = value;
    });

    this.wrapper.classList.add(Toolbox.CSS.toolboxShowed);
  }

  /**
   * Hides the Toolbox
   *
   * @returns {void}
   */
  hide() {
    this.popover.close();
    this.wrapper.classList.remove(Toolbox.CSS.toolboxShowed);
  }
}
