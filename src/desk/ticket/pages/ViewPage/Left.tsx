import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import * as keyNames from '@desk/ticket/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import _ from 'lodash';
import { queryKeys } from '@desk/ticket/config/queryKeys';
import { useTranslation } from 'react-i18next';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields, onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  console.log('menuSource left: ', menuSourceId)
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => { };

  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={[
              ...(ignoreFields ?? []),
              keyNames.KEY_TICKET_SUBJECT,
              keyNames.KEY_TICKET_STATUS,
              keyNames.KEY_TICKET_DURATION,
              keyNames.KEY_TICKET_REAL_DURATION,
              keyNames.KEY_TICKET_RESPONSE_DUE,
              keyNames.KEY_TICKET_RESOLUTION_DUE
            ]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
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
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

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

  return <ViewLeft items={leftItems} />;
};

export default Left;
