import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { default as viewFieldsConfig } from '@settings/users-groups/users/config/view-fields';
import * as keyNames from '@settings/users-groups/users/config/keyNames';
// types import


// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import _ from 'lodash';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

import { useTranslation } from 'react-i18next';
import { User } from '../../types';
import UserEmails from '../../containers/UserEmails';
import UserPhones from '../../containers/UserPhones';

import {
  USER_EMAIL,
  USER_PHONE
} from '@settings/users-groups/users/config/constants'

interface LeftProps {
  menuSource: string;
  menuSourceId: string;
  layoutData?: User;
  ignoreFields?: string[];
  handleSave: (keyName: string, isSuccess: boolean, value: any) => void;
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, menuSourceId, menuSource, ignoreFields, onRefetch, handleSave } = props;

  const queryClient = useQueryClient();
  const { t } = useTranslation();

  //build fields by config
  const buildFieldConfig = (data: any, keyName: string, languageKey: string) => {
    return {
      // config: customerViewConfig[keyName],
      config: viewFieldsConfig[keyName],
      data,
      keyName,
      languageKey,
      userPermission: { isEdit: true, isShow: true }
    };
  };

  const FieldsMemo = useMemo(() => {
    let groupsBasicFields: any[] = [];
    if (layoutData) {
      groupsBasicFields.push(buildFieldConfig(layoutData.displayName, keyNames.KEY_USER_DISPLAY_NAME, 'Display Name'));
      groupsBasicFields.push(buildFieldConfig(layoutData.fullName, keyNames.KEY_USER_FULLNAME, 'Full Name'));
      groupsBasicFields.push(buildFieldConfig(layoutData.urlName, keyNames.KEY_USER_URL_NAME, 'URL Name'));
      groupsBasicFields.push(buildFieldConfig(layoutData?.createdAt, keyNames.KEY_USER_CREATEDDAT, 'Signed Up'));
    }
    return (
      <>
        {layoutData ? (
          <ViewFields
            fields={groupsBasicFields}
            ignoreFields={[]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={layoutData}
            onSave={handleSave}
            column={1}
            isIAMComponent={true}
            divider
          />
        ) : (
          <></>
        )}
      </>
    );
  }, [layoutData, ignoreFields, menuSource, menuSourceId]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: FieldsMemo
        },
        {
          title: t(USER_EMAIL),
          component: <UserEmails value={layoutData?.emails ?? []} menuSource={menuSource} menuSourceId={menuSourceId} refetch={onRefetch} />
        },
        {
          title: t(USER_PHONE),
          component: <UserPhones value={layoutData?.phones ?? []} menuSource={menuSource} menuSourceId={menuSourceId} refetch={onRefetch} />
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
