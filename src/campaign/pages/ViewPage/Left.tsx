import { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';

//menu
import { queryKeys } from '@campaign/config/queryKeys';
import { Campaign } from '@campaign/types/interface';
import { SECTION_VIEW_FIELDS } from '@campaign/config/constants';
import Insight from '@campaign/containers/Insight';
import KPI from '@campaign/containers/KPI';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

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
  const allFields = layoutData?.layout?.data?.[0]?.children ?? [];
  //basic fields
  const basicFields = allFields.filter((_field: any) => SECTION_VIEW_FIELDS[0].includes(_field.keyName));

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.campaignGet], (old: Campaign | undefined) => {
        return { ...old, ...value };
      });
    }

    onRefetch && onRefetch();
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  //view fields render
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
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
  }, [basicFields, ignoreFields, menuSource, menuSourceId, data]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_customer_fields_basic'),
      sections: [
        {
          component: FieldsMemo
        }
      ]
    },
    {
      title: t('Insight'),
      sections: [
        {
          component: <Insight />
        }
      ]
    },
    {
      title: t('KPI'),
      sections: [
        {
          component: <KPI />
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
