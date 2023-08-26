import { useMemo } from 'react';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// project import
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { useTranslation } from 'react-i18next';
import ViewLeft, { LeftItem } from '@base/components/@hanbiro/ViewLeft';

interface LeftProps {
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  onRefetch?: () => void;
}

const Left = (props: LeftProps) => {
  const { layoutData, onRefetch } = props;
  const ignoreFields: any[] = [keyNames.KEY_NAME_ASSIGNMENT_RULE_NAME];
  const { t } = useTranslation();
  const { menuSource, menuSourceId, data } = layoutData;

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    console.log('...Ticket > View > handleOnSave ', keyName, isSuccess, value);
    onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => {
    console.log('...Ticket > View > handleOnClose ', keyName, value);
  };

  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            fields={basicFields}
            ignoreFields={[...(ignoreFields ?? []), keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
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
