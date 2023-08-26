import AddIcon from '@mui/icons-material/Add';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import MergeFieldTable from '@settings/general/components/Table';
import { useGetMergeField } from '@settings/general/hooks/merge-field/useGetMergeField';
import { useMergeFieldMutations } from '@settings/general/hooks/merge-field/useMergeFieldMutations';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddMergeField from './AddField';
import { MergeField, OrderItem } from '@settings/general/types/mergefield';
import { MENU_CUSTOMER, MENU_DESK, MENU_PRODUCT, MENU_SOURCE } from '@base/config/menus';

function MergeField() {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [tabs, setTabs] = useState(MENU_SOURCE[MENU_CUSTOMER]);
  const [tabsData, setTabsData] = useState<MergeField[]>([]);

  const {
    data: mergeField,
    isLoading,
    refetch
  } = useGetMergeField({
    query: `menu=${tabs}`
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const border = '1px solid ' + theme.palette.divider;
  useEffect(() => {
    if (mergeField) {
      setTabsData(mergeField?.results);
    }
  }, [mergeField]);
  const { mDeleteMergeField, mSortMergeField } = useMergeFieldMutations();

  const onDragRow = (nItems: OrderItem[]) => {
    mSortMergeField.mutate(
      {
        items: nItems
      },
      {
        onSuccess: () => {}
      }
    );
  };
  const onDelete = (id: string) => {
    mDeleteMergeField.mutate({ id: id });
  };

  const handleCloseAddField = (value: boolean) => {
    setShowAdd(value);
  };
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue);
    // setTabsData(mergeField?.results.filter((item: any) => item.menu === newValue));
  };

  const tabList = [
    { label: t('ncrm_generalsetting_preferences_customer'), value: MENU_SOURCE[MENU_CUSTOMER] },
    { label: t('ncrm_generalsetting_assignment_rule_field_basic_product'), value: MENU_SOURCE[MENU_PRODUCT] },
    { label: t('ncrm_common_site_type_desk'), value: MENU_SOURCE[MENU_DESK] }
  ];
  return (
    <Box sx={{ width: '100%', height: '100%', padding: '0px' }}>
      <Stack direction={'column'}>
        <TabContext value={tabs.toString()}>
          <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
            {tabList.map((tab: any, index: any) => {
              return <Tab key={index} label={tab.label} value={tab.value} />;
            })}
          </TabList>
          <TabPanel value={tabs} sx={{ p: 0 }}>
            <Box sx={{ borderBottom: border }}>
              <MergeFieldTable data={tabsData} onDeleteMergeField={onDelete} onDragRow={onDragRow} onCloseAddField={handleCloseAddField} />
            </Box>
            <Box>{showAdd && <AddMergeField onClose={handleCloseAddField} menu={tabs} />}</Box>
            <Button
              size="small"
              color="primary"
              variant="contained"
              sx={{ margin: 1, padding: '1px 8px', minWidth: '48px', width: '124px', height: '22px', fontSize: '12px' }}
              onClick={() => setShowAdd(true)}
              disabled={showAdd}
            >
              <AddIcon sx={{ fontSize: '16px' }} />
              <Box sx={{ paddingTop: '1px' }}>{t('ncrm_generalsetting_personalize_add_another_line')}</Box>
            </Button>
          </TabPanel>
        </TabContext>
      </Stack>
    </Box>
  );
}

export default MergeField;
