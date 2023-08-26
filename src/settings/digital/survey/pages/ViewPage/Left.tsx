import { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

//menu
import * as keyNames from '@settings/digital/survey/config/keyNames';
import { queryKeys } from '../../config/queryKeys';

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
  console.log('basicFields', basicFields);
  //hide fields
  const hiddenFields: string[] = [
    keyNames.KEY_SURVEY_NAME,
    keyNames.KEY_SURVEY_CONTENT,
    keyNames.KEY_SURVEY_TEMPLATE,
    keyNames.KEY_SURVEY_UPDATED_AT,
    keyNames.KEY_SURVEY_UPDATED_BY
    //keyNames.KEY_SURVEY_STAGE
  ];

  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.surveyGet], (old: any) => {
        return { ...old, ...value };
      });
    }

    onRefetch && onRefetch();
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  console.log('basicFields',basicFields)

  //view fields render
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={[...ignoreFields, ...hiddenFields]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
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
