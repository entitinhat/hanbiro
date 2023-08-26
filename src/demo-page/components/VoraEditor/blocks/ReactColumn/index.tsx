import { API, BlockAPI, BlockTool, ToolConfig } from '@editorjs/editorjs';
import { TunesMenuConfig } from '@editorjs/editorjs/types/tools';
import ReactDOM from 'react-dom/client';
import Columns from './Columns';

/**
 * Table block for Editor.js
 */
export default class ReactColumnBlock implements BlockTool {
  api: API;
  readOnly: boolean | undefined;
  data: any;
  config: ToolConfig;
  blockAPI: BlockAPI | undefined;

  rootDOM: any;
  editors: any;
  private _CSS: { block: string; wrapper: string };
  private nodes: { holder: HTMLDivElement | undefined };

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported(): boolean {
    return true;
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
      icon: `
        <svg width="14" height="14" viewBox="0 -1 14 14" xmlns="http://www.w3.org/2000/svg">
          <defs></defs>
          <rect x="1.194" y="-0.041" width="11.601" height="12.11" rx="1" ry="1" style="fill: rgb(255, 255, 255); stroke: rgb(0, 0, 0); stroke-width: 1.5px;"></rect>
          <path style="stroke: rgb(0, 0, 0); stroke-width:1.5px" d="M 7.032 -0.034 L 6.948 11.842"></path>
        </svg>
      `,
      title: 'React Columns'
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {ColumnData} data — previously saved data
   * @param {TableConfig} config - user config for Tool
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly, block }: { data?: any; config?: ToolConfig; api: API; readOnly?: boolean; block?: BlockAPI }) {
    // start by setting up the required parts
    this.api = api;
    this.readOnly = readOnly;
    this.config = config || {};

    if (!this.readOnly) {
      this.onKeyUp = this.onKeyUp.bind(this);
    }

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'react-column-wrap'
    };

    this.nodes = {
      holder: undefined
    };

    this.rootDOM = null;

    this.editors = {}; //child editor in each columns

    this.editors.cols = [];

    this.data = data; //block data

    if (!Array.isArray(this.data.cols)) {
      this.data.cols = [];
      this.data.numberOfColumns = 2;
      this.editors.numberOfColumns = 2;
    } else {
      this.editors.numberOfColumns = this.data.cols.length;
    }
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement}
   */
  render(): HTMLElement {
    const containerNode = document.createElement('div');
    containerNode.setAttribute('class', this._CSS.wrapper);
    this.nodes.holder = containerNode;

    this.renderRootDOM();

    return this.nodes.holder;
  }

  /**
   * A helper to render react node.
   */
  renderRootDOM(): void {
    //refresh DOM
    if (this.rootDOM !== null) {
      this.rootDOM.unmount();
    }
    //init new dom
    const newRootDom = ReactDOM.createRoot(this.nodes.holder as HTMLElement); //react-18
    newRootDom.render(
      <Columns
        readOnly={this.readOnly}
        config={this.config}
        data={this.data}
        onEditorChange={(newEditor: any) => (this.editors = { ...newEditor })}
      />
    ); //react-18
    this.rootDOM = newRootDom;
  }

  /**
   * A helper to key event.
   */
  onKeyUp(e: React.KeyboardEvent<HTMLDivElement>): void {
    //console.log(e);
    //console.log('heyup');
    if (e.code !== 'Backspace' && e.code !== 'Delete') {
      return;
    }
  }

  renderSettings(): HTMLElement | TunesMenuConfig {
    return [
      {
        label: 'Two Columns',
        icon: `
          <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" stroke="currentColor" style="fill: none; stroke-width: 1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10,20H2V4h8V20z M22,4h-8v16h8V4z"></path>
          </svg>
        `,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          if (this.data.numberOfColumns !== 2) {
            this.data.numberOfColumns = 2;
            //this.data.cols.pop();
            //this.editors.cols.pop();
            this.blockAPI?.dispatchChange(); //--> apply to save
            this.renderRootDOM(); //refresh DOM
          }
        }
      },
      {
        label: 'Three Columns',
        icon: `
          <svg class="mar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 28 28" stroke="currentColor" style="fill: none; stroke-width: 1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6,20H2V4h4V20z M14,4h-4v16h4V4z M22,4h-4v16h4V4z"></path>
          </svg>
        `,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          if (this.data.numberOfColumns !== 3) {
            this.data.numberOfColumns = 3;
            //this.data.cols.pop();
            //this.editors.cols.pop();
            this.blockAPI?.dispatchChange(); //--> apply to save;
            this.renderRootDOM(); //refresh DOM
          }
        }
      }
      // {
      //   label: 'Roll Cols',
      //   icon: `<div>R</div>`,
      //   closeOnActivate: true,
      //   toggle: true,
      //   onActivate: () => {
      //     //this._rollCols();
      //   }
      // }
    ];
  }

  validate(savedData: any): boolean {
    //console.log('savedData', savedData);
    // if (!savedData.url.trim()){
    //   return false;
    // }
    return true;
  }

  async save() {
    if (!this.readOnly) {
      // console.log("Saving");
      for (let index = 0; index < this.editors.cols.length; index++) {
        if (this.editors.cols[index].editorInstance.save) {
          let colData = await this.editors.cols[index].editorInstance.save();
          this.data.cols[index] = colData;
        }
      }
    }
    return this.data;
  }
}
