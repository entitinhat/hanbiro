import { useMemo } from 'react';
import _ from 'lodash';
import { useQueryClient } from '@tanstack/react-query';


// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { default as viewFieldsConfig } from '@settings/users-groups/groups/config/view-fields';
import * as keyNames from '@settings/users-groups/groups/config/keyNames';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

import { useTranslation } from 'react-i18next';
import { Group } from '../../types/group';

interface LeftProps {
  menuSource: string;
  menuSourceId: string;
  layoutData?: Group;
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
      userPermission: { isEdit: keyName === keyNames.KEY_GROUPS_ORG_ID ? false : true, isShow: true }
    };
  };

  const FieldsMemo = useMemo(() => {
    let groupsBasicFields: any[] = [];
    if (layoutData) {
      groupsBasicFields.push(buildFieldConfig(layoutData[keyNames.KEY_GROUPS_NAME], keyNames.KEY_GROUPS_NAME, 'Group Name'));

      // groupsBasicFields.push(buildFieldConfig(useOrg().id, keyNames.KEY_GROUPS_ORG_ID, 'Orginazation'));
      groupsBasicFields.push(buildFieldConfig(layoutData[keyNames.KEY_GROUPS_URL], keyNames.KEY_GROUPS_URL, 'URL Name'));
      groupsBasicFields.push(buildFieldConfig(layoutData[keyNames.KEY_GROUPS_DESCRIPTION], keyNames.KEY_GROUPS_DESCRIPTION, 'Description'));
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
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
