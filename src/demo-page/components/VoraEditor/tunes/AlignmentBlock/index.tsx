//editorjs
import { API, BlockAPI, BlockTune, ToolConfig } from '@editorjs/editorjs';
import { BlockTuneData } from '@editorjs/editorjs/types/block-tunes/block-tune-data';
import { TunesMenuConfig } from '@editorjs/editorjs/types/tools';

//styles
import { make } from './util';
import './index.scss';

interface AlignmentData extends BlockTuneData {
  align: string;
}

export default class AlignmentBlockTune implements BlockTune {
  settings: ToolConfig;
  block: BlockAPI;
  api: API;
  data: AlignmentData;

  //private alignmentSettings: { name: string; icon: string }[];
  private wrapper: HTMLElement | null;
  private _CSS: { alignment: any };

  /**
   * Default alignment
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_ALIGNMENT() {
    return 'left';
  }

  /**
   * Specifies Tool as Tune Tool
   *
   * @return {boolean}
   */
  public static isTune = true;

  //get default value
  getAlignment(): string {
    if (!!this.settings?.blocks && this.settings.blocks.hasOwnProperty(this.block.name)) {
      return this.settings.blocks[this.block.name];
    }
    if (!!this.settings?.default) {
      return this.settings.default;
    }
    return AlignmentBlockTune.DEFAULT_ALIGNMENT;
  }

  //initial state
  constructor({ api, data, config, block }: { api: API; data: AlignmentData; config?: ToolConfig; block: BlockAPI }) {
    this.api = api;
    this.block = block;
    /**
      config:{
        default: "right",
        blocks: {
          header: 'center',
          list: 'right'
        }
      },
    */
    this.settings = config;
    this.data = data || { align: this.getAlignment() };
    // this.alignmentSettings = [
    //   {
    //     name: 'left',
    //     icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`
    //   },
    //   {
    //     name: 'center',
    //     icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`
    //   },
    //   {
    //     name: 'right',
    //     icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 19h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 41h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"/></svg>`
    //   }
    // ];
    this.wrapper = null;
    this._CSS = {
      alignment: {
        left: 'ce-tune-alignment--left',
        center: 'ce-tune-alignment--center',
        right: 'ce-tune-alignment--right'
      }
    };
  }

  /**
   * Method called on Tool render. Pass Tool content as an argument.
   *
   * You can wrap Tool's content with any wrapper you want to provide Tune's UI
   *
   * @param {HTMLElement} pluginsContent — Tool's content wrapper
   *
   * @return {HTMLElement}
   */
  wrap(pluginsContent: HTMLElement): HTMLElement {
    this.wrapper = make('div');
    this.wrapper?.classList.toggle(this._CSS.alignment[this.data.align]);
    this.wrapper?.append(pluginsContent);
    return this.wrapper as HTMLElement;
  }

  /**
   * Returns block tune HTMLElement
   */
  render(): HTMLElement | TunesMenuConfig {
    // const wrapper = make('div');
    // this.alignmentSettings
    //   .map((align) => {
    //     const button = document.createElement('button');
    //     button.classList.add(this.api.styles.settingsButton);
    //     button.innerHTML = align.icon;
    //     button.type = 'button';

    //     button.classList.toggle(this.api.styles.settingsButtonActive, align.name === this.data.align);
    //     wrapper.appendChild(button);
    //     return button;
    //   })
    //   .forEach((element, index, elements) => {
    //     element.addEventListener('click', () => {
    //       this.data = {
    //         alignment: this.alignmentSettings[index].name
    //       };
    //       elements.forEach((el, i) => {
    //         const { name } = this.alignmentSettings[i];
    //         el.classList.toggle(this.api.styles.settingsButtonActive, name === this.data.align);
    //         //toggle alignment style class for block
    //         this.wrapper?.classList.toggle(this._CSS.alignment[name], name === this.data.align);
    //       });
    //     });
    //   });
    // return wrapper;

    //v2.26
    return [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 23h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m10 45h28c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        label: 'Align left',
        toggle: 'alignment', // <--- specify toggle group name
        isActive: this.data.align === 'left',
        onActivate: () => {
          this.data = {
            align: 'left'
          };
          //toggle alignment style class for block
          this.wrapper?.classList.remove(...this.wrapper?.classList);
          this.wrapper?.classList.toggle(this._CSS.alignment['left']);
        }
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 23c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m46 45c1.104 0 2-.896 2-2s-.896-2-2-2h-28c-1.104 0-2 .896-2 2s.896 2 2 2z"/></svg>`,
        label: 'Align center',
        toggle: 'alignment', // <--- specify toggle group name
        isActive: this.data.align === 'center',
        onActivate: () => {
          this.data = {
            align: 'center'
          };
          //toggle alignment style class for block
          this.wrapper?.classList.remove(...this.wrapper?.classList);
          this.wrapper?.classList.toggle(this._CSS.alignment['center']);
        }
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" id="Layer" enable-background="new 0 0 64 64" height="20" viewBox="0 0 64 64" width="20"><path d="m54 8h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 52h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 19h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 30h-44c-1.104 0-2 .896-2 2s.896 2 2 2h44c1.104 0 2-.896 2-2s-.896-2-2-2z"/><path d="m54 41h-28c-1.104 0-2 .896-2 2s.896 2 2 2h28c1.104 0 2-.896 2-2s-.896-2-2-2z"/></svg>`,
        label: 'Align right',
        toggle: 'alignment', // <--- specify toggle group name
        isActive: this.data.align === 'right',
        onActivate: () => {
          this.data = {
            align: 'right'
          };
          //toggle alignment style class for block
          this.wrapper?.classList.remove(...this.wrapper?.classList);
          this.wrapper?.classList.toggle(this._CSS.alignment['right']);
        }
      }
    ];
  }

  /**
   * save
   * @returns {*}
   */
  save(): AlignmentData {
    //console.log('save data', this.data);
    return this.data;
  }
}
