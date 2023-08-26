import { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import * as keyNames from '@settings/digital/landing-page/config/keyNames'
import { useTranslation } from 'react-i18next';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';
//menu
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, ignoreFields = [], onRefetch } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  const queryClient = useQueryClient();
  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  const { t } = useTranslation();
  //after save
  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([landingPageQueryKeys.landingPageGet], (old: any | undefined) => {
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
            ignoreFields={[...ignoreFields, keyNames.KEY_NAME_LANDING_PAGE_PUBLISH_DATE, keyNames.KEY_NAME_LANDING_PAGE_PUBLISH ]}
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

  const leftFieldsOptions = basicFields?.filter((_field: any) => _field?.keyName === keyNames.KEY_NAME_LANDING_PAGE_PUBLISH);

  const OptionsFieldsMemo = useMemo(() => {
    return (
      <>
        {leftFieldsOptions.length ? (
          <ViewFields
            fields={ leftFieldsOptions }
            ignoreFields={[...ignoreFields, ]}
            menuSource={menuSource}
            menuSourceId={menuSourceId || ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            divider
          />
        ) : <></>}
      </>
    );
  }, [leftFieldsOptions, ignoreFields, menuSource, menuSourceId, data])

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      sections: [
        {
          component: FieldsMemo
        }
      ]
    },
    {
      title: t('ncrm_generalsetting_landing_page_field_more_options'),
      sections: [
        {
          component: OptionsFieldsMemo
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
