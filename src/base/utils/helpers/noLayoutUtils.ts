import { getConfigForMenu } from '@base/config/noLayoutWrite';
import validators from '@base/utils/validation/fieldValidator';

import { getParams } from './pageLayoutUtils';

const WriteFieldParse = (menu: string, initValues?: any) => {
  let fields: any[] = [];
  let defaultValues: any = {};
  let mappingParams: any = {};

  const menuConfig = getConfigForMenu(menu);
  Object.keys(menuConfig).forEach((keyName) => {
    const {
      defaultValue,
      parseParam,
      component,
      showFullRow = false,
      validate: customValidate,
      componentProps,
      languageKey,
      useTooltip,
      tooltipLangKey,
      required,
      hideTitle
    } = menuConfig[keyName] ?? {};

    // Parse value
    const value = initValues?.[keyName] ? initValues[keyName] : defaultValue ?? '';
    // Parse validate
    let validate = { ...customValidate };
    if (required) {
      validate.require = validators.required; //react-hook-form props
    }

    const field = {
      languageKey: languageKey,
      keyName: keyName,
      value: value,
      columns: showFullRow ? 1 : 2,
      tooltipShow: useTooltip,
      tooltipText: tooltipLangKey,
      validate: validate,
      componentProps: componentProps,
      Component: component,
      hideTitle: hideTitle
    };
    fields.push(field);
    defaultValues[keyName] = value;
    mappingParams[keyName] = parseParam;
  });

  return { fields, defaultValues, mappingParams };
};

export const WriteParseFields = (menu: string, initValues?: any) => {
  const { defaultValues, fields, mappingParams } = WriteFieldParse(menu, initValues);
  return {
    fields,
    defaultValues,
    getParams: getParams(mappingParams)
  };
};

export const ViewFieldParse = (data: any, menuConfig: any, isEdit: boolean, refetchQueryKey?: string[] | string[][]) => {
  let fields: any[] = [];

  Object.keys(menuConfig).forEach((keyName) => {
    const {
      component,
      languageKey,
      showFullRow,
      componentProps,
      viewProps,
      getDefaultValue,
      getValueView,
      getValueEdit,
      getMutationValue,
      checkFieldEdit,
      checkMappingField,
      mappingData,
      hideFieldLabel
    } = menuConfig[keyName] ?? {};

    if (checkMappingField) {
      if (!checkMappingField(data)) {
        return;
      }
    } else {
      // if (!data?.hasOwnProperty(keyName)) {
      //   return;
      // }
    }

    const field = {
      config: {
        getValueView,
        getValueEdit,
        getMutationValue,
        getDefaultValue,
        componentProps,
        viewProps,
        component,
        showFullRow,
        refetchQueryKey,
        sectionId: data.id,
        hideFieldLabel
      },
      keyName,
      languageKey,
      userPermission: {
        isEdit: checkFieldEdit ? checkFieldEdit(data) : isEdit,
        isShow: true
      },
      data: mappingData ? mappingData(data) : data[keyName]
    };
    fields.push(field);
  });

  return fields;
};
