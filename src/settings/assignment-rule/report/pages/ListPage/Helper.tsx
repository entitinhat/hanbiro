import { useMemo } from 'react';
import { dateByOptions, groupByOptions, searchFields } from '@activity/config/list-field/options';
import { LabelValue, SearchFilter } from '@base/types/app';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import { AssignmentTypeOptions } from '@settings/assignment-rule/rule/config/constants';
import _ from 'lodash';
import { AssignReport } from '../../types/report';
import { Chip } from '@mui/material';

export const columnRenderRemap = (menu: string) => ({
  [keyNames.KEY_NAME_ASSIGNMENT_RULE_MODULE](col: string, data: any) {
    let tmpData = AssignmentTypeOptions.find((item) => item.value === data?.[col].value) ?? data?.[col].value;
    return tmpData.label;
  },
  assignedOn(col: string, data: any) {
    const newDate = new Date(data[col].value).toLocaleDateString('en-US');
    return newDate;
  },
  userGroup(col: string, data: any) {
    if (Array.isArray(data[col].user)) {
      return data[col].user.map((user: any) => {
        return <Chip label={user.name} id={user.id} />;
      });
    }
    return data[col].user.name;
  }
});

export const getQuery = (filter: SearchFilter | undefined) => {
  // filters query
  const groupBy = filter?.headerFilters?.groupBy;
  const groupByValue = useMemo(() => groupByOptions?.find((v: LabelValue) => v.value === groupBy), [groupBy]);

  const query = useMemo(() => {
    let queries: string[] = [];
    Object.keys(filter?.headerFilters).forEach((key) => {
      const value = filter?.headerFilters[key];
      const isDateTime = dateByOptions?.findIndex((v: LabelValue) => v.value === key) > -1;
    });

    // search query
    if (filter?.keyword != '') {
      if (searchFields?.length > 0) {
        const orQueries = searchFields?.map((field: LabelValue) => {
          return [field?.value, ':', '"' + filter?.keyword + '"'].join('');
        });
        queries.push('{' + orQueries.join(' ') + '}');
      }
    }

    if (queries?.length) {
      return '(' + queries.join(' ') + ')';
    }
    return '';
  }, [filter]);

  return query;
};

