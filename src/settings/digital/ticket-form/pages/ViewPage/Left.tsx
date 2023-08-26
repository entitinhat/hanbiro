import { useMemo } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';

//menu
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import { queryKeys } from '../../config/queryKeys';
import { useTranslation } from 'react-i18next';
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

  //after save
  const handleOnSave = async (keyName: string, isSuccess: boolean, value: any) => {
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.ticketFormUpdate], (old: any) => {
        return { ...old, ...value };
      });
    }

    onRefetch && onRefetch();
  };

  //close
  const handleOnClose = (keyName: string, value: any) => {
    //console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
  const moreFields = layoutData?.layout?.data?.[1]?.children ?? [];

  //hide fields
  const hiddenSummaryFields: string[] = [
    keyNames.KEY_TICKET_FORM_NAME,
    keyNames.KEY_TICKET_FORM_TEMPLATE,
    keyNames.KEY_TICKET_FORM_TITLE,
    keyNames.KEY_TICKET_FORM_HTML,
    keyNames.KEY_TICKET_FORM_STAGE,
    keyNames.KEY_TICKET_FORM_CREATED_AT,
    keyNames.KEY_TICKET_FORM_UPDATED_BY,
    keyNames.KEY_TICKET_FORM_LINK_TO_TYPE,
    keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE,
    keyNames.KEY_TICKET_FORM_SUBMISSION_DISPLAY,
    keyNames.KEY_TICKET_FORM_SUBMISSION_BEHAVIOR
  ];

  const hiddenSubmissionSettingFields: string[] = [
    keyNames.KEY_TICKET_FORM_LANGUAGE,
    keyNames.KEY_TICKET_FORM_PRODUCTS,
    keyNames.KEY_TICKET_FORM_DESCRIPTION,
    keyNames.KEY_TICKET_FORM_NAME,
    keyNames.KEY_TICKET_FORM_TEMPLATE,
    keyNames.KEY_TICKET_FORM_TITLE,
    keyNames.KEY_TICKET_FORM_HTML,
    keyNames.KEY_TICKET_FORM_STAGE
  ];

  //view fields render
  const SummaryFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={[...basicFields, ...moreFields]}
            ignoreFields={[...ignoreFields, ...hiddenSummaryFields]}
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

  const SubmissionSettingFieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={[...basicFields]}
            ignoreFields={[...ignoreFields, ...hiddenSubmissionSettingFields]}
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
          component: SummaryFieldsMemo
        }
      ]
    },
    {
      title: t('ncrm_generalsetting_ticket_form_submission_setting'),
      sections: [
        {
          component: SubmissionSettingFieldsMemo
        }
      ]
    }
  ];

  return (<ViewLeft items={leftItems} />);
};

export default Left;
