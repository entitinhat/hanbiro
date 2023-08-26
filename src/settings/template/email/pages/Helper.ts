import { slideToMapByKey } from '@base/utils/helpers/arrayUtils';

export const parseFieldsEmailView = (layoutView: any, menuApi: string) => {
  let fields: any[] = [];
  if (layoutView?.data && layoutView?.data[0] && layoutView?.data[0]?.children) {
    if (menuApi == 'na') {
      fields = [...layoutView?.data[0]?.children, ...layoutView?.data[1]?.children];
    } else {
      fields = [...layoutView?.data[0]?.children];
    }
  }
  if (fields.length == 0) {
    return layoutView;
  }
  const mapFields = slideToMapByKey(fields, 'keyName');
  if (!mapFields) {
    return layoutView;
  }
  fields = parseFieldsEmail(mapFields, fields);
  let tmp = { ...layoutView };
  let tmpData = [...tmp.data];
  tmpData[0] = { ...tmpData[0], children: fields };
  tmp = { ...tmp, data: tmpData };
  return tmp;
};

export const parseFieldsEmail = (mapFields: any, fields: any) => {
  let newFields: any[] = [];

  let field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_template_subject'; //Template Subject
  field.keyName = 'title';
  field.dataType = 'title';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_template_name'; //Template Name
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['type'] };
  field.languageKey = 'ncrm_setting_template_templates_type'; //Templates Type
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['language'] };
  field.languageKey = 'ncrm_setting_template_language'; //Language
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_product'; //Product
  field.keyName = 'products';
  field.dataType = 'products';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_description'; //Description
  field.keyName = 'description';
  field.dataType = 'description';
  field.id = field.keyName;
  newFields.push(field);

  /*field = { ...mapFields['name'] };
  field.languageKey = 'setting_cta_field_basic_createdby';
  field.keyName = 'assignTo';
  field.dataType = 'assignTo';
  field.id = field.keyName;
  newFields.push(field);*/

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_owner'; //Ownner
  field.keyName = 'createdBy';
  field.dataType = 'createdBy';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_stage'; //Stage
  field.keyName = 'stage';
  field.dataType = 'stage';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['html'] };
  field.keyName = 'html';
  field.dataType = 'html';
  newFields.push(field);

  return newFields;
};

export const parseFieldsListEmail = (layoutList: any, menuApi: string) => {
  let fields: any[] = [];
  if (layoutList?.data && layoutList?.data[0]) {
    fields = [...layoutList?.data];
  }
  if (fields.length == 0) {
    return layoutList;
  }
  const mapFields = slideToMapByKey(fields, 'keyName');
  if (!mapFields) {
    return layoutList;
  }

  fields = parseFieldsEmailList(mapFields, fields);
  let tmp = { ...layoutList };

  tmp = { ...tmp, data: fields };
  return tmp;
};
export const parseFieldsEmailList = (mapFields: any, fields: any) => {
  let newFields: any[] = [];
  let field: any = {};

  /*field = { ...mapFields['name'] };
  field.languageKey = 'Group';
  field.keyName = 'group';
  field.dataType = 'group';
  field.id = field.keyName;
  newFields.push(field);*/

  field = { ...mapFields['name'] };
  field.languageKey ='ncrm_setting_template_template_name'; //Template Name
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_template_type';//Template Type
  field.keyName = 'type';
  field.dataType = 'type';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_subject';//subject
  field.keyName = 'title';
  field.dataType = 'title';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_language';//Language
  field.keyName = 'language';
  field.dataType = 'language';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_active';//Active
  field.keyName = 'stage';
  field.dataType = 'stage';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_setting_template_created_on';//Created Date
  field.keyName = 'createdAt';
  field.dataType = 'createdAt';
  field.id = field.keyName;
  newFields.push(field);

  /*field = { ...mapFields['name'] };
  field.languageKey = 'Created By';
  field.keyName = 'createdBy';
  field.dataType = 'createdBy';
  field.id = field.keyName;
  newFields.push(field);*/

  return newFields;
};
