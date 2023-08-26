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
import * as keyNames from '@opportunity/config/keyNames';
import { useTranslation } from 'react-i18next';
import { SET_TIMEOUT } from '@base/config/constant';
import { queryKeys } from '@opportunity/config/queryKeys';
import { Opportunity } from '@opportunity/types/interfaces';
import OptInsight from '@opportunity/containers/OptInsight';

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
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.opportunityGet], (old: Opportunity | undefined) => {
        return { ...old, ...value };
      });
    }

    setTimeout(() => {
      onRefetch && onRefetch();
    }, SET_TIMEOUT);
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  const bantFields: string[] = [
    keyNames.KEY_NAME_OPPORTUNITY_BUDGET,
    keyNames.KEY_NAME_OPPORTUNITY_DECISION_MAKER,
    keyNames.KEY_NAME_OPPORTUNITY_PURCHASE_PROCESS,
    keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER_NEED,
    keyNames.KEY_NAME_OPPORTUNITY_TIME_FRAME
  ];
  const summaryFields: string[] = [
    keyNames.KEY_NAME_OPPORTUNITY_CODE,
    keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER,
    keyNames.KEY_NAME_OPPORTUNITY_TYPE,
    keyNames.KEY_NAME_OPPORTUNITY_PRODUCT,
    keyNames.KEY_NAME_OPPORTUNITY_SALES_REP
  ];

  //view fields render

  const bantFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={bantFields
              .map((keyName: string) => basicFields.find((v: any) => v.keyName === keyName))
              .filter((v: any) => v !== undefined)}
            ignoreFields={[...ignoreFields]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            readOnly={data?.restore?.id ? true : false}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data, bantFields]);

  const SummaryFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={summaryFields
              .map((keyName: string) => basicFields.find((v: any) => v.keyName === keyName))
              .filter((v: any) => v !== undefined)}
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
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data, summaryFields]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_opportunity_opportunity_inisght'),
      sections: [
        {
          component: <OptInsight layoutData={layoutData} />
        }
      ]
    },
    {
      title: t('ncrm_opportunity_bant'),
      sections: [
        {
          component: bantFieldsMemo
        }
      ]
    },
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: SummaryFieldsMemo
        }
      ]
    }
  ];

  return <ViewLeft items={leftItems} />;
};

export default Left;
