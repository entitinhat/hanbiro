export default (comps: any, config: any) => {
  const type = 'cell';
  const attrKey = config.attrTableCell;
  const classKey = config.classTableCell;

  const defaultComponent = comps.getType('cell');
  const tableModel = defaultComponent.model;
  const tableView = defaultComponent.view;

  comps.addType(type, {
    isComponent(el: any) {
      if (el.hasAttribute && el.hasAttribute(attrKey)) {
        return { type };
      }
    },
    extend: 'cell',
    model: {
      defaults: {
        ...tableModel.prototype.defaults,
        editable: true,
        // components: [
        //   {
        //     tagName: 'span',
        //     type: 'text',
        //     attributes: { title: 'cell' },
        //     components: [
        //       {
        //         type: 'textnode',
        //         content: 'Cell',
        //       },
        //     ],
        //   },
        // ],
        ...config.bodyProps
      },
      init(this: any) {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
      }
    },
    view: tableView.extend({})
  });
};
