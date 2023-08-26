import {Attribute, FieldUserPermission, PageLayoutSchema, PageLayoutSectionField} from "@base/types/pagelayout";
import allColumns from "@analytic/sus-log/config/list-field";
import * as keyNames from '@analytic/sus-log/config/keyNames';

const layoutView: PageLayoutSchema = {
  data: [
    {
      dataType: "section",
      defaultViewInList: false,
      hidden: true,
      id: "",
      isDefault: false,
      keyName: "basic",
      languageKey: "analytic_report_field_basic",
      name: "basic",
      order: 0,
      orderInList: 0,
      orderInView: 0,
      orderInWrite: 0,
      showInList: false,
      showInView: true,
      showInWrite: true,
      title: "analytic_report_field_basic",
      children: [
        {
          children: [],
          dataType: 'text',
          defaultViewInList: true,
          isViewing: true,
          hidden: false,
          id: "",
          isDefault: true,
          keyName: keyNames.SUS_LOG_SURL,
          languageKey: "",
          name: "sUrl",
          order: 0,
          orderInList: 0,
          orderInView: 0,
          orderInWrite: 0,
          showInList: true,
          showInView: true,
          showInWrite: true,
          title: "test",
        },
        {
          children: [],
          dataType: 'text',
          defaultViewInList: true,
          isViewing: true,
          hidden: false,
          id: "",
          isDefault: true,
          keyName: keyNames.SUS_LOG_URL,
          languageKey: "",
          name: "Url",
          order: 0,
          orderInList: 0,
          orderInView: 0,
          orderInWrite: 0,
          showInList: true,
          showInView: true,
          showInWrite: true,
          title: "test",
        }
      ]
    }
  ],
  schema: "",
  keyNames: []
}

export default layoutView;