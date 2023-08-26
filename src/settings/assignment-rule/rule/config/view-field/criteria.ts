import { FieldConfig } from '@base/types/pagelayout';

import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import * as components from '@settings/assignment-rule/rule/config/view-field/components';
import AttributeViewField from '../../containers/ViewFields/AttributeViewField';
import CategoryViewField from '../../containers/ViewFields/CategoryViewField';
import User from '@base/containers/ViewField/User';
import AvailableViewField from '../../containers/ViewFields/AvailableViewField';
import TicketClassificationView from '@desk/ticket/containers/ViewFields/TicketClassification';
import AssignToViewField from '../../containers/ViewFields/AssignToViewField';
export const criteriaDeskFields = [
  keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER,
  keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE,
  keyNames.KEY_NAME_RULE_ENTRIES_TAG,
  keyNames.KEY_NAME_RULE_ENTRIES_CLASSIFICATION,
  keyNames.KEY_NAME_RULE_ENTRIES_CATEGORY,
  keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_TO,
  keyNames.KEY_NAME_RULE_ENTRIES_CHECK_AVAILABLE,
  keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO
];
export const criteriaOppoFields = [
  keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER,
  keyNames.KEY_NAME_RULE_ENTRIES_PRODUCT,
  keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE,
  keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_TO,
  keyNames.KEY_NAME_RULE_ENTRIES_CHECK_AVAILABLE,
  keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO
];
const criteriaFieldsConfig: FieldConfig = {
  [keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER]: {
    component: components.TagViewField,
    componentProps: { single: true, labelKey: 'name', type: 'customer' },
    viewProps: { single: true, labelKey: 'name', type: 'customer' }
  },
  [keyNames.KEY_NAME_RULE_ENTRIES_PRODUCT]: {
    component: components.ProductViewField,
    componentProps: { single: true }
  },
  [keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE]: {
    component: AttributeViewField
  },
  [keyNames.KEY_NAME_RULE_ENTRIES_TAG]: {
    component: components.TagViewField,
    componentProps: { single: false, labelKey: 'name', type: 'tag' },
    viewProps: { single: false, labelKey: 'name', type: 'tag' }
  },
  [keyNames.KEY_NAME_RULE_ENTRIES_CLASSIFICATION]: {
    component: TicketClassificationView
  },
  [keyNames.KEY_NAME_RULE_ENTRIES_CATEGORY]: {
    component: CategoryViewField
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_TO]: {
    component: AssignToViewField,
    // componentProps: { single: true },
    getValue: (value: any) => {
      const assigns = value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_TO]?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGNS_TO];
      const mode = value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_TO]?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_MODE];
      return { assignsTo: assigns, mode: mode };
    }
  },
  [keyNames.KEY_NAME_RULE_ENTRIES_CHECK_AVAILABLE]: {
    component: AvailableViewField,
    getValue: (value: any) => {
      return value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_TO]?.[keyNames.KEY_NAME_RULE_ENTRIES_CHECK_AVAILABLE];
    }
  },
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO]: {
    component: AssignToViewField,
    componentProps: { single: true },
    getValue: (value: any) => {
      const assigns = value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO]?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGNS_TO];
      const mode = value?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_UNASSIGN_TO]?.[keyNames.KEY_NAME_ASSIGNMENT_RULE_ASSIGN_MODE];
      return { assignsTo: assigns, mode: mode };
    }
  }
};
export default criteriaFieldsConfig;
