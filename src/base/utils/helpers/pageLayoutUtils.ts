import { isFunction, isUndefined } from 'lodash';
import validators from '@base/utils/validation/fieldValidator';
import { getConfigForMenu } from '@base/config/pagelayoutWrite';
import { BasicConfig } from '@base/config/write-field';
import { PageLayoutSchema, PageLayoutData, PageLayoutField, DataSourceProps, PageLayoutSectionField } from '@base/types/pagelayout';

/**
 * Define function get param base on value of field
 * @param {*} mappingParams
 * @returns
 */
export const getParams = (mappingParams: any) => (data: any) => {
  //// console.log('mappingParams', mappingParams);
  let params: any = {};
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const parseParam = mappingParams[key];
      params[key] = parseParam ? parseParam(value) : value;
    });
  }
  return params;
};

const getTabInformation = (section: any, index: number) => {
  return {
    value: index,
    title: section?.languageKey,
    description: section?.languageKey,
    icon: section?.icon?.icon || 'User', //section?.keyName === "basic" ? "User" : "AlertTriangle", //section?.field_icon?.icon, //
    iconType: section?.icon?.iconType || 'feather'
  };
};

export const goParseAttributes = (attributes = []) => {
  if (Array.isArray(attributes)) {
    return attributes.reduce(
      (previousValue: any, currentValue: any) => ({
        ...previousValue,
        [currentValue.keyName]: currentValue
      }),
      {}
    );
  }

  return {};
};

/**
 * Parse data api to models
 * {
        section: 1, // Section of field
        language_key: "subject_2", // Label of field
        key_name: "subject_2", // As name of field
        data_type: "text", // Data type of field, which use mapping for component and config
        value: "", // Init value of field
        columns: 1, // Total field will display on an one row || Maximum: 4
        tooltip_show: true, // Display tooltip
        tooltip_text: "crm_new_layout_attribute_tooltip_text", // Message of tooltip
        validate: {
            // Define all validation of field
            require: validators.require,
        }
    }
 */
//GO API
const goParseData = (sections: PageLayoutSectionField[] = [], menu: string) => {
  let fields: any[] = [];
  let defaultValues: any = {};
  let mappingParams: any = {};
  let tabs: any[] = [];
  let exceptMenus: string[] = [];
  // MENU_ACTIVITY_TASK,
  // MENU_ACTIVITY_CALL,
  // MENU_ACTIVITY_DM,
  // MENU_ACTIVITY_EMAIL,
  // MENU_ACTIVITY_FAX,
  // MENU_ACTIVITY_SMS,
  // ];
  const menuConfig = getConfigForMenu(menu); //menu = 'customer_account' or 'product_product'
  let isExceptMenu = exceptMenus.indexOf(menu) !== -1 ? true : false;

  //create Field based on page layout data
  sections.forEach((section: any, index: number) => {
    tabs.push(getTabInformation(section, index));
    const children = section?.children || [];
    children.forEach((data: any) => {
      /** _value_type, _value: we don't use it any more */
      const { languageKey, keyName, dataType, attributes, permissionType } = data;
      //get config by keyName
      let fieldConfig = !isExceptMenu ? menuConfig?.[keyName] : menuConfig?.[dataType];
      if (!fieldConfig) return; // continue If there is no fieldconfig
      //// console.log(keyName);
      //// console.log(fieldConfig);
      const {
        defaultValue,
        parseParam,
        component,
        showFullRow = false,
        validate: customValidate,
        componentProps,
        getProps,
        hideTitle
      } = fieldConfig ?? {};
      const attrs = goParseAttributes(attributes);
      // Parse value
      const value = defaultValue ?? '';
      // Parse validate
      let newValidate = { ...customValidate }; //{ function, message }
      if (attrs?.required?.value == 1) {
        newValidate.required = validators.required; //react-hook-form props
      }
      // Parse props for component
      // check and hook options for 'radio', 'checkbox', 'selectbox', 'data_source', 'lookup'
      let fieldOptions = _hookPagelayoutFieldOption(data, {});
      let props = {
        ...fieldOptions
        //...(getProps?.({ ...data, attributes: attrs }) ?? {}),
        //...componentProps,
      };
      // get props for field
      if (permissionType === 'custom') {
        props = {
          ...props,
          ...(BasicConfig?.[keyName]?.getProps?.(data, attrs) ?? {}),
          ...(BasicConfig?.[keyName]?.componentProps || {})
        };
      } else {
        props = {
          ...props,
          ...(getProps?.({ ...data, attributes: attrs }) ?? {}),
          ...componentProps
        };
      }
      // Define model for field
      const field = {
        id: data?.id,
        section: index,
        languageKey: languageKey,
        keyName: keyName,
        dataType: dataType,
        value: value,
        hideTitle,
        columns: attrs?.isFullRow?.value == 1 || showFullRow || BasicConfig?.[keyName]?.showFullRow ? 1 : 2,
        tooltipShow: attrs?.tooltipShow?.value == 1,
        tooltipText: attrs?.tooltipText?.languageKey,
        validate: newValidate,
        componentProps: props,
        Component: permissionType === 'custom' ? BasicConfig?.[keyName]?.component : component
      };
      fields.push(field);
      // Append default value of field
      defaultValues[keyName] = value;
      // Append function parse of field
      mappingParams[keyName] = permissionType === 'custom' ? BasicConfig?.[keyName]?.parseParam : parseParam;
    });
  });
  return { fields, defaultValues, mappingParams, tabs };
};

