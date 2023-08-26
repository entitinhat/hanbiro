import * as keyNames from '@settings/users-groups/groups/config/keyNames';
import { MEMBER_TYPES_OPTIONS } from '../../config/constants';
import { MemberType } from '../../types/group';

export const getParams = (formData: any) => {
  let memberId = formData.memberType?.value === 'GROUP' ? formData?.memberId : formData?.memberId?.id;
  let newParams: any = {};
  newParams = {
    ...newParams,
    [keyNames.KEY_MEMBERSHIP_MEMBER_TYPE]:formData.memberType?.value,
    [keyNames.KEY_MEMBERSHIP_MEMBER_ID]: memberId
  };
  return newParams;
};
