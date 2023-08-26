import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// types import
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';

// project import
import * as keyNames from '@activity/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import _ from 'lodash';
import { queryKeys } from '@activity/config/queryKeys';
import { Activity } from '@activity/types/activity';
import { useTranslation } from 'react-i18next';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';
import {
  ACTIVITY_CALL_TYPE_SCHEDULE,
  ACTIVITY_MENU_CALL,
  ACTIVITY_MENU_EMAIL,
  ACTIVITY_MENU_SMS,
  ACTIVITY_MENU_TASK,
  ACTIVITY_VIEW_FIELDS_CALL_ORDER,
  ACTIVITY_VIEW_FIELDS_EMAIL_ORDER,
  ACTIVITY_VIEW_FIELDS_ORDER,
  ACTIVITY_VIEW_FIELDS_SMS_ORDER
} from '@activity/config/constants';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
  activityType?: string;
}

const Left = (props: LeftProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { layoutData, ignoreFields = [], onRefetch, activityType } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  console.log(`~~~~ Activity Left Props`, props);
  // get data from useQueryClient
  // const data = queryClient.getQueryData<Activity>([queryKeys.viewActivity, menuSourceId]);

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    if (isSuccess && [keyNames.KEY_NAME_ACTIVITY_REPEAT, keyNames.KEY_NAME_ACTIVITY_END_TIME].indexOf(keyName) >= 0) {
      queryClient.setQueryData<Activity>([queryKeys.viewActivity, menuSourceId as string], (old: any) => {
        return { ...old, ...value };
      });
    }
    queryClient.invalidateQueries([queryKeys.viewActivity, menuSourceId]);

    // onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => {
    console.log('...Activity > View > handleOnClose ', keyName, value);
  };

  const FieldsMemo = useMemo(() => {
    let orderBasicField: any = [];
    switch (activityType) {
      case ACTIVITY_MENU_EMAIL: {
        ACTIVITY_VIEW_FIELDS_EMAIL_ORDER.forEach((key: string) => {
          let nField: any = null;
          if (key === keyNames.KEY_NAME_ACTIVITY_ASSIGN_TO) {
            nField = _.cloneDeep(basicFields.find((field: PageLayoutSectionField) => field.keyName == keyNames.KEY_NAME_ACTIVITY_FROM));
            console.log('~~~~ nField', nField);
            if (nField) nField.languageKey = 'activity_email_field_basic_assign_rep';
          } else if (key === keyNames.KEY_NAME_ACTIVITY_FROM) {
            nField = _.cloneDeep(basicFields.find((field: PageLayoutSectionField) => field.keyName == key));
            console.log(`~~~~FROM FIELD`, nField);
            if (nField) nField.config.viewProps = { ...nField.config.viewProps, mode: 'email' };
          } else if (key === keyNames.KEY_NAME_ACTIVITY_TO) {
            nField = _.cloneDeep(basicFields.find((field: PageLayoutSectionField) => field.keyName == key));
            console.log(`~~~~TO FIELD`, nField);
            if (nField) nField.config.viewProps = { ...nField.config.viewProps, mode: 'email' };
          } else nField = basicFields.find((field: PageLayoutSectionField) => field.keyName == key);

          if (nField) orderBasicField.push(nField);
        });
        break;
      }
      case ACTIVITY_MENU_SMS: {
        ACTIVITY_VIEW_FIELDS_SMS_ORDER.forEach((key: string) => {
          let nField: any = null;
          if (key === keyNames.KEY_NAME_ACTIVITY_ASSIGN_TO) {
            nField = _.cloneDeep(basicFields.find((field: PageLayoutSectionField) => field.keyName == keyNames.KEY_NAME_ACTIVITY_FROM));
            console.log('~~~~ nField', nField);
            if (nField) nField.languageKey = 'activity_sms_field_basic_assign_to';
          } else nField = basicFields.find((field: PageLayoutSectionField) => field.keyName == key);
          if (nField) orderBasicField.push(nField);
        });
        break;
      }
      case ACTIVITY_MENU_CALL: {
        ACTIVITY_VIEW_FIELDS_CALL_ORDER.forEach((key: string) => {
          const nField = basicFields.find((field: PageLayoutSectionField) => field.keyName == key);
          if (nField) orderBasicField.push(nField);
        });
        if (data?.callType !== ACTIVITY_CALL_TYPE_SCHEDULE) {
          ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_REPEAT);
        }
        break;
      }
      default:
        ACTIVITY_VIEW_FIELDS_ORDER.forEach((key: string) => {
          const nField = basicFields.find((field: PageLayoutSectionField) => field.keyName == key);
          if (nField) orderBasicField.push(nField);
        });
        break;
    }

    console.log('~~~~basicFields', basicFields);

    console.log('~~~~orderBasicField', orderBasicField);
    console.log('~~~~ignoreFields', ignoreFields);

    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={orderBasicField}
            ignoreFields={[...ignoreFields, keyNames.KEY_NAME_ACTIVITY_SUBJECT]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
            column={1}
            // setQueryData={[queryKeys.viewActivity, menuSourceId as string]}
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

  return <ViewLeft items={leftItems} />;
};

export default Left;
