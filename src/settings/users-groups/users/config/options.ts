import * as keyNames from '@settings/users-groups/users/config/keyNames';

export const filterByOptions = [
  {
    label: 'Name', //Customer
    value: keyNames.KEY_USER_DISPLAY_NAME,
    componentProps: {
      showAvatar: true,
      addLabel: 'ncrm_desk_ticket_filter_add_new_customer' //Add new customer
    },
    getValue: (value: any) => {
      //return param for query
      return value.length > 0 ? value.map((v: any) => v.id).join(',') : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    label: 'Url Name', // Priority
    value: keyNames.KEY_USER_URL_NAME,
    getValue: (value: any) => {
      //return param for query
      return value?.priority || '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    // label: 'ncrm_desk_ticket_filter_product_category', //Product / Category
    label: 'Email', // Category
    value: keyNames.KEY_USER_EMAIL,
    // component: components.CategorySelect,
    componentProps: {},
    getValue: (value: any) => {
      //return param for query
      return value?.category ? value.category.id : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    label: 'Phone', //Process
    value: keyNames.KEY_USER_PHONE,
    getValue: (value: any) => {
      //return param for query
      return value?.id || '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    label: 'Updated On', // Classification
    value: keyNames.KEY_USER_UPDATEDAT,
    componentProps: {
      column: 1
    },
    getValue: (value: any) => {
      //return param for query
      let newParam: string = '';
      if (value?.region) {
        newParam += value.region.id + '|' + value.region.value;
      }
      if (value?.language) {
        newParam += '|__|' + value.language.id + '|' + value.language.value;
      }
      return newParam;
    },
    setValue: (value: any) => {
      //initial value for component
    }
  }
];
