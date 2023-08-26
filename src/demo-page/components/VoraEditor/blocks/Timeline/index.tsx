import ReactDOM from 'react-dom/client';

//editorjs
import { API, BlockAPI, BlockTool, BlockToolData, ToolConfig } from '@editorjs/editorjs';
import { TunesMenuConfig } from '@editorjs/editorjs/types/tools';

//local
import EventTimeline from './EventTimeline';
import './index.scss';

interface TimelineData extends BlockToolData {
  events: any[];
  withBorder?: boolean; //FOR TEST
}

interface SettingProps {
  name: string;
  icon: string;
}

export default class Timeline implements BlockTool {
  api: API;
  readOnly: boolean | undefined;
  data: TimelineData;
  config: ToolConfig;
  blockAPI: BlockAPI | undefined;

  private CSS: any;
  private nodes: any;
  rootDOM: any;

  static get toolbox(): { icon: string; title?: string } {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>`,
      title: 'Timeline'
    };
  }

  static get isReadOnlySupported(): boolean {
    return true;
  }

  constructor({
    data,
    config,
    api,
    readOnly,
    block
  }: {
    data?: TimelineData;
    config?: ToolConfig;
    api: API;
    readOnly?: boolean;
    block?: BlockAPI;
  }) {
    this.api = api;
    this.config = config || {};
    this.readOnly = readOnly;
    this.data = {
      events: data?.events || [],
      //...more
      withBorder: data?.withBorder !== undefined ? data.withBorder : false
    };
    this.blockAPI = block;

    this.rootDOM = null;
    this.CSS = {
      wrapper: 'walkthrough-timeline'
    };

    this.nodes = {
      holder: null
    };
  }

  render(): HTMLElement {
    const rootNode = document.createElement('div');
    rootNode.setAttribute('class', this.CSS.wrapper);
    this.nodes.holder = rootNode;

    this.renderRootDOM();

    return this.nodes.holder;
  }

  save(block: HTMLElement): TimelineData {
    const sanitizerConfig = {
      b: true,
      a: {
        href: true
      },
      i: true
    };
    //clean every tag except b, a and i.
    //const sanitizedData = this.api.sanitizer.clean(this.data);

    //console.log('save data', this.data);
    return this.data;
  }

  validate(savedData: TimelineData): boolean {
    // if (!savedData.url.trim()){
    //   return false;
    // }
    return true;
  }

  renderSettings(): HTMLElement | TunesMenuConfig {
    // const wrapper = document.createElement('div');

    // this.settings.forEach((tune) => {
    //   let button = document.createElement('div');

    //   button.classList.add('cdx-settings-button');
    //   button.innerHTML = tune.icon;
    //   wrapper.appendChild(button);

    //   button.addEventListener('click', () => {
    //     this._toggleTune(tune.name);
    //     button.classList.toggle('cdx-settings-button--active');
    //   });
    // });

    // return wrapper;

    //v2.26
    return [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`,
        label: 'With border',
        toggle: 'list', // <--- specify toggle group name
        onActivate: () => {
          console.log('Image tune clicked border');
          this.data.withBorder = !this.data.withBorder; //data changes
          this.renderRootDOM(); //re-render DOM
          this.blockAPI?.dispatchChange(); //--> apply to save
        }
      },
      {
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
        label: 'Stretched',
        toggle: 'list', // <--- specify toggle group name
        onActivate: () => {
          console.log('Image tune clicked Stretched');
          this.renderRootDOM(); //re-render DOM
          this.blockAPI?.dispatchChange(); //--> apply to save
        }
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>`,
        label: 'With background',
        toggle: 'list', // <--- specify toggle group name
        onActivate: () => {
          console.log('Image tune clicked background');
          this.renderRootDOM(); //re-render DOM
          this.blockAPI?.dispatchChange(); //--> apply to save
        }
      }
    ];
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
      <EventTimeline onDataChange={(newData: TimelineData) => (this.data = { ...newData })} readOnly={this.readOnly} data={this.data} />
    ); //react-18
    this.rootDOM = newRootDom;
  }
}