/**
 * Common function parse data api to model field
 * @param {*} data
 * @returns
 */
export const goParseFields = (sections: PageLayoutSectionField[] = [], menu: string) => {
  const { defaultValues, mappingParams, fields, tabs } = goParseData(sections, menu);

  return {
    fields,
    defaultValues,
    getParams: getParams(mappingParams),
    tabs
  };
};

// export const getLayoutByMenu = (menu: string, mode: string) => {
//   const pageLayouts = useRecoilValue(pageLayoutsAtom); //when using hook

//   let layoutData: IPageLayoutSchema = {
//     data: [],
//     schema: '',
//     keyNames: [],
//   };
//   if (mode == 'view') {
//     layoutData = pageLayouts.find((_ele: any) => _ele.menu === menu)?.data.view;
//   } else if (mode == 'write') {
//     layoutData = pageLayouts.find((_ele: any) => _ele.menu === menu)?.data.write;
//   } else if (mode == 'list') {
//     layoutData = pageLayouts.find((_ele: any) => _ele.menu === menu)?.data.list;
//   }

//   return layoutData;
// };

// const defaultValueByDataType = (dataType = 'text') => {
//   switch (dataType) {
//     case 'text':
//       return '';
//     case 'switch':
//       return false;
//     default:
//       return null;
//   }
// };

export const mergeLayoutData = (layout: PageLayoutSchema, data: any, config: any, hideFieds?: string[]) => {
  let layoutData: PageLayoutData = {
    menu: '',
    layout: {
      data: [],
      schema: '',
      keyNames: []
    },
    code: '',
    menuSourceId: '',
    menuSource: '',
    showFields: []
  };
  if (layout?.data && data) {
    let mapData: any = {};
    Object.keys(data).forEach(function (key) {
      mapData[key] = data[key];
    });
    let mergeData = layout.data.map((_section: any) => {
      let children = [];
      _section.children
        ? (children = _section.children.map((_field: any) => {
            //// console.log('field', _field);
            let tmpData = false;
            // let tmpData = defaultValueByDataType(_field?.dataType);
            let tmpConf: any | null = null;
            let aliasKey = '';
            if (config.hasOwnProperty(_field.keyName)) {
              tmpConf = config[_field.keyName];
              aliasKey = tmpConf?.alias ? tmpConf?.alias : '';
            }
            //console.log('_field >>>>>>>>', _field);
            //console.log('tmpConf >>>>>>>', config);
            // add view data for field
            // can get from recoil check useRecoilState(viewDataByMenuAtom(menuSource))
            // if (tmpConf && data) {
            //   tmpConf.viewData = data;
            // }

            // It has to check If there is a field
            if (mapData.hasOwnProperty(_field.keyName)) {
              tmpData = mapData[_field.keyName];
            } else if (aliasKey && mapData.hasOwnProperty(aliasKey)) {
              tmpData = mapData[aliasKey];
            }

            // format data using config getValue
            tmpData = tmpConf?.getValue && isFunction(tmpConf?.getValue) ? tmpConf?.getValue(data) : tmpData;

            // hook for custom field: radio, selectbox, checkbox
            if (tmpConf && isUndefined(tmpConf.componentProps)) {
              let nTemp: any = {};
              tmpConf.componentProps = nTemp;
            }
            if (tmpConf) {
              let componentProps: any = _hookPagelayoutFieldOption(_field, tmpConf?.componentProps);
              // let myTemp: any = {};
              // myTemp.componentProps = temp;
              let newConfig: any = {
                ...tmpConf,
                componentProps
              };
              tmpConf = newConfig;
            }

            let mapDataConfig: any = {};
            if (tmpConf?.mapData) {
              tmpConf?.mapData.map((_mapKey: any) => {
                if (mapData[_mapKey]) {
                  mapDataConfig[_mapKey] = {
                    data: mapData[_mapKey] || null,
                    config: config[_mapKey] || null
                  };
                }
              });
            }

            layoutData.showFields?.push(_field.keyName);

            if (hideFieds && hideFieds?.length > 0 && hideFieds?.indexOf(_field?.keyName) >= 0) {
              return false;
            }

            return {
              ..._field,
              data: tmpData,
              config: tmpConf,
              mapData: mapDataConfig
            };
          }))
        : null;

      return {
        ..._section,
        children: children
      };
    });
    layoutData.code = data.code ?? '';
    layoutData.menu = 'default';
    layout = { ...layout, data: mergeData };
    layoutData.layout = layout;
  }

  //// console.log('<<< mergeLayoutData >>>', layoutData);

  return layoutData;
};

