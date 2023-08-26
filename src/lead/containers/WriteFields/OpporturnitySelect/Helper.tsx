import _ from 'lodash';
import * as keyNames from '@opportunity/config/keyNames'

export const columnRenderRemap = () => ({
    topic(col: string, data: any) {
      return data?.[col] ?? '';
    },
    customer(col: string, data: any) {
      return data?.[col]?.name ?? '';
    },
    stage(col: string, data: any) {
      return data?.[col] ?? '';
    },
    salesRep(col: string, data: any) {
      return data?.[col]?.name ?? '';
    },
    salesTeam(col: string, data: any) {
      return data?.[col]?.name ?? '';
    },
    // createdAt(col: string, data: any) {
    //     return data?.[col] ?? '';
    // },
  });

  export const opportunityField : any = [
    {
      keyName: keyNames.KEY_NAME_OPPORTUNITY_TITLE,
      name: keyNames.KEY_NAME_OPPORTUNITY_TITLE,
      title: 'opportunity_opportunity_field_basic_title',
      languageKey: 'opportunity_opportunity_field_basic_title',
      defaultViewInList: true,
      sortable: true,
    },
    {
      keyName: keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER,
      name: keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER,
      title: 'opportunity_opportunity_field_basic_customer',
      languageKey: 'opportunity_opportunity_field_basic_customer',
      defaultViewInList: true,
      sortable: true,
    },
    {
      keyName: keyNames.KEY_NAME_OPPORTUNITY_STAGE,
      name: keyNames.KEY_NAME_OPPORTUNITY_STAGE,
      title: 'opportunity_opportunity_field_basic_stage',
      languageKey: 'opportunity_opportunity_field_basic_stage',
      defaultViewInList: true,
      sortable: true
    },
    // {
    //   keyName: keyNames.KEY_NAME_OPPORTUNITY_SALES_REP,
    //   name: keyNames.KEY_NAME_OPPORTUNITY_SALES_REP,
    //   title: 'opportunity_opportunity_field_basic_salesreps',
    //   languageKey: 'opportunity_opportunity_field_basic_salesreps',
    //   defaultViewInList: true,
    //   sortable: true
    // },
    // {
    //   keyName: keyNames.KEY_NAME_OPPORTUNITY_SALES_TEAM,
    //   name: keyNames.KEY_NAME_OPPORTUNITY_SALES_TEAM,
    //   title: 'opportunity_opportunity_field_basic_salesteam',
    //   languageKey: 'opportunity_opportunity_field_basic_salesteam',
    //   defaultViewInList: true,
    //   sortable: true
    // },
    {
      keyName: keyNames.KEY_NAME_OPPORTUNITY_CREATED_AT,
      name: keyNames.KEY_NAME_OPPORTUNITY_CREATED_AT,
      title: 'opportunity_opportunity_field_basic_createdat',
      languageKey: 'opportunity_opportunity_field_basic_createdat',
      defaultViewInList: true,
      sortable: true
    },
  ]