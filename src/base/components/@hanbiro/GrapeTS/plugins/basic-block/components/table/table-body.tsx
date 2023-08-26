export default (comps: any, config: any) => {
  const type = 'tbody';
  const attrKey = config.attrTableBody;
  const classKey = config.classTableBody;

  const defaultComponent = comps.getType('tbody');
  const tableModel = defaultComponent.model;
  const tableView = defaultComponent.view;

  comps.addType(type, {
    isComponent(el: any) {
      if (el.hasAttribute && el.hasAttribute(attrKey)) {
        return { type };
      }
    },
    extend: 'tbody',
    model: {
      defaults: {
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
