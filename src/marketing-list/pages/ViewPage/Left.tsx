import React, { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

//menu
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import * as keyNames from '@marketing-list/config/keyNames';
import { useTranslation } from 'react-i18next';
import { SET_TIMEOUT } from '@base/config/constant';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields = [], onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  //photo

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([marketingQueryKeys.marketingListGet], (old: any | undefined) => {
        return { ...old, ...value };
      });
    }

    onRefetch &&
      setTimeout(() => {
        onRefetch();
      }, SET_TIMEOUT);
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  const topFields = [keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE, keyNames.KEY_NAME_CUSTOMER_MARKETING_DESCRIPTION];
  const bottomFields = [
    keyNames.KEY_NAME_CUSTOMER_OWNER,
    keyNames.KEY_NAME_CUSTOMER_ACTIVE,
    keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
    keyNames.KEY_NAME_CUSTOMER_UPDATED_AT,
    keyNames.KEY_NAME_CUSTOMER_LAST_USED_AT
  ];

  //view fields render
  const TopFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields.filter((v: any) => topFields.includes(v.keyName))}
            ignoreFields={[...ignoreFields]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={data?.restore?.id ? true : false}
            divider
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data]);

  const BottomFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields.filter((v: any) => bottomFields.includes(v.keyName))}
            ignoreFields={[...ignoreFields]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={data?.restore?.id ? true : false}
            divider
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: TopFieldsMemo
        },
        {
          component: BottomFieldsMemo
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
