import React, { useMemo } from 'react';

// types import
import { PageLayoutData } from '@base/types/pagelayout';

// mui import
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography, useTheme } from '@mui/material';

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

export function moveItemInArray<T>(workArray: T[], fromIndex: number, toIndex: number): T[] {
  if (toIndex === fromIndex) {
    return workArray;
  }
  const target = workArray[fromIndex];
  const increment = toIndex < fromIndex ? -1 : 1;

  for (let k = fromIndex; k !== toIndex; k += increment) {
    workArray[k] = workArray[k + increment];
  }
  workArray[toIndex] = target;
  return workArray;
}

const Left = (props: LeftProps) => {
  const { layoutData, onRefetch } = props;
  const ignoreFields: any[] = [keyNames.KEY_NAME_ASSIGNMENT_RULE_NAME];
  const { t } = useTranslation();
  const { menuSource, menuSourceId, data } = layoutData;

  const theme = useTheme();

  const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    console.log('...Ticket > View > handleOnSave ', keyName, isSuccess, value);
    onRefetch && onRefetch();
  };

  const handleOnClose = (keyName: string, value: any) => {
    console.log('...Ticket > View > handleOnClose ', keyName, value);
  };
  console.log('basicFields Rule', basicFields);
  //Move Description to last
  var newFields = [...basicFields];
  moveItemInArray(newFields, 3, 8);

  //move Unassign to second
  moveItemInArray(newFields, 7, 3);
  const FieldsMemo = useMemo(() => {
    return (
      <>
        {basicFields.length ? (
          <ViewFields
            divider
            fields={newFields}
            ignoreFields={[...(ignoreFields ?? []), keyNames.KEY_NAME_ASSIGNMENT_RULE_ENTRIES]}
            menuSource={menuSource}
            menuSourceId={menuSourceId ?? ''}
            data={data}
            onSave={handleOnSave}
            onClose={handleOnClose}
          />
        ) : null}
      </>
    );
  }, [basicFields, ignoreFields, menuSource, menuSourceId]);

  const leftItems: LeftItem[] = [
    {
      title: t('ncrm_common_summary'),
      component: FieldsMemo
    }
  ];
  return (
    <ViewAsideContainer theme={theme}>
      <ViewLeft items={leftItems} />
    </ViewAsideContainer>
  );
};

export default Left;
