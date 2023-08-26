import {GroupTreeAutocomplete} from "@base/components/@hanbiro/DirectoryGroup";
import {isArray} from "lodash";
import UserAutoComplete from "@sign-in/containers/UserAutoComplete";
import {EFilterComponent} from "@analytic/main/types/enum";

export const filterDateUser: string[] = [
  EFilterComponent.FILTER_DATE,
  EFilterComponent.FILTER_USER
];

export const filterDateGroup: string[] = [
  EFilterComponent.FILTER_DATE,
  EFilterComponent.FILTER_GROUP
];

export const filterComponents = {
  [EFilterComponent.FILTER_DATE]: {
    keyName: 'createdAt',
    component: UserAutoComplete,
    componentProps: {
      noWrap: true
    },
    getValue: (value: any, otps: any) => {
      const {s, e} = value;
      const {keyName} = otps;
      return `${keyName}>="${s}" ${keyName}<="${e}"`;
    }
  },
  [EFilterComponent.FILTER_USER]: {
    keyName: 'assignToUser',
    component: UserAutoComplete,
    componentProps: {
      className: "w-50 mg-l-5",
      isAddingOptionAll: true
    },
    getValue: (value: any, otps: any) => {
      const {keyName} = otps;
      if(!isArray(value)){
        value = [value]
      }
      return `${keyName}=${value.map((v: any) => v.id).join(',')}`
    }
  },
  [EFilterComponent.FILTER_GROUP]: {
    keyName: 'assignToGroup',
    component: GroupTreeAutocomplete,
    componentProps: {
      className: "w-50 mg-l-5",
      placeholder: "Please select a group ..."
    },
    getValue: (value: any, otps: any) => {
      const {keyName} = otps;
      if(!isArray(value)){
        value = [value]
      }
      return `${keyName}=${value.map((v: any) => v.id).join(',')}`
    }
  }
}