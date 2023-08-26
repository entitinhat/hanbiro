import React, { useState } from 'react';
// project
import TextViewField from '@base/containers/ViewField/Text';

// menu
import { KEY_SETTING_PREFERENCES_GROUP_NAME } from '@settings/preferences/config/keyNames';
import useAssignmentGroupsMutate from '@settings/preferences/hooks/desk/useAssignmentGroupsMutation';

interface GroupNameProps {
  name: string;
  canEdit?: boolean;
  id: string;
  onAfterSaved: (nVal: string) => void;
}

const GroupName: React.FC<GroupNameProps> = (props: GroupNameProps) => {
  const { name, canEdit = true, id, onAfterSaved } = props;
  const { mUpdate } = useAssignmentGroupsMutate();

  const onSave = (nVal: string) => {
    if (nVal) {
      mUpdate.mutate(
        { group: { id: id, name: nVal } },
        {
          onSuccess: () => {
            onAfterSaved && onAfterSaved(nVal);
          },
          onError: () => {}
        }
      );
    }
  };

  const userPermission = { isEdit: canEdit, isShow: true };
  const config = { showFullRow: true };
  return (
    <>
      <TextViewField
        value={name}
        keyName={KEY_SETTING_PREFERENCES_GROUP_NAME}
        menuSourceId={''}
        menuSource={''}
        onSubmitHandler={onSave}
        config={config}
        userPermission={userPermission}
      ></TextViewField>
    </>
  );
};

export default GroupName;
