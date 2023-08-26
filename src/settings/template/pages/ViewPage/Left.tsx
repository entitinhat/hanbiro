import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import * as keyNames from '@desk/ticket/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import _ from 'lodash';
import { queryKeys } from '@settings/template/config/queryKeys';
import { useListQueryKeyTemplate } from '@settings/template/hooks/useListQueryKeyTemplate';
import { useTranslation } from 'react-i18next';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
  groupTemplate: string;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields, onRefetch, groupTemplate } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  const filter = useListQueryKeyTemplate(menuSource, groupTemplate);
  const queryClient = useQueryClient();

  const {t} = useTranslation();

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  
  const handleOnSave = async (keyName: string, isSuccess: boolean, value: any) => {
    let queryKey = [queryKeys.settingMenuTemplateNew, menuSourceId];
    let queryListKey = [queryKeys.settingMenuTemplatesGet, filter];
    if (isSuccess) {
      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          [keyName]: value[keyName]
        };
      });
      await queryClient.cancelQueries(queryListKey);
      queryClient.setQueryData(queryListKey, (old: any) => {
        const newData = [...old.data];
        const fIdx = newData.findIndex((_ele: any) => _ele.id === menuSourceId);
        if (newData[fIdx][keyName]) {
          newData[fIdx][keyName] = value[keyName];
        }
        return {
          data: newData,
          paging: old.paging
        };
      });
    }
  };
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={[...(ignoreFields ?? []), keyNames.KEY_TICKET_SUBJECT]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
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

  return (<ViewLeft items={leftItems} />);
};

export default Left;
1;
