export default (editor: any, opt: any) => {
  const TOOLBAR_CELL = [
    // {
    //   attributes: { class: 'fa fa-arrows' },
    //   command: 'tlb-move',
    // },
    {
      attributes: { class: 'fa fa-caret-square-o-up', title: 'Insert row above' },
      //label: 'Insert',
      //title: 'Insert',
      command: 'tlb-insert-row-above',
    },
    {
      attributes: { class: 'fa fa-caret-square-o-down', title: 'Insert row below' },
      command: 'tlb-insert-row-below',
    },
    {
      attributes: { class: 'fa fa-caret-square-o-left', title: 'Insert column left' },
      command: 'tlb-insert-col-left',
    },
    {
      attributes: { class: 'fa fa-caret-square-o-right', title: 'Insert column right' },
      command: 'tlb-insert-col-right',
    },
    {
      attributes: { class: 'fa fa-minus-square-o', title: 'Remove row' },
      command: 'tlb-delete-row',
    },
    {
      attributes: { class: 'fa fa-window-close', title: 'Remove column' },
      command: 'tlb-delete-column',
    },
    // {
    //   attributes: { class: 'fa fa-clone' },
    //   command: 'tlb-clone',
    // },
    // {
    //   attributes: { class: 'fa fa-trash-o' },
    //   command: 'tlb-delete',
    // },
  ];
  const getCellToolbar = () => TOOLBAR_CELL;

  editor.on('component:selected', (m: any) => {
    const compType = m.get('type');
    switch (compType) {
      case 'cell':
        m.set('toolbar', getCellToolbar()); // set a toolbars
    }
  });
};