// -----------------------------------------FAKE-DATA-----------------------------------------------
const fields = [
  //-----------------------------------------------------Module Column-----------------------------------
  {
    name: 'name',
    isDefault: true,
    dataType: 'module',
    order: 11,
    title: 'setting_cta_field_basic_name',
    hidden: false,
    id: 'module',
    keyName: 'module', //Table get keyName to map data
    languageKey: 'Module',
    showInList: true,
    showInView: true,
    showInWrite: true,
    orderInList: 11,
    orderInView: 11,
    orderInWrite: 11,
    defaultViewInList: true,
    permissionType: '',
    attributes: [
      {
        keyName: 'required',
        languageKey: 'crm_new_layout_attribute_required',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'maxlength',
        languageKey: 'crm_new_layout_attribute_maxlength',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'allow_duplicate',
        languageKey: 'crm_new_layout_attribute_allow_duplicate',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'allow_number_character',
        languageKey: 'crm_new_layout_attribute_allow_number_character',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_show',
        languageKey: 'crm_new_layout_attribute_tooltip_show',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_text',
        languageKey: 'crm_new_layout_attribute_tooltip_text',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_type',
        languageKey: 'crm_new_layout_attribute_tooltip_type',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'can_mark_required',
        languageKey: '',
        value: '0',
        defaultValue: ''
      },
      {
        keyName: 'can_move_unused',
        languageKey: '',
        value: '0',
        defaultValue: ''
      }
    ],
    children: null,
    isViewing: true,
    disableSortBy: true
  },
  //----------------------------------------------Assigned On Column--------------------------------------
  {
    name: 'name',
    isDefault: true,
    dataType: 'text',
    order: 11,
    title: 'setting_cta_field_basic_name',
    hidden: false,
    id: 'name',
    keyName: 'assignedOn',
    languageKey: 'Assigned On',
    showInList: true,
    showInView: true,
    showInWrite: true,
    orderInList: 11,
    orderInView: 11,
    orderInWrite: 11,
    defaultViewInList: true,
    permissionType: '',
    attributes: [
      {
        keyName: 'required',
        languageKey: 'crm_new_layout_attribute_required',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'maxlength',
        languageKey: 'crm_new_layout_attribute_maxlength',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'allow_duplicate',
        languageKey: 'crm_new_layout_attribute_allow_duplicate',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'allow_number_character',
        languageKey: 'crm_new_layout_attribute_allow_number_character',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_show',
        languageKey: 'crm_new_layout_attribute_tooltip_show',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_text',
        languageKey: 'crm_new_layout_attribute_tooltip_text',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_type',
        languageKey: 'crm_new_layout_attribute_tooltip_type',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'can_mark_required',
        languageKey: '',
        value: '0',
        defaultValue: ''
      },
      {
        keyName: 'can_move_unused',
        languageKey: '',
        value: '0',
        defaultValue: ''
      }
    ],
    children: null,
    isViewing: true,
    disableSortBy: true
  },
  //-------------------------------------------------Assigned User Group- Column-------------------------
  {
    name: 'name',
    isDefault: true,
    dataType: 'description',
    order: 11,
    title: 'setting_cta_field_basic_name',
    hidden: false,
    id: 'description',
    keyName: 'userGroup',
    languageKey: 'Assign User/Group',
    showInList: true,
    showInView: true,
    showInWrite: true,
    orderInList: 11,
    orderInView: 11,
    orderInWrite: 11,
    defaultViewInList: true,
    permissionType: '',
    attributes: [
      {
        keyName: 'required',
        languageKey: 'crm_new_layout_attribute_required',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'maxlength',
        languageKey: 'crm_new_layout_attribute_maxlength',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'allow_duplicate',
        languageKey: 'crm_new_layout_attribute_allow_duplicate',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'allow_number_character',
        languageKey: 'crm_new_layout_attribute_allow_number_character',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_show',
        languageKey: 'crm_new_layout_attribute_tooltip_show',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_text',
        languageKey: 'crm_new_layout_attribute_tooltip_text',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_type',
        languageKey: 'crm_new_layout_attribute_tooltip_type',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'can_mark_required',
        languageKey: '',
        value: '0',
        defaultValue: ''
      },
      {
        keyName: 'can_move_unused',
        languageKey: '',
        value: '0',
        defaultValue: ''
      }
    ],
    children: null,
    isViewing: true,
    disableSortBy: true
  },
  //--------------------------------------------------No.Assigned - Column ------------------------------
  {
    name: 'name',
    isDefault: true,
    dataType: 'createdBy',
    order: 11,
    title: 'setting_cta_field_basic_name',
    hidden: false,
    id: 'createdBy',
    keyName: 'assignedNumber',
    languageKey: 'No.Assigned',
    showInList: true,
    showInView: true,
    showInWrite: true,
    orderInList: 11,
    orderInView: 11,
    orderInWrite: 11,
    defaultViewInList: true,
    permissionType: '',
    attributes: [
      {
        keyName: 'required',
        languageKey: 'crm_new_layout_attribute_required',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'maxlength',
        languageKey: 'crm_new_layout_attribute_maxlength',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'allow_duplicate',
        languageKey: 'crm_new_layout_attribute_allow_duplicate',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'allow_number_character',
        languageKey: 'crm_new_layout_attribute_allow_number_character',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_show',
        languageKey: 'crm_new_layout_attribute_tooltip_show',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_text',
        languageKey: 'crm_new_layout_attribute_tooltip_text',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_type',
        languageKey: 'crm_new_layout_attribute_tooltip_type',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'can_mark_required',
        languageKey: '',
        value: '0',
        defaultValue: ''
      },
      {
        keyName: 'can_move_unused',
        languageKey: '',
        value: '0',
        defaultValue: ''
      }
    ],
    children: null,
    isViewing: true,
    disableSortBy: true
  },
  //-----------------------------------------------------% Assigned - Column------------------------------
  {
    name: 'name',
    isDefault: true,
    dataType: 'createdAt',
    order: 11,
    title: 'setting_cta_field_basic_name',
    hidden: false,
    id: 'createdAt',
    keyName: 'assignedPercent',
    languageKey: '%Assigned',
    showInList: true,
    showInView: true,
    showInWrite: true,
    orderInList: 11,
    orderInView: 11,
    orderInWrite: 11,
    defaultViewInList: true,
    permissionType: '',
    attributes: [
      {
        keyName: 'required',
        languageKey: 'crm_new_layout_attribute_required',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'maxlength',
        languageKey: 'crm_new_layout_attribute_maxlength',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'allow_duplicate',
        languageKey: 'crm_new_layout_attribute_allow_duplicate',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'allow_number_character',
        languageKey: 'crm_new_layout_attribute_allow_number_character',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_show',
        languageKey: 'crm_new_layout_attribute_tooltip_show',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_text',
        languageKey: 'crm_new_layout_attribute_tooltip_text',
        value: '',
        defaultValue: ''
      },
      {
        keyName: 'tooltip_type',
        languageKey: 'crm_new_layout_attribute_tooltip_type',
        value: '1',
        defaultValue: ''
      },
      {
        keyName: 'can_mark_required',
        languageKey: '',
        value: '0',
        defaultValue: ''
      },
      {
        keyName: 'can_move_unused',
        languageKey: '',
        value: '0',
        defaultValue: ''
      }
    ],
    children: null,
    isViewing: true,
    disableSortBy: true
  }
];
const data = [
  {
    id: '2527fe96-7f56-4c75-8b2a-d4087a7e918c',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-01',
    userGroup: 'User 1',
    assignedNumber: '29',
    assignedPercent: '27.9%'
  },
  {
    id: '2521968b-02d4-41fe-a110-881354638288',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-01',
    userGroup: 'User 2',
    assignedNumber: '24',
    assignedPercent: '30%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  },
  {
    id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
    module: 'AR_MODULE_DESK',
    assignedOn: '2022-09-02',
    userGroup: 'User 3',
    assignedNumber: '30',
    assignedPercent: '31%'
  }
];

const randomData = (limit: number) => {
  const data: AssignReport[] = [];
  for (let i = 0; i < limit; i++) {
    data.push({
      id: '251d5d19-2348-4909-bad5-0d62d61b87ae',
      module: {
        value: AssignmentTypeOptions[_.random(0, 2)].value,
        isRowSpanned: false,
        rowSpan: 1
      },
      assignedOn: {
        value: `2022-09-${_.random(23, 30)}`,
        isRowSpanned: false,
        rowSpan: 1
      },
      userGroup: {
        user: { id: `${_.random(0, 100)}`, name: `User ${_.random(1, 100)} ` },
        group: { id: `${_.random(0, 100)}`, name: `Group ${_.random(1, 100)} ` }
      },
      assignedNumber: `${_.random(0, 1000)}`,
      assignedPercent: `${_.random(0, 100)}%`
    });
    // }
  }
  return data;
};
const getConfigRowSpanned = (data: any) => {
  let colEnable = ['module', 'assignedOn'];
  let rows = [...data];
  let topCellIndex = 0;
  colEnable.forEach((item: string, index: number, arr: string[]) => {
    for (let i = 1; i < rows.length; i++) {
      if (index == 0) {
        if (rows[topCellIndex][item].value == rows[i][item].value) {
          rows[i][item].isRowSpanned = true;
          rows[topCellIndex][item].rowSpan++;
        } else {
          topCellIndex = i;
        }
      } else {
        const preIndex = index - 1;
        if (
          rows[topCellIndex][item].value == rows[i][item].value &&
          rows[topCellIndex][colEnable[preIndex]].value == rows[i][colEnable[preIndex]].value
        ) {
          rows[i][item].isRowSpanned = true;
          rows[topCellIndex][item].rowSpan++;
        } else {
          topCellIndex = i;
        }
      }
    }
    topCellIndex = 0;
  });
  return rows;
};
export const FakeData = () => {
  return {
    fields: fields,
    fakeData: {
      data: getConfigRowSpanned(randomData(10)),
      paging: {
        totalPage: 1,
        totalItems: randomData(10).length,
        currentPage: 1,
        itemPerPage: 10,
        nextPage: null,
        previousPage: 0
      }
    }
  };
};
