import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// types import
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import * as keyNames from '@product/unit/config/keyNames';
import { queryKeys } from '@product/unit/config/queryKeys';
import { BaseUnit } from '@product/unit/types/unit';
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
  const data = queryClient.getQueryData<BaseUnit>([queryKeys.viewBaseUnit, menuSourceId]);

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {};

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
            setQueryData={[queryKeys.viewBaseUnit, menuSourceId as string]}
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
