export default (comps: any, config: any) => {
  const type = 'tfoot';
  const attrKey = config.attrTableFooter;
  const classKey = config.classTableFooter;

  const defaultComponent = comps.getType('tfoot');
  const tableModel = defaultComponent.model;
  const tableView = defaultComponent.view;

  comps.addType(type, {
    isComponent(el: any) {
      if (el.hasAttribute && el.hasAttribute(attrKey)) {
        return { type };
      }
    },
    extend: 'tfoot',
    model: {
      defaults: {
        ...config.footerProps
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
