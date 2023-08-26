export const finalizeParams = (formData: any) => {
  let newParams: any = {
    ...formData
  };
  let { content, category, ...remainValues } = formData;
  let customData: any = {};
  if (content) {
    customData.tpl = content.tpl ? content.tpl : null;
    customData.content = JSON.stringify(content.content);
  }
  console.log(' customData.content', customData.content);
  if (category && category.category) {
    customData.folder = {
      id: category.id,
      name: category.name
    };
    customData.category = {
      id: category.category.id,
      name: category.category.name
    };
  } else {
    customData.category = {
      id: category.id,
      name: category.name
    };
  }
  newParams = {
    knowledgebase: {
      ...remainValues,
      ...customData
    }
  };
  return newParams;
};
