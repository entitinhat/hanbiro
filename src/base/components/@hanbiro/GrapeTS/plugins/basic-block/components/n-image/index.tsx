import { functions } from 'lodash';

export default (editor: any, config: any) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('image');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  if (editor) {
    editor.on('component:drag:start', (components: any) => {
      const { index, target, parent } = components;

      const getType = () => {
        let type = target.get('type');
        if (!type) {
          type = target.get('tagName');
        }

        return type;
      };

      const compType = getType();
      if (compType === 'n-image') {
        const parentElement = target?.view?.el?.parentElement;
        const children = parentElement.querySelector('.image-select');
        if (parentElement && children) {
          parentElement.removeChild(children);
        }
      }
    });
    editor.on('component:remove:before', (components: any) => {
      if (components.get('tagName') == 'img') {
        const parentElement = components.getEl().parentElement;
        const children = parentElement.querySelector('.image-select');
        if (children) {
          parentElement.removeChild(children);
        }
      }
    });
  }

  domc.addType('n-image', {
    isComponent(el: any) {
      if (
        (el.tagName === 'IMG' && el.classList && el.classList.contains('n-img')) ||
        el.tagName === 'IMG' ||
        (el.classList && el.classList.contains('big'))
      ) {
        return { type: 'n-image' };
      }
    },
    extend: 'image',
    model: {
      defaults: {
        name: 'n-image',
        //content: 'Image',
        //attributes: { target: '_blank' },
        //style: btnStyle,
        traits: [
          {
            type: 'select',
            name: 'imgType',
            label: 'Type',
            options: [
              { value: 'img-only', name: 'Image Only' },
              { value: 'img-top', name: 'Image on Top' },
              { value: 'img-bottom', name: 'Image on Bottom' },
              { value: 'img-left', name: 'Image on Left' },
              { value: 'img-right', name: 'Image on Right' }
            ],
            changeProp: 1
          },
          {
            type: 'select',
            name: 'dmode',
            label: 'Drag mode',
            options: [{ value: 'absolute' }, { value: 'traslate' }],
            changeProp: 1
          },
          {
            type: 'text',
            name: 'imgAlt',
            label: 'Alt',
            changeProp: 1
          }
          // {
          //   type: 'text',
          //   placeholder: 'www.vora.net',
          //   name: 'surveyLink',
          //   label: 'Link Url',
          //   changeProp: 1,
          // },
        ],
        // dmode:'absolute',
        imgType: 'img-only' //default value for trait 'type',
        // dmode: 'absolute'
      },

      async init(this: any) {
        //call api to get data
        this.on('change:imgType', this.handleTypeChange);
        this.on('change:imgAlt', this.handleAltChange);
        this.on('change:dmode', this.handleDModeChange);
        //this.on('change:surveyLink', this.handleLinkChange);
      },
      handleDModeChange(this: any) {
        const dragMode = this.get('dmode');
        this.set('dmode', dragMode);
        if (dragMode == 'traslate') {
          const oldStyles = this.getStyle();
          // console.log('old style:', oldStyles, this);
          this.setStyle({ ...oldStyles, position: 'relative', top: '', left: '' });
        }
      },
      handleTypeChange(this: any) {
        //// console.log('a type value > ', this.get('imgType'));
        const curType = this.get('imgType');
        switch (curType) {
          case 'img-only':
            this.setStyle('');
            break;
          case 'img-top':
            this.setStyle({
              float: 'top',
              'margin-bottom': '10px'
            });
            break;
          case 'img-top':
            this.setStyle({
              float: 'bottom',
              'margin-top': '10px'
            });
            break;
          case 'img-left':
            this.setStyle({
              float: 'left',
              'margin-right': '15px',
              'margin-bottom': '10px'
            });
            break;
          case 'img-right':
            this.setStyle({
              float: 'right',
              'margin-left': '15px',
              'margin-bottom': '10px'
            });
            break;
        }
      },

      handleAltChange(this: any) {
        //// console.log('a name value > ', this.get('surveyName'));
        const newAlt = this.get('imgAlt');
        this.setAttributes({ alt: newAlt });
      }

      // handleLinkChange(el: any) {
      //   //// console.log('a name value > ', this.get('surveyLink'));
      //   const newLink = this.get('surveyLink');
      //   el.setAttributes({ href: newLink });
      // },

      // toHTML() {
      //   const tagName = this.get('tagName');
      //   const price = this.get('defaultPrice');
      //   return `<${tagName}>${price}</{tagName}>`;
      // },
    },
    //extendFnView: ['render'],
    view: defaultView.extend({
      // init() {
      //   this.listenTo(this.model, 'change:defaultPrice', this.render);
      // },
      // onRender() {
      //   this.el.innerHTML = this.model.get('defaultPrice');
      // },
      createButton() {
        const selector = `#${this.el.id}`;
        const imageComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
        // console.log("editor?.DomComponents?.getWrapper()",editor?.DomComponents?.getWrapper())
        // console.log("editor?.DomComponents?.getWrapper()",this.el.id)
        // console.log("editor?.DomComponents?.getWrapper()",selector)
        // console.log("editor?.DomComponents?.getWrapper()",editor?.DomComponents?.getWrapper().find(selector))
        const width = this.el.offsetWidth;
        const height = this.el.offsetHeight;
        const left = this.el.offsetLeft + width * 0.5;
        const top = this.el.offsetTop + height * 0.5;

        const content: any = document.createElement('div');
        content.style = `position: absolute; top:${top}px; left:${left}px;display:flex;justify-content:center;align-items:center;
          transform: translate(-50%,-50%);
      `;
        content.className = 'image-select';

        const buttonElement: any = document.createElement('button');
        buttonElement.style = `
          background-color: rgba(73,73,73,.7);
          font-size: 1rem;
          border-radius: 50%;
          border: none;
          width:${height > width ? width * 0.2 : height * 0.2}px;
          height:${height > width ? width * 0.2 : height * 0.2}px;
          font-size: ${height > width ? width * 0.1 : height * 0.1}px;
          cursor: pointer;
          color:white`;
        buttonElement.innerHTML = '+';

        content.appendChild(buttonElement);

        buttonElement.addEventListener('click', () => {
          const am = editor.AssetManager;
          am.open({
            types: ['n-image'], // This is the default option
            // Without select, nothing will happen on asset selection
            select(asset: any, complete: any) {
              const selected = imageComponent;
              console.log('selected asset: ' + selected);
              console.log('selected asset: ' + selected.is('n-image'));
              if (selected && selected.is('n-image')) {
                // you have to use editor.getSelected().set('src',image_Url) to update image
                selected.set('src', asset.getSrc());
                // The default AssetManager UI will trigger `select(asset, false)`
                // on asset click and `select(asset, true)` on double-click
                complete && am.close();
              }
            }
          });
        });

        buttonElement.addEventListener('mouseenter', () => {
          buttonElement.style.backgroundColor = '#494949';
        });

        buttonElement.addEventListener('mouseout', () => {
          buttonElement.style.backgroundColor = 'rgba(73,73,73,.7)';
        });
        return content;
      },
      events: {
        ...defaultView.events,
        click: function (event: any) {
          const parentElement = this.el.parentElement;
          const imageButton = this.createButton();
          const children = parentElement.querySelector('.image-select');
          if (!children) {
            parentElement.appendChild(imageButton);
          }
        },
        mouseenter: function (event: any) {
          const parentElement = this.el.parentElement;
          parentElement.style = 'position:relative;';

          const imageButton = this.createButton();
          const children = parentElement.querySelector('.image-select');

          const selectedComponent = editor.getSelected();

          if (!children && selectedComponent && selectedComponent.is('n-image') && selectedComponent.view.cid === this.cid) {
            parentElement.appendChild(imageButton);
          }
        },
        mouseleave: function (e: any) {
          const outsidePointFactor = 29;
          // console.log('this', this.el.clientTop, this.el.clientLeft);
          // console.log('this', [this.el]);

          // minus position of reisize point
          const top = this.el.y + outsidePointFactor;
          const left = this.el.x + outsidePointFactor;
          const bottom = top + this.el.offsetHeight - outsidePointFactor * 2;
          const right = left + this.el.offsetWidth - outsidePointFactor * 2;

          // console.log(top, bottom, left, right);
          // console.log(e.y, e.x);

          const isHover = e.y > top && e.y < bottom && e.x > left && e.x < right;
          const parentElement = this.el.parentElement;
          const children = parentElement.querySelector('.image-select');

          if (children && !isHover) {
            parentElement.removeChild(children);
          }
        }
      }
    })
  });
};
