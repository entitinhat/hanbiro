import React, { useState } from 'react';
// project
import TextViewField from '@base/containers/ViewField/Text';
// menu
import { KEY_SETTING_PREFERENCES_GROUP_DESC } from '@settings/preferences/config/keyNames';
import useAssignmentGroupsMutation from '@settings/preferences/hooks/desk/useAssignmentGroupsMutation';

interface GroupDescProps {
  desc: string;
  canEdit?: boolean;
  id: string;
  onAfterSaved: (nVal: string) => void;
}
const GroupDesc: React.FC<GroupDescProps> = (props: GroupDescProps) => {
  const { desc, canEdit = true, id, onAfterSaved } = props;
  const { mUpdate } = useAssignmentGroupsMutation();

  const onSave = (nVal: string) => {
    if (nVal) {
      mUpdate.mutate(
        { group: { id: id, description: nVal } },
        {
          onSuccess: () => {
            onAfterSaved && onAfterSaved(nVal);
          },
          onError: () => {}
        }
      );
    }
  };

  const userPermission = { isEdit: true, isShow: true };
  const config = { showFullRow: true };
  return (
    <>
      <TextViewField
        value={desc}
        keyName={KEY_SETTING_PREFERENCES_GROUP_DESC}
        menuSourceId={''}
        menuSource={''}
        onSubmitHandler={onSave}
        config={config}
        userPermission={userPermission}
      ></TextViewField>
    </>
  );
};

export default GroupDesc;
