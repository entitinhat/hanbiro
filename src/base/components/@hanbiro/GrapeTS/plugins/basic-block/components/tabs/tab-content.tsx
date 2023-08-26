export const role = 'tabpanel';

export default (dc: any, config: any) => {
  dc.addType(config.typeTabContent, {
    model: {
      defaults: {
        name: 'Tab Content',
        draggable: false,
        copyable: false,
        removable: false,
        highlightable: false,
        attributes: { role },
        classes: config.classTabContent,
        traits: [],
        ...config.tabContentProps,
      },
    },
  });
};
