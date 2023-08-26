import _ from 'lodash';
import React, { useEffect, useState } from 'react';
//project
import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import { AssignmentRule, AssignRule, RuleEntry } from '@settings/assignment-rule/rule/types/rule';
import { PageLayoutData, PageLayoutSectionField } from '@base/types/pagelayout';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import WriteRuleEntry from '@settings/assignment-rule/rule/containers/WriteRuleEntry';
import { MENU_SETTING_ASSIGNMENT_RULE } from '@base/config/menus';
import { WriteOption } from '@base/types/common';
import MainCard from '@base/components/App/MainCard';
import useAssignRuleEntryUpdate from '../../hooks/useAssignRuleEntryUpdate';
import RuleEntryTable from './RuleEntryTable';
//material-ui
import { Box, Button, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
//third-party
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
interface ViewDetailProps {
  menuSource: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const ViewDetail = (props: ViewDetailProps) => {
  const { menuSourceId, layoutData } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [curTab, setCurTab] = useState<number>(0);
  const [data, setData] = useState<RuleEntry[]>([]);
  const [curEdit, setCurEdit] = useState<RuleEntry[]>([]);
  //get Mutation
  const mUpdate = useAssignRuleEntryUpdate();
  useEffect(() => {
    if (layoutData?.data && layoutData?.data?.rulesEntry) {
      setData(layoutData.data.rulesEntry);
    }
  }, [layoutData?.data, curTab]);
  const category = MENU_SETTING_ASSIGNMENT_RULE;
  const listType = 'VIEW';

  //========================DEBUG==============================
  // console.log('Email Address', layoutData);
  // console.log('>>>>>>>>>>>> Print menuSourceId', menuSourceId);
  //===========================================================
  const onRefetch = () => {
    // queryClient.invalidateQueries([queryKeys.]);
  };
  const border = '1px solid ' + theme.palette.divider;

  //render

  return (
    <React.Suspense fallback={<></>}>
      <Box className="detail-view scroll-box">
        <MainCard
          title={t('ncrm_generalsetting_assignment_rule_entry')}
          darkTitle
          contentSX={{ p: 0 }}
          border={false}
          secondary={
            <Button
              variant="contained"
              size="small"
              onClick={(e: any) => {
                setWriteOption({ ...writeOption, isOpenWrite: true, writeType: 'create' });
              }}
            >
              + {t('ncrm_common_btn_new')}
            </Button>
          }
        >
          <RuleEntryTable
            data={data}
            onSelectEdit={(val, curTab) => {
              setCurEdit(val);
              // setCurTab(curTab - 1);
              setWriteOption({ ...writeOption, isOpenWrite: true, writeType: 'update' });
            }}
          />
        </MainCard>
      </Box>

      {writeOption.isOpenWrite && (
        <WriteRuleEntry
          isOpen={writeOption.isOpenWrite}
          onClose={() => {
            setWriteOption({ ...writeOption, isOpenWrite: false }), setCurEdit([]);
          }}
          menuSourceId={menuSourceId}
          category={category}
          type={writeOption.writeType}
          listType={listType}
          menuApi={MENU_SETTING_ASSIGNMENT_RULE}
          onReload={onRefetch}
          curTab={curTab}
          module={layoutData?.data?.module}
          channelType={layoutData?.data?.channelType}
          dataInit={layoutData?.data}
          listOrder={data.map((entry) => entry.order)}
          defaultValues={curEdit}
        />
      )}
    </React.Suspense>
  );
};

export default ViewDetail;
