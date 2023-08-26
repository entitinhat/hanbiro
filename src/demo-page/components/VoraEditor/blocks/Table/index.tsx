import { IconTable, IconTableWithHeadings, IconTableWithoutHeadings } from '@codexteam/icons';
import { API, BlockAPI, BlockTool, ToolConfig } from '@editorjs/editorjs';
import { HTMLPasteEventDetail, PasteEvent, TunesMenuConfig } from '@editorjs/editorjs/types/tools';
import * as $ from './utils/dom';
import './styles/index.scss';
import Table from './table';

/**
 * @typedef {object} TableConfig - configuration that the user can set for the table
 * @property {number} rows - number of rows in the table
 * @property {number} cols - number of columns in the table
 */
/**
 * @typedef {object} Tune - setting for the table
 * @property {string} name - tune name
 * @property {HTMLElement} icon - icon for the tune
 * @property {boolean} isActive - default state of the tune
 * @property {void} setTune - set tune state to the table data
 */
/**
 * @typedef {object} TableData - object with the data transferred to form a table
 * @property {boolean} withHeading - setting to use cells of the first row as headings
 * @property {string[][]} content - two-dimensional array which contains table content
 */

//table data
interface TableData extends Record<string, any> {
  withHeadings: boolean;
  content: any; //[]
}

/**
 * Table block for Editor.js
 */
export default class TableBlock implements BlockTool {
  api: API;
  readOnly: boolean | undefined;
  data: TableData;
  config: ToolConfig;
  blockAPI: BlockAPI | undefined;

  table: any;
  container: HTMLElement | undefined;

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported(): boolean {
    return true;
  }

  /**
   * Allow to press Enter inside the CodeTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks(): boolean {
    return true;
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {TableData} data — previously saved data
   * @param {TableConfig} config - user config for Tool
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({
    data,
    config,
    api,
    readOnly,
    block
  }: {
    data?: TableData;
    config?: ToolConfig;
    api: API;
    readOnly?: boolean;
    block?: BlockAPI;
  }) {
    this.api = api;
    this.config = config || {};
    this.readOnly = readOnly;
    this.data = {
      withHeadings: this.getConfig('withHeadings', false, data),
      content: data && data.content ? data.content : []
    };
    this.blockAPI = block;
    this.table = null;
    this.container = undefined;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox(): { icon: string; title?: string } {
    return {
      icon: IconTable,
      title: 'Js Table'
    };
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render(): HTMLElement {
    /** creating table */
    this.table = new Table(this.readOnly || false, this.api, this.data, this.config);

    /** creating container around table */
    this.container = $.make('div', this.api.styles.block);
    this.container.appendChild(this.table.getWrapper());

    this.table.setHeadingsSetting(this.data.withHeadings);

    return this.container;
  }

  /**
   * Returns plugin settings
   *
   * @returns {Array}
   */
  renderSettings(): HTMLElement | TunesMenuConfig {
    return [
      {
        label: this.api.i18n.t('With headings'),
        icon: IconTableWithHeadings,
        isActive: this.data.withHeadings,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this.data.withHeadings = true;
          this.table.setHeadingsSetting(this.data.withHeadings);
        }
      },
      {
        label: this.api.i18n.t('Without headings'),
        icon: IconTableWithoutHeadings,
        isActive: !this.data.withHeadings,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this.data.withHeadings = false;
          this.table.setHeadingsSetting(this.data.withHeadings);
        }
      }
    ];
  }

  /**
   * Extract table data from the view
   *
   * @returns {TableData} - saved data
   */
  save(block: HTMLElement): TableData {
    const tableContent = this.table.getData();

    const result: TableData = {
      withHeadings: this.data.withHeadings,
      content: tableContent
    };

    return result;
  }

  /**
   * A helper to get config value.
   *
   * @param {string} configName - the key to get from the config.
   * @param {any} defaultValue - default value if config doesn't have passed key
   * @param {object} savedData - previously saved data. If passed, the key will be got from there, otherwise from the config
   * @returns {any} - config value.
   */
  getConfig(configName: string, defaultValue: any, savedData: TableData | undefined) {
    const data = this.data || savedData;

    if (data) {
      return data[configName] ? data[configName] : defaultValue;
    }

    return this.config && this.config[configName] ? this.config[configName] : defaultValue;
  }

  /**
   * Table onPaste configuration
   *
   * @public
   */
  static get pasteConfig() {
    return { tags: ['TABLE', 'TR', 'TH', 'TD'] };
  }

  /**
   * On paste callback that is fired from Editor
   *
   * @param {PasteEvent} event - event with pasted data
   */
  onPaste(event: PasteEvent): void {
    const table = (event.detail as HTMLPasteEventDetail).data;

    /** Check if the first row is a header */
    const firstRowHeading = table.querySelector(':scope > thead, tr:first-of-type th');

    /** Get all rows from the table */
    const rows = Array.from(table.querySelectorAll('tr'));

    /** Generate a content matrix */
    const content = rows.map((row) => {
      /** Get cells from row */
      const cells = Array.from(row.querySelectorAll('th, td'));

      /** Return cells content */
      return cells.map((cell) => cell.innerHTML);
    });

    /** Update Tool's data */
    this.data = {
      withHeadings: firstRowHeading !== null,
      content
    };

    /** Update table block */
    if (this.table.wrapper) {
      this.table.wrapper.replaceWith(this.render());
    }
  }
}
