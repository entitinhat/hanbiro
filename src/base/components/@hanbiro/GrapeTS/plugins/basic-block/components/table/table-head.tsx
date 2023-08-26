export default (comps: any, config: any) => {
  const type = 'thead';
  const attrKey = config.attrTableHeader;
  const classKey = config.classTableHeader;

  const defaultComponent = comps.getType('thead');
  const tableModel = defaultComponent.model;
  const tableView = defaultComponent.view;

  comps.addType(type, {
    isComponent(el: any) {
      if (el.hasAttribute && el.hasAttribute(attrKey)) {
        return { type };
      }
    },
    extend: 'thead',
    model: {
      defaults: {
        ...tableModel.prototype.defaults,
        ...config.headProps
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
