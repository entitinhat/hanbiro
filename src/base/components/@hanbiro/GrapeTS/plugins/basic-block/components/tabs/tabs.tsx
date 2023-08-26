export default (
  dc: any,
  { typeTab, typeTabContent, typeTabContents, typeTabContainer, style, ...config }: any,
) => {
  const type = config.typeTabs;

  const script = function (this: any, props: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const el = this;
    const classTabActive = props.classactive;
    const selectorTab = props.selectortab;
    const { history, _isEditor } = window as any;
    const attrTabindex = 'tabIndex';
    const attrSelected = 'ariaSelected';
    const roleTab = '[role=tab]';
    const roleTabContent = '[role=tabpanel]';
    const { body, location } = document;
    const matches =
      (body as any).matchesSelector ||
      (body as any).webkitMatchesSelector ||
      (body as any).mozMatchesSelector ||
      (body as any).msMatchesSelector;
    const each = (items: any, clb: any) => {
      const arr = items || [];
      for (let i = 0; i < arr.length; i++) clb(arr[i], i);
    };

    const hideContents = () => {
      each(el.querySelectorAll(roleTabContent), (i: any) => (i.hidden = true));
    };

    const getTabId = (item: any) => item.getAttribute(selectorTab);
    const qS = (elem: any, qs: any) => elem.querySelector(qs);
    const getAllTabs = () => el.querySelectorAll(roleTab);
    const upTabIdx = (item: any, val: any) => !_isEditor && (item[attrTabindex] = val);

    const activeTab = (tabEl: any) => {
      each(getAllTabs(), (item: any) => {
        item.className = item.className.replace(classTabActive, '').trim();
        item[attrSelected] = 'false';
        upTabIdx(item, '-1');
      });
      hideContents();
      tabEl.className += ' ' + classTabActive;
      tabEl[attrSelected] = 'true';
      upTabIdx(tabEl, '0');
      const tabContentId = getTabId(tabEl);
      const tabContent = tabContentId && qS(el, `#${tabContentId}`);
      tabContent && (tabContent.hidden = false);
    };

    const getTabByHash = () => {
      const hashId = (location.hash || '').replace('#', '');
      const qrStr = (att: any) => `${roleTab}[${att}=${hashId}]`;
      return hashId && qS(el, qrStr(selectorTab));
    };

    const getSelectedTab = (target: any) => {
      let found: any;
      each(getAllTabs(), (item: any) => {
        if (found) return;
        if (item.contains(target)) found = item;
      });
      return found;
    };

    let tabToActive = qS(el, `.${classTabActive}${roleTab}`);
    tabToActive = tabToActive || getTabByHash() || qS(el, roleTab);
    tabToActive && activeTab(tabToActive);

    el.addEventListener('click', (ev: any) => {
      let { target } = ev;
      let found = matches.call(target, roleTab);

      if (!found) {
        target = getSelectedTab(target);
        if (target) found = 1;
      }

      if (found && !ev.__trg && target.className.indexOf(classTabActive) < 0) {
        ev.preventDefault();
        ev.__trg = 1;
        activeTab(target);
        const id = getTabId(target);
        try {
          history && history.pushState(null, '', `#${id}`);
        } catch (e) {
          return;
        }
      }
    });
  };
  const defTabs = [1, 2, 3].map((i) => ({ type: typeTab }));
  const traits = [
    {
      full: 1,
      type: 'button',
      label: false,
      text: 'Add Tab',
      command: (ed: any) => {
        const sel = ed.getSelected();
        sel && sel.addTab();
      },
    },
  ];

  dc.addType(type, {
    model: {
      defaults: {
        name: 'Tabs',
        classactive: config.classTabActive,
        selectortab: config.selectorTab,
        'script-props': ['classactive', 'selectortab'],
        script,
        traits,
        components: [
          { type: typeTabContainer, components: defTabs },
          { type: typeTabContents },
          style && `<style>${style(config)}</style>`,
        ],
        ...config.tabsProps,
      },

      init(this: any) {
        this.findTabs().map(this.__onTab);
        this.listenTo(this.getTabContainerType().components(), 'add', this.__onTab);
      },

      __onTab(tab: any, v: any, opts: any) {
        !opts.avoidStore && !opts.temporary && tab.__initTab && tab.__initTab();
      },

      getTabContainerType(this: any) {
        return this.findType(typeTabContainer)[0];
      },

      getContentsType(this: any) {
        return this.findType(typeTabContents)[0] || this;
      },

      findTabs(this: any) {
        return this.findType(typeTab);
      },

      findContents(this: any) {
        return this.findType(typeTabContent);
      },

      addTab(content: any) {
        const cnt = this.getTabContainerType();
        cnt.append({
          type: typeTab,
          components: content,
        });
      },
    },
  });
};
