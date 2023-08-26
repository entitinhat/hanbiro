import { slideToMapByKey } from '@base/utils/helpers/arrayUtils';

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

  if (menuApi == 'desk') {
    fields = parseFieldsDesk(mapFields, fields);
    let tmp = { ...layoutView };
    let tmpData = [...tmp.data];
    tmpData[0] = { ...tmpData[0], children: fields };
    tmp = { ...tmp, data: tmpData };
    return tmp;
  } else {
    fields = parseFieldsDesk(mapFields, fields);
    let tmp = { ...layoutView };
    let tmpData = [...tmp.data];
    tmpData[0] = { ...tmpData[0], children: fields };
    tmp = { ...tmp, data: tmpData };
    return tmp;
  }
};

export const parseFieldsDesk = (mapFields: any, fields: any) => {
  let newFields: any[] = [];
  let field: any = {};

  field = { ...mapFields['name'] };
  field.languageKey = 'Name';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_ticket_no';
  field.keyName = 'ticketNo';
  field.dataType = 'string';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_cusomer';
  field.keyName = 'customer';
  field.dataType = 'string';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_contact';
  field.keyName = 'contact';
  field.dataType = 'string';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_status';
  field.keyName = 'status';
  field.dataType = 'string';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_category';
  field.keyName = 'category';
  field.dataType = 'string';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_assign_rep';
  field.keyName = 'assignRep';
  field.dataType = 'assignRep';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_created_on';
  field.keyName = 'createdAt';
  field.dataType = 'createdAt';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_responded_on';
  field.keyName = 'responded1st';
  field.dataType = 'responded1st';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_resolved_on';
  field.keyName = 'resolved1st';
  field.dataType = 'resolved1st';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_closed_on';
  field.keyName = 'closedOn';
  field.dataType = 'closedOn';
  field.id = field.keyName;
  newFields.push(field);

  return newFields;
};

export const parseFieldsListDesk = (layoutList: any, menuApi: string) => {
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

  if (menuApi == 'desk') {
    fields = parseFieldsDeskList(mapFields, fields);
    let tmp = { ...layoutList };

    tmp = { ...tmp, data: fields };
    return tmp;
  } else {
    fields = parseFieldsDeskList(mapFields, fields);
    let tmp = { ...layoutList };

    tmp = { ...tmp, data: fields };
    return tmp;
  }
};
export const parseFieldsDeskList = (mapFields: any, fields: any) => {
  let newFields: any[] = [];
  let field: any = {};

  /*field = { ...mapFields['name'] };
  field.languageKey = 'Group';
  field.keyName = 'group';
  field.dataType = 'group';
  field.id = field.keyName;
  newFields.push(field);*/

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_name';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_description';
  field.keyName = 'description';
  field.dataType = 'description';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_created_at';
  field.keyName = 'createdAt';
  field.dataType = 'createdAt';
  field.id = field.keyName;
  newFields.push(field);

  field = { ...mapFields['name'] };
  field.languageKey = 'ncrm_generalsetting_site_field_created_by';
  field.keyName = 'createdBy';
  field.dataType = 'createdBy';
  field.id = field.keyName;
  newFields.push(field);

  return newFields;
};
