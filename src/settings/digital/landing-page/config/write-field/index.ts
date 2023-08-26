import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import validators from '@base/utils/validation/fieldValidator';
import * as baseComponents from '@base/config/write-field/components';

export default {
  [keyNames.KEY_NAME_LANDING_PAGE_ID]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: 'settings_landing_page',
      showType: 'canvas'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  }
  // [keyNames.KEY_NAME_LANDING_PAGE_NAME]: {
  //   component: TextField,
  //   componentProps: {
  //     fullWidth: true,
  //     autoComplete: 'off'
  //   },
  //   showFullRow: true,
  //   validate: {
  //     required: validators.required
  //   },
  //   defaultValue: '',
  //   parseParam: (value: string) => value
  // },
  // [keyNames.KEY_NAME_LANDING_PAGE_TYPE]: {
  //   component: Type,
  //   showFullRow: true,
  //   validate: {
  //     required: validators.required
  //   },
  //   defaultValue: 'LANDING_PAGE_TYPE_TICKET_FORM'
  // },
  // [keyNames.KEY_NAME_LANDING_PAGE_PRODUCT]: {
  //   component: ProductAutoComplete,
  //   componentProps: {
  //     addLabel: 'Add new product',
  //     placeholder: 'Type or click to select a product'
  //   },
  //   defaultValue: null,
  //   parseValue: (valueApi: any) => valueApi || null,
  //   parseParam: (value: any) => {
  //     return { id: value.id, name: value.name };
  //   },
  //   showFullRow: true
  // },
  // [keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE]: {
  //   component: LanguageSelect,
  //   defaultValue: 'en',
  //   showFullRow: true,
  // },
  // [keyNames.KEY_NAME_LANDING_PAGE_ASSIGN_TO]: {
  //   component: UserAutoComplete,
  //   componentProps: {
  //     single: false,
  //     showAvatar: false
  //   },
  //   showFullRow: true,
  //   defaultValue: [],
  //   parseValue: (valueApi: any) => valueApi || [],
  //   parseParam: (value: User[]) =>
  //     value?.map(
  //       (item: User) =>
  //         ({
  //           user: {
  //             id: item.id,
  //             name: item.name
  //           },
  //           group: {}
  //         } as AssignToName)
  //     )
  // },
  // [keyNames.KEY_NAME_LANDING_PAGE_DESCRIPTION]: {
  //   component: TextField,
  //   componentProps: {
  //     multiline: true,
  //     rows: 3,
  //     autoComplete: 'off'
  //   },
  //   showFullRow: true,
  //   parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value
  // },
};
