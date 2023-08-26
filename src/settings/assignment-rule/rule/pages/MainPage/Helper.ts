import { slideToMapByKey } from '@base/utils/helpers/arrayUtils';
import { SelectBoxCustom, LookupCustom } from '@activity/config/write-field/components';
import Switch from '@base/containers/ViewField/Switch/Edit';
import TextArea from '@base/containers/ViewField/TextArea/Edit';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
import { CheckAvailableOptions, AssignmentTypeOptions, CheckAssignOptions } from '@settings/assignment-rule/rule/config/constants';
import RuleCriteria from '@settings/assignment-rule/rule/containers/RuleCriteriaSelect';
import { useSelectionFields } from '@base/services/graphql/format-service';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import Classification from '@desk/ticket/containers/Classification';
import AssignGroupAutoComplete from '@settings/preferences/containers/AssignGroupAutocomplete';

export const parseFields = (layoutView: any, menuApi: string) => {
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

  if (menuApi == 'rule') {
    fields = parseFieldsAR(mapFields, fields);
    let tmp = { ...layoutView };
    let tmpData = [...tmp.data];
    tmpData[0] = { ...tmpData[0], children: fields };
    tmp = { ...tmp, data: tmpData };
    return tmp;
  }
};

export const parseFieldsAR = (mapFields: any, fields: any) => {
  let newFields: any[] = [];

  let field = { ...mapFields['name'] };
  field.keyName = 'name';
  field.dataType = 'name';
  field.id = field.keyName;
  newFields.push(field);

  // field = { ...mapFields['name'] };
  // field.id = field.keyName;
  // newFields.push(field);

  field = { ...mapFields['type'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_module';
  field.keyName = 'module';
  field.dataType = 'module';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_active';
  field.keyName = 'active';
  field.dataType = 'active';
  field.id = field.keyName;
  newFields.push(field);

  /*field = { ...mapFields['type'] };
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['language'] };
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_new_menu_product_product';
  field.keyName = 'products';
  field.dataType = 'products';
  field.id = field.keyName;
  newFields.push(field);*/

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_description';
  field.keyName = 'description';
  field.dataType = 'description';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_owner';
  field.keyName = 'createdBy';
  field.dataType = 'createdBy';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['html'] };
  field.keyName = 'criteria';
  field.dataType = 'criteria';
  newFields.push(field);

  field = { ...mapFields['type'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_rule_entries';
  field.keyName = 'rulesEntry';
  field.dataType = 'rulesEntry';
  field.id = field.keyName;
  newFields.push(field);

  return newFields;
};

export const parseFieldsList = (layoutList: any) => {
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

  fields = parseFieldsRuleList(mapFields, fields);
  let tmp = { ...layoutList };

  tmp = { ...tmp, data: fields };
  return tmp;
};

export const parseFieldsRuleList = (mapFields: any, fields: any) => {
  let newFields: any[] = [];
  let field: any = {};

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_name';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_module';
  field.keyName = 'module';
  field.dataType = 'module';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_description';
  field.keyName = 'description';
  field.dataType = 'description';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_owner';
  field.keyName = 'createdBy';
  field.dataType = 'createdBy';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_createddate';
  field.keyName = 'createdAt';
  field.dataType = 'createdAt';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_updateddate';
  field.keyName = 'updatedAt';
  field.dataType = 'updatedAt';
  field.id = field.keyName;
  newFields.push(field);

  // field = { ...mapFields['name'] };
  // field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_active';
  // field.keyName = 'active';
  // field.dataType = 'active';
  // field.id = field.keyName;
  // newFields.push(field);

  return newFields;
};

export const parseFieldsWrite = (fields: any[], menuApi: string) => {
  if (fields.length == 0) {
    return fields;
  }
  const mapFields = slideToMapByKey(fields, 'keyName');
  if (!mapFields) {
    return fields;
  }
  if (menuApi == 'assignment_rule_entry') {
    fields = fieldsWriteRuleEntry(mapFields);
  } else {
    fields = fieldsWriteRule(mapFields, fields);
  }

  return fields;
};

const fieldCriteria = (cpField: any) => {
  let field: any = {};
  let criteriaSub: any = [];

  field = { ...cpField };
  field.languageKey = 'Channel';
  field.keyName = 'channel';
  field.dataType = 'channel';
  field.id = field.keyName;
  field.section = 2;
  field.hideTitle = true;
  field.Component = LookupCustom;
  field.componentProps = {
    label: 'ncrm_generalsetting_assignment_rule_cell_channel',
    fetchList: useSelectionFields,
    fieldLabel: 'languageKey',
    fieldValue: 'id',
    extraParams: { filter: { query: 'keyRoot=activity_purpose' } },
    isMultiple: false,
    useDefault: false
  };
  // field.validate = {
  //   required: false
  // };
  criteriaSub.push(field);

  field = { ...cpField };
  field.languageKey = 'Tags';
  field.keyName = 'tag';
  field.dataType = 'tag';
  field.id = field.keyName;
  field.section = 2;
  field.hideTitle = true;
  field.Component = LookupCustom;
  field.componentProps = {
    label: 'ncrm_generalsetting_assignment_rule_cell_tags',
    fetchList: useSelectionFields,
    fieldLabel: 'languageKey',
    fieldValue: 'id',
    extraParams: { filter: { query: 'keyRoot=activity_purpose' } },
    isMultiple: true,
    useDefault: false
  };

  criteriaSub.push(field);
  //newFields.push(field);

  field = { ...cpField };
  field.languageKey = 'Ticket Classification';
  field.keyName = 'ticket_classification';
  field.dataType = 'ticket_classification';
  field.id = field.keyName;
  field.section = 2;
  field.hideTitle = true;
  field.Component = Classification;
  field.componentProps = {
    label: 'Ticket Classification',
    fetchList: useSelectionFields,
    fieldLabel: 'languageKey',
    fieldValue: 'id',
    extraParams: { filter: { query: 'keyRoot=activity_purpose' } },
    isMultiple: false,
    useDefault: false
  };

  criteriaSub.push(field);

  field = { ...cpField };
  field.languageKey = 'Product';
  field.keyName = 'product';
  field.dataType = 'product';
  field.id = field.keyName;
  field.section = 2;
  field.hideTitle = true;
  field.Component = ProductAutoComplete;
  field.getValue = (value: any) => {
    return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
  };
  field.setValue = (value: string) => {
    return value ? value.split(',') : [];
  };
  field.componentProps = {
    label: 'ncrm_generalsetting_assignment_rule_field_basic_product',
    isMultiple: false
  };
  criteriaSub.push(field);

  field = { ...cpField };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_criteria';
  field.keyName = 'criteria';
  field.dataType = 'criteria';
  field.id = field.keyName;
  field.section = 2;
  field.Component = RuleCriteria;
  field.componentProps = {
    fields: criteriaSub
  };
  return field;
};
export const fieldsWriteRuleEntry = (mapFields: any) => {
  let newFields: any[] = [];
  let field: any = {};

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_sort_order';
  field.keyName = 'order';
  field.dataType = 'order';
  field.id = field.keyName;
  field.componentProps = {
    type: 'number'
  };
  field.value = 1;
  field.section = 2;
  newFields.push(field);

  //B Criteria
  field = fieldCriteria(mapFields['content']);
  newFields.push(field);
  //E Criteria

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_group';
  field.keyName = 'assignMode';
  field.dataType = 'assignMode';
  field.id = field.keyName;
  field.section = 2;
  field.Component = MuiRadioGroup;
  field.componentProps = {
    size: 'md',
    options: CheckAssignOptions
  };
  field.value = CheckAssignOptions[0];
  newFields.push(field);

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_user';
  field.hideTitle = true;
  field.keyName = 'assignUser';
  field.dataType = 'assignUser';
  field.id = field.keyName;
  field.section = 2;
  field.Component = UserAutoComplete;
  field.componentProps = {
    placeholder: 'ncrm_generalsetting_assignment_rule_placeholder_user',
    single: true
  };
  newFields.push(field);

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_group';
  field.hideTitle = true;
  field.keyName = 'assignGroup';
  field.dataType = 'assignGroup';
  field.id = field.keyName;
  field.section = 2;
  field.Component = AssignGroupAutoComplete;
  field.componentProps = {
    placeholder: 'ncrm_generalsetting_assignment_rule_placeholder_group'
  };
  field.parseParam = (value: any) => (value ? { id: value.id, name: value.name } : null);
  newFields.push(field);

  /*field = { ...mapFields['subject'] };
  field.languageKey = 'Check Available';
  field.keyName = 'check_available';
  field.dataType = 'check_available';
  field.id = field.keyName;
  field.section = 2;
  field.Component = MuiCheckbox;
  field.value = true;
  newFields.push(field);*/

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_check_available';
  field.keyName = 'check_available';
  field.dataType = 'check_available';
  field.id = field.keyName;
  field.Component = Switch;
  field.section = 2;
  field.value = true;
  newFields.push(field);

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_available_based_on';
  field.keyName = 'available_based_on';
  field.dataType = 'available_based_on';
  field.hideTitle = true;
  field.id = field.keyName;
  field.section = 2;
  field.Component = MuiRadioGroup;
  field.componentProps = {
    size: 'md',
    options: CheckAvailableOptions
  };
  field.value = CheckAvailableOptions[0];
  field.defaultValue = CheckAvailableOptions[0];
  newFields.push(field);

  return newFields;
};
export const fieldsWriteRule = (mapFields: any, fields: any) => {
  let newFields: any[] = [];
  let field: any = {};

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_name';
  field.keyName = 'name';
  field.dataType = 'name';
  field.id = field.keyName;
  field.section = 1;
  newFields.push(field);

  field = { ...mapFields['status'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_module';
  field.keyName = 'module';
  field.dataType = 'module';
  field.id = field.keyName;
  field.Component = SelectBoxCustom;
  field.componentProps = {
    options: AssignmentTypeOptions,
    fieldValue: 'value',
    fieldLabel: 'label'
  };
  field.defaultValue = AssignmentTypeOptions[0];
  field.value = AssignmentTypeOptions[0];
  field.section = 1;
  newFields.push(field);

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_active';
  field.keyName = 'active';
  field.dataType = 'active';
  field.id = field.keyName;
  field.validate = {
    required: false
  };
  field.Component = Switch;
  field.section = 1;
  field.value = true;
  newFields.push(field);

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_description';
  field.keyName = 'description';
  field.dataType = 'description';
  field.id = field.keyName;
  field.validate = {
    required: false
  };
  field.Component = TextArea;
  field.section = 1;
  newFields.push(field);

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_sort_order';
  field.keyName = 'order';
  field.dataType = 'order';
  field.id = field.keyName;
  field.componentProps = {
    type: 'number'
  };
  field.value = 1;
  field.section = 2;
  newFields.push(field);

  //B Criteria
  field = fieldCriteria(mapFields['content']);
  newFields.push(field);
  //E Criteria

  field = { ...mapFields['subject'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_assignment_group';
  field.keyName = 'assignMode';
  field.dataType = 'assignMode';
  field.id = field.keyName;
  field.section = 2;
  field.Component = MuiRadioGroup;
  field.componentProps = {
    size: 'md',
    options: CheckAssignOptions
  };
  field.value = CheckAssignOptions[0];
  newFields.push(field);

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_user';
  field.hideTitle = true;
  field.keyName = 'assignUser';
  field.dataType = 'assignUser';
  field.id = field.keyName;
  field.section = 2;
  field.Component = UserAutoComplete;
  field.componentProps = {
    placeholder: 'ncrm_generalsetting_assignment_rule_placeholder_user',
    single: true
  };
  newFields.push(field);

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_group';
  field.hideTitle = true;
  field.keyName = 'assignGroup';
  field.dataType = 'assignGroup';
  field.id = field.keyName;
  field.section = 2;
  field.Component = AssignGroupAutoComplete;
  field.componentProps = {
    placeholder: 'ncrm_generalsetting_assignment_rule_placeholder_group'
  };
  field.parseParam = (value: any) => (value ? { id: value.id, name: value.name } : null);
  newFields.push(field);

  /*field = { ...mapFields['subject'] };
  field.languageKey = 'Check Available';
  field.keyName = 'check_available';
  field.dataType = 'check_available';
  field.id = field.keyName;
  field.section = 2;
  field.Component = MuiCheckbox;
  field.value = true;
  newFields.push(field);*/

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_check_available';
  field.keyName = 'check_available';
  field.dataType = 'check_available';
  field.id = field.keyName;
  field.Component = Switch;
  field.section = 2;
  field.value = true;
  newFields.push(field);

  field = { ...mapFields['content'] };
  field.languageKey = 'ncrm_generalsetting_assignment_rule_field_basic_available_based_on';
  field.keyName = 'available_based_on';
  field.dataType = 'available_based_on';
  field.hideTitle = true;
  field.id = field.keyName;
  field.section = 2;
  field.Component = MuiRadioGroup;
  field.componentProps = {
    size: 'md',
    options: CheckAvailableOptions
  };
  field.value = CheckAvailableOptions[0];
  field.defaultValue = CheckAvailableOptions[0];
  newFields.push(field);

  return newFields;
};