export function isEmptyLayoutData(layoutData: PageLayoutData): boolean {
  let isEmpty = false;
  if (layoutData?.layout?.data?.length == 0) {
    isEmpty = true;
  }
  return isEmpty;
}

export function getFieldLayoutDataByKeyName(layoutData: PageLayoutData, keyName: string): any | null {
  let field = null;
  let sections = layoutData?.layout?.data?.length > 0 ? layoutData.layout.data : [];
  sections.some((section) => {
    if (section?.children) {
      let found = section.children.find((item: any) => {
        return item.keyName == keyName;
      });
      if (found) {
        field = found;
        return;
      }
    }
  });
  return field;
}

export function getFieldLayoutDataByKeyNames(layoutData: PageLayoutData, keyNames: string[]): any[] | null {
  const sections = layoutData?.layout?.data;
  if (sections?.length) {
    let fields: any[] = [];

    sections.some((section) => {
      if (section?.children) {
        let founds: any[] = section.children?.filter((item: any) => {
          return keyNames.indexOf(item.keyName) !== -1;
        });

        if (founds) {
          fields = [...fields, ...founds];
          return;
        }
      }
    });

    return fields;
  }

  return null;
}

export function parseLookupAttrToConfig(field: PageLayoutField): DataSourceProps | null {
  let attrs = field.attributes;
  let props = null;
  if (attrs && attrs.length) {
    let props: DataSourceProps = {
      // fieldValue: '',
      // fieldLabel: '',
      // fetchList: (params: any) => {
      //   return {};
      // },
    };
    attrs.forEach((attr) => {
      switch (attr.keyName) {
        case 'data_source_type':
          props.isMultiple = attr.value == 'single' ? false : true;
          break;
        case 'data_source_ui':
          props.ui = attr.value;
          break;
        case 'data_source_is_search':
          props.isSearch = attr.value == '1' ? true : false;
          break;
        case 'data_source_value':
          props.fieldValue = attr.value == 'key_name' ? 'keyName' : attr.value;
          break;
        case 'data_source_label':
          props.fieldLabel = attr.value == 'language_key' ? 'languageKey' : attr.value;
          break;
        case 'data_source_key':
          props.fetchList = (params: any) => {
            return {};
          };
          break;
        case 'data_source_selection_type':
          break;
        case 'use_default':
          props.useDefault = attr.value == '1' ? true : false;
          break;
      }
    });
    return props;
  }
  return props;
}

function _hookPagelayoutFieldOption(field: any, componentProps: any): any {
  let allowDataTypes = ['radio', 'checkbox', 'selectbox', 'data_source', 'lookup'];
  if (!componentProps) {
    componentProps = {};
  }
  let newComponentProps = componentProps;
  if (allowDataTypes.indexOf(field.dataType) == -1) {
    return newComponentProps;
  }
  let datasourceProps = parseLookupAttrToConfig(field);
  if (datasourceProps) {
    newComponentProps = {
      ...datasourceProps,
      options: field.options ? field.options : [],
      ...componentProps
    };
  }
  //// console.log('_hookPagelayoutFieldOption', newComponentProps, field.keyName);
  return newComponentProps;
}

export function getDataByKey(viewData: any, keyName: string): any {
  const children = viewData?.layout?.data[0]?.children;
  let data: any = '';
  children?.map((item: any) => {
    if (item.keyName === keyName) {
      data = item.data;
    }
  });

  return data;
}
