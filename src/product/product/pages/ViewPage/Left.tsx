import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import * as keyNames from '@product/product/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { queryKeys } from '@product/product/config/queryKeys';
import { Product } from '@product/product/types/product';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields = [] } = props;
  const { menuSource, menuSourceId } = layoutData;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // get viewData from queryClient
  const data = queryClient.getQueryData<Product>([queryKeys.viewProduct, menuSourceId]);

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  console.log('basicFieldsProd', basicFields);
  

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    // optimisticQueryKey
    // if (isSuccess && [keyNames.KEY_NAME_ACTIVITY_REPEAT, keyNames.KEY_NAME_ACTIVITY_END_TIME].indexOf(keyName) >= 0) {
    //   queryClient.setQueryData([queryKeys.viewActivity], (old: any) => {
    //     return { ...old, ...value };
    //   });
    // }
    // onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => {};

  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={[...ignoreFields]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            setQueryData={[queryKeys.viewProduct, menuSourceId as string]}
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
          component: FieldsMemo
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
