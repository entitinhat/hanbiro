import { nanoid } from '@base/utils/helpers';
import EditorJS, { API, BlockAPI, BlockTool, ToolConfig } from '@editorjs/editorjs';
import { TunesMenuConfig } from '@editorjs/editorjs/types/tools';

//styles
import './index.scss';

export default class ColumnsBlock implements BlockTool {
  api: API;
  readOnly: boolean | undefined;
  data: any;
  config: ToolConfig;
  blockAPI: BlockAPI | undefined;
  private _CSS: { block: string; wrapper: string };
  editors: any;
  colWrapper: any;

  constructor({ data, config, api, readOnly, block }: { data?: any; config?: ToolConfig; api: API; readOnly?: boolean; block?: BlockAPI }) {
    // start by setting up the required parts
    this.api = api;
    this.readOnly = readOnly;
    this.config = config || {};

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-EditorJsColumns'
    };

    if (!this.readOnly) {
      this.onKeyUp = this.onKeyUp.bind(this);
    }

    //this._data = {};

    this.editors = {};

    this.colWrapper = undefined;

    this.editors.cols = [];

    this.data = data;

    if (!Array.isArray(this.data.cols)) {
      this.data.cols = [];
      this.editors.numberOfColumns = 2;
    } else {
      this.editors.numberOfColumns = this.data.cols.length;
    }
  }

  static get isReadOnlySupported() {
    return true;
  }

  onKeyUp(e: any) {
    console.log(e);
    console.log('heyup');
    if (e.code !== 'Backspace' && e.code !== 'Delete') {
      return;
    }
  }

  get CSS() {
    return {
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive
    };
  }

  renderSettings(): HTMLElement | TunesMenuConfig {
    return [
      {
        label: 'Two Cols',
        icon: `<div>2</div>`,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this._updateCols(2);
        }
      },
      {
        label: 'Three Cols',
        icon: `<div>3</div>`,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this._updateCols(3);
        }
      },
      {
        label: 'Roll Cols',
        icon: `<div>R</div>`,
        closeOnActivate: true,
        toggle: true,
        onActivate: () => {
          this._rollCols();
        }
      }
    ];
  }

  _rollCols() {
    // this shifts or "rolls" the columns
    this.data.cols.unshift(this.data.cols.pop());
    this.editors.cols.unshift(this.editors.cols.pop());
    this._rerender();
  }

  async _updateCols(num: number) {
    // Should probably update to make number dynamic... but this will do for now
    if (num == 2) {
      if (this.editors.numberOfColumns == 3) {
        // let resp = await Swal.fire({
        // 	title: "Are you sure?",
        // 	text: "This will delete Column 3!",
        // 	icon: "warning",
        // 	showCancelButton: true,
        // 	confirmButtonColor: "#3085d6",
        // 	cancelButtonColor: "#d33",
        // 	confirmButtonText: "Yes, delete it!",
        // });

        //if (resp.isConfirmed) {
        this.editors.numberOfColumns = 2;
        this.data.cols.pop();
        this.editors.cols.pop();
        this._rerender();
        //}
      }
    }
    if (num == 3) {
      this.editors.numberOfColumns = 3;
      this._rerender();
      // console.log(3);
    }
  }

  async _rerender() {
    await this.save();
    // console.log(this.colWrapper);

    for (let index = 0; index < this.editors.cols.length; index++) {
      this.editors.cols[index].destroy();
    }
    this.editors.cols = [];

    this.colWrapper.innerHTML = '';

    // console.log("Building the columns");

    for (let index = 0; index < this.editors.numberOfColumns; index++) {
      // console.log("Start column, ", index);
      let col = document.createElement('div');
      col.classList.add('ce-editorjsColumns_col');
      col.classList.add('editorjs_col_' + index);

      let editor_col_id = nanoid();
      // console.log("generating: ", editor_col_id);
      col.id = editor_col_id;

      this.colWrapper.appendChild(col);

      let editorjs_instance = new EditorJS({
        defaultBlock: 'paragraph',
        holder: editor_col_id,
        tools: this.config.tools,
        data: this.data.cols[index],
        readOnly: this.readOnly,
        minHeight: 50
      });

      this.editors.cols.push(editorjs_instance);
    }
  }

  render() {
    // This is needed to prevent the enter / tab keys - it globally removes them!!!

    // it runs MULTIPLE times. - this is not good, but works for now
    window.helpme = document.addEventListener(
      'keydown',
      function (event) {
        // if (event.key === "Enter" && event.altKey) {
        // 	console.log("ENTER ALT Captured")
        // 	console.log(event.target)

        // 	// let b = event.target.dispatchEvent(new KeyboardEvent('keyup',{'key':'a'}));

        // 	event.target.innerText += "Aß"

        // 	// console.log(b)
        // }
        // else
        if (event.key === 'Enter') {
          event.stopImmediatePropagation();
          event.preventDefault();
          console.log('ENTER Captured');
        }
        if (event.key === 'Tab') {
          event.stopImmediatePropagation();
          event.preventDefault();
          console.log('TAB Captured');
        }
      },
      true
    );

    // console.log("Generating Wrapper");

    // console.log(this.api.blocks.getCurrentBlockIndex());

    this.colWrapper = document.createElement('div');
    this.colWrapper.classList.add('ce-editorjsColumns_wrapper');

    for (let index = 0; index < this.editors.cols.length; index++) {
      this.editors.cols[index].destroy();
    }

    // console.log(this.editors.cols);
    this.editors.cols = []; //empty the array of editors
    // console.log(this.editors.cols);

    // console.log("Building the columns");

    for (let index = 0; index < this.editors.numberOfColumns; index++) {
      // console.log("Start column, ", index);
      let col = document.createElement('div');
      col.classList.add('ce-editorjsColumns_col');
      col.classList.add('editorjs_col_' + index);

      let editor_col_id = nanoid();
      // console.log("generating: ", editor_col_id);
      col.id = editor_col_id;

      this.colWrapper.appendChild(col);

      let editorjs_instance = new EditorJS({
        defaultBlock: 'paragraph',
        holder: editor_col_id,
        tools: this.config.tools,
        data: this.data.cols[index],
        readOnly: this.readOnly,
        minHeight: 50
      });

      this.editors.cols.push(editorjs_instance);
      // console.log("End column, ", index);
    }
    return this.colWrapper;
  }

  async save() {
    if (!this.readOnly) {
      // console.log("Saving");
      for (let index = 0; index < this.editors.cols.length; index++) {
        if (this.editors.cols[index].save) {
          let colData = await this.editors.cols[index].save();
          this.data.cols[index] = colData;
        }
      }
    }
    return this.data;
  }

  static get toolbox() {
    return {
      icon: `<svg width="14" height="14" viewBox="0 -1 14 14" xmlns="http://www.w3.org/2000/svg">
      <defs></defs>
      <rect x="1.194" y="-0.041" width="11.601" height="12.11" rx="1" ry="1" style="fill: rgb(255, 255, 255); stroke: rgb(0, 0, 0); stroke-width: 1.5px;"></rect>
      <path style="stroke: rgb(0, 0, 0); stroke-width:1.5px" d="M 7.032 -0.034 L 6.948 11.842"></path>
    </svg>`,
      title: 'Js Columns'
    };
  }
}
