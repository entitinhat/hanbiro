import { FieldConfig } from '@base/types/pagelayout';
import * as keyNames from '@desk/ticket/config/keyNames';
import * as commonConfig from '@base/config/view-field';
import * as commonComponents from '@base/config/view-field/components';
import * as components from './components';
import { t } from 'i18next';
import { useTicketTags } from '@desk/ticket/hooks/useTicketTags';
import { useGetModuleProcesses } from '@process/hooks/useModule';

const viewFieldsConfig: FieldConfig = {
  ...commonConfig?.default,
  [keyNames.KEY_TICKET_CODE]: {
    component: commonComponents.TextView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: 'code'
  },
  [keyNames.KEY_TICKET_PRIORITY]: {
    component: commonComponents.PriorityView,
    componentProps: {
      userPermission: {
        isEdit: false,
        isShow: true
      }
    },
    schema: `priority {
      keyName
      languageKey
    }`
  },
  [keyNames.KEY_TICKET_STATUS]: {
    component: commonComponents.DataSourceView,
    componentProps: {
      single: true,
      sourceKey: 'ticket_status',
      sourceType: 'field',
      keyOptionValue: 'languageKey'
    },
    schema: `status {
      keyName
      languageKey
    }`,
    getValueEdit: (value: any) => {
      return { ...value, value: value?.keyName, label: t(value?.languageKey ?? '') };
    },
    getMutationValue: (value: any) => {
      //basic api params
      return value?.keyName || 'STATUS_NONE';
    }
  },
  [keyNames.KEY_TICKET_PRODUCT]: {
    schema: `product {
      id
      name
    }`
  },
  [keyNames.KEY_TICKET_STAGE]: {
    schema: `
    
    `
  },
  [keyNames.KEY_TICKET_PROCESS]: {
    //component: components.CustomerContactView,
    //component: components.ProcessView,
    component: commonComponents.LookUpView,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' },
      isSearch: true,
      userPermission: {
        isEdit: false
      }
    },
    // component: commonComponents.TextView,
    // componentProps: {
    //   defaultOptions: 'abc'
    // },
    schema: `process {
      id
      name
    }`,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_TICKET_PROCESS]: value ? { id: value.id, name: value.name } : null };
    }
  },
  [keyNames.KEY_TICKET_CATEGORY]: {
    component: components.CategoryProductView,
    schema: `
      category {
        id
        name
      }
      product {
        id
        name
      }
    `,
    getValue: (viewData: any) => {
      return {
        product: viewData?.product
          ? {
              ...viewData?.product,
              value: viewData?.product.id,
              label: viewData?.product.name
            }
          : null,
        category: viewData?.category
          ? {
              ...viewData?.category,
              value: viewData?.category.id,
              label: viewData?.category.name
            }
          : null
      };
    },
    getMutationValue: (value: any) => {
      const cateRule = value?.category?.rules?.[0] || null;

      return {
        product: value?.product
          ? {
              id: value.product.id,
              name: value.product.name
            }
          : null,
        category: value?.category
          ? {
              id: value.category.id,
              name: value.category.name
            }
          : null,
        priority: cateRule ? cateRule.priority.keyName : ''
      };
    }
  },
  [keyNames.KEY_TICKET_RESPONSE_DUE]: {
    component: components.FirstRespondDueView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: 'firstRespondDue'
  },
  [keyNames.KEY_TICKET_RESOLUTION_DUE]: {
    component: components.ResolutionDueView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: 'resolutionDue'
  },
  [keyNames.KEY_TICKET_DURATION]: {
    // component: commonComponents.DurationView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: `
      duration
      durationUnit
    `
    // getValue: (viewData: any) => {
    //   // console.log('Duration getValue', viewData);
    //   return {
    //     duration: viewData?.duration,
    //     durationUnit: viewData?.durationUnit
    //   };
    // }
  },
  [keyNames.KEY_TICKET_REAL_DURATION]: {
    component: commonComponents.RealDurationView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: `
      realDuration
    `
  },

  [keyNames.KEY_TICKET_ASSIGN_GROUP]: {
    component: components.AssignGroupView,
    // component: components.AssignGroupRep,
    // component: commonComponents.TextView,
    componentProps: {
      single: true
    },
    schema: `assignedGroup {
      id
      name
      reps {
        id
        user{
          id
          name
        }
      }
    }`,
    getMutationValue: (value: any) => {
      return { [keyNames.KEY_TICKET_ASSIGN_GROUP]: value ? { id: value.id, name: value.name } : null };
    }
    // getValue: (viewData: any) => {
    //   return {
    //     //viewData[keyNames.KEY_TICKET_ASSIGN_GROUP]
    //     [keyNames.KEY_TICKET_ASSIGN_GROUP]: viewData[keyNames.KEY_TICKET_ASSIGN_GROUP] || null
    //     //  ? // [keyNames.KEY_TICKET_ASSIGN_USER]: viewData[keyNames.KEY_TICKET_ASSIGN_USER]?.user
    //     // {
    //     //...viewData[keyNames.KEY_TICKET_ASSIGN_USER]?.user
    //     // group: viewData[keyNames.KEY_TICKET_ASSIGN_USER]?.group

    //     //  }
    //     // : ''
    //   };
    // }
    //fix problem Asssigned Rep format when sendding to server
    // getMutationValue: (value: any) => {
    //   return {
    //     [keyNames.KEY_TICKET_ASSIGN_GROUP]: value[keyNames.KEY_TICKET_ASSIGN_GROUP]
    //       ? {
    //           id: value[keyNames.KEY_TICKET_ASSIGN_GROUP].id,
    //           name: value[keyNames.KEY_TICKET_ASSIGN_GROUP].name
    //         }
    //       : null,
    //     [keyNames.KEY_TICKET_ASSIGN_USER]: value[keyNames.KEY_TICKET_ASSIGN_USER]
    //       ? {
    //           user: {
    //             id: value[keyNames.KEY_TICKET_ASSIGN_USER].id,
    //             name: value[keyNames.KEY_TICKET_ASSIGN_USER].name
    //           },

    //           group: {
    //             id: value[keyNames.KEY_TICKET_ASSIGN_USER].id,
    //             name: value[keyNames.KEY_TICKET_ASSIGN_USER].name
    //           } //value[keyNames.KEY_TICKET_ASSIGN_USER]?.group || null, @TODO
    //         }
    //       : null
    //   };
    // }
  },
  [keyNames.KEY_TICKET_ASSIGN_USER]: {
    component: components.AssignRep,
    schema: `assignedUser {
      user {
          id
          name
      }
      group {
        id
        name
      }
    }`
  },
  [keyNames.KEY_TICKET_CC_USERS]: {
    component: components.CcUsersView,
    componentProps: {
      showAvatar: true
    },
    schema: `ccUsers {
      user {
        id
        name
      }
      group {
        id
        name
      }
    }`,
    // getMutationValue: (value: any) => {
    //   return { [keyNames.KEY_TICKET_CC_USERS]: value ? { user: { id: value.id, name: value.name } } : null };
    // }
    // getValueView: (value: any) => {
    //   return value?.map((v: any) => ({ id: v?.user?.id, name: v?.user?.name }));
    // }

    getMutationValue: (value: any) => {
      const nUsers =
        value?.length > 0
          ? value.map((_item: any) => {
              return {
                user: {
                  id: _item.id,
                  name: _item.name
                },
                group: {
                  id: _item.id,
                  name: _item.name
                } //TODO
              };
            })
          : [];
      return {
        [keyNames.KEY_TICKET_CC_USERS]: nUsers
      };
    },
    getValueView: (value: any) => {
      const nUsers =
        value?.length > 0
          ? value.map((_item: any) => {
              if (Object.keys(_item).includes('user')) return _item;
              return {
                user: {
                  id: _item.id,
                  name: _item.name
                },
                group: {
                  id: _item.id,
                  name: _item.name
                } //TODO
              };
            })
          : [];
      return nUsers;
    }
  },
  [keyNames.KEY_TICKET_CUSTOMER]: {
    component: components.CustomerContactView,
    // component: components.CustomerView,
    componentProps: {
      category: 'all'
    },
    schema: `customer {
      id
      name
      category
      emails{
        id
        label
        labelValue
        email
      }
      phones{
        id
        label
        labelValue
        phoneNumber
        extension

      }
    }`,
    getValue: (viewData: any) => {
      return {
        [keyNames.KEY_TICKET_CUSTOMER]: viewData[keyNames.KEY_TICKET_CUSTOMER]
          ? {
              ...viewData[keyNames.KEY_TICKET_CUSTOMER],
              value: viewData[keyNames.KEY_TICKET_CUSTOMER].id,
              label: viewData[keyNames.KEY_TICKET_CUSTOMER].name
            }
          : null,
        [keyNames.KEY_TICKET_CONTACT]: viewData[keyNames.KEY_TICKET_CONTACT]
          ? {
              ...viewData[keyNames.KEY_TICKET_CONTACT],
              value: viewData[keyNames.KEY_TICKET_CONTACT].id,
              label: viewData[keyNames.KEY_TICKET_CONTACT].name
            }
          : null
      };
    },
    getMutationValue: (value: any) => {
      //// console.log('mutaion value', value);
      return {
        [keyNames.KEY_TICKET_CUSTOMER]: value[keyNames.KEY_TICKET_CUSTOMER]
          ? {
              id: value[keyNames.KEY_TICKET_CUSTOMER].id,
              name: value[keyNames.KEY_TICKET_CUSTOMER].name
            }
          : null,
        [keyNames.KEY_TICKET_CONTACT]: value[keyNames.KEY_TICKET_CONTACT]
          ? {
              id: value[keyNames.KEY_TICKET_CONTACT].id,
              name: value[keyNames.KEY_TICKET_CONTACT].name
            }
          : null
      };
    }
  },
  [keyNames.KEY_TICKET_CONTACT]: {
    schema: `contact {
      id
      name
      category
      emails{
        id
        label
        labelValue
        email
      }
      phones{
        id
        label
        labelValue
        phoneNumber
        extension

      }
    }`
  },
  [keyNames.KEY_TICKET_TAG]: {
    component: components.Tags,
    componentProps: {
      fetchList: useTicketTags,
      fieldValue: 'id',
      fieldLabel: 'name',
      // useDeleteTag: useDeleteTicketTag
      userPermission: {
        isEdit: false ///
      }
    },
    schema: `tags {
      id
      name
    }`
  },
  [keyNames.KEY_TICKET_CHANNEL]: {
    component: components.ChannelView,
    componentProps: {
      // fetchList: useTicketChannels,
      fieldValue: 'id',
      fieldLabel: 'name',
      userPermission: {
        isEdit: false
      }
    },
    schema: `channel {
      id
      name
    }`
  },
  [keyNames.KEY_TICKET_CONTENT]: {
    component: commonComponents.EditorView,
    schema: 'content'
  },
  [keyNames.KEY_TICKET_REPLY_MESSAGE]: {
    component: commonComponents.EditorView,
    schema: 'message'
  },
  [keyNames.KEY_TICKET_CLOSED_AT]: {
    component: components.DateTimeViewNormal,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: 'closedAt'
  },
  [keyNames.KEY_TICKET_CREATED_AT]: {
    component: components.DateTimeViewNormal,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: 'createdAt'
  },
  [keyNames.KEY_TICKET_UPDATED_AT]: {
    // component: commonComponents.DateTimeView,
    componentProps: {
      userPermission: {
        isEdit: false
      }
    },
    schema: 'updatedAt'
  },
  [keyNames.KEY_TICKET_CLASSIFICATION]: {
    component: components.TicketClassificationView,
    schema: `classifications {
      classification {
        id
        name
      }
      value
    }`,
    componentProps: {
      cardMode: true
    },
    // getValueEdit: (viewData: any) => {
    //   return viewData.classification.name;
    // }
    // getValueEdit: (viewData: any) => {
    //   let inputValue: any = { region: null, language: null };
    //   viewData?.map((_ele: any) => {
    //     inputValue = { region: _ele.classification.region, language: _ele.classification.language };
    //     if (_ele?.classification?.name === 'Language') {
    //       inputValue.language = { ..._ele.classification, value: _ele.value, label: _ele.value };
    //     }
    //     if (_ele?.classification?.name === 'Region') {
    //       inputValue.region = { ..._ele.classification, value: _ele.value, label: _ele.value };
    //     }
    //   });
    //   return inputValue;
    // },
    // fix problem wrong format value of Classifications

    getValueEdit: (apiValue: any) => {
      return apiValue?.map((_ele: any) => {
        return {
          ..._ele,
          value: _ele.value,
          label: _ele.value
        };
      });
    },
    getMutationValue: (value: any) => {
      const newParams: any = [];

      const language = value?.find((_item: any) => _item.classification.name === 'Language');
      if (language) {
        newParams.push({
          classification: {
            id: language.classification.id,
            name: language.classification.name
          },
          value: language.value
        });
      }
      const region = value?.find((_item: any) => _item.classification.name === 'Region');
      if (region) {
        newParams.push({
          classification: {
            id: region.classification.id,
            name: region.classification.name
          },
          value: region.value
        });
      }
      return { [keyNames.KEY_TICKET_CLASSIFICATION]: newParams };
    }
    // getDefaultValue: (value: any) => {
    //   const newParams: any = [];
    //   const region = value?.find((_item: any) => _item.classification.name === 'Region');
    //   if (region) {
    //     newParams.push({
    //       classification: {
    //         id: region.classification.id,
    //         name: region.classification.name
    //       },
    //       value: region.value
    //     });
    //   }

    //   const language = value?.find((_item: any) => _item.classification.name === 'Language');
    //   if (language) {
    //     newParams.push({
    //       classification: {
    //         id: language.classification.id,
    //         name: language.classification.name
    //       },
    //       value: language.value
    //     });
    //   }
    //   return newParams;
    // },
  }
};
export default viewFieldsConfig;
