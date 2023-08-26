import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Tab, Tabs, Tooltip, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import { Sync } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// project
import IconButton from '@base/components/@extended/IconButton';
import useSnackBar from '@base/hooks/useSnackBar';

// menu
import { AssignmentGroup } from '@settings/preferences/types/desk/assignment';
import NewGroup from './NewGroup';
import useAssignmentGroupsMutation from '@settings/preferences/hooks/desk/useAssignmentGroupsMutation';
import { useAssignmentGroups } from '@settings/preferences/hooks/desk/useAssimentGroups';
import User from './User';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import Group from './Group';
import GroupDetail from './GroupDetail';

interface DeskAssignmentProps {}
const DeskAssignment = (props: DeskAssignmentProps) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [groups, setGroups] = useState<AssignmentGroup[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [viewItem, setViewItem] = useState<AssignmentGroup | null>(null);
  const [showGroupDetail, setShowGroupDetail] = useState(false);
  const [isOpenNewGroup, setIsOpenNewGroup] = useState(false);
  const { data: listGroups, isLoading, refetch: refetch } = useAssignmentGroups('');
  const { mDelete, mUpdate } = useAssignmentGroupsMutation();
  const queryClient = useQueryClient();
  const onCloseNewGroup = () => {
    refetch();
    setIsOpenNewGroup(false);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const onSaveNewGroup = (group: AssignmentGroup, mode: string) => {
    let nItems = groups;
    if (mode == 'add') {
      nItems = [group, ...groups];
    } else if (mode == 'update') {
      nItems = groups.map((item) => {
        if (item.id == group.id) {
          return group;
        }
        return item;
      });
    }
    setGroups(nItems);
    onCloseNewGroup();
  };

  useEffect(() => {
    if (!isLoading && listGroups) {
      setGroups(listGroups.results ?? []);
    }
  }, [listGroups]);

  //=====Render
  const theme = useTheme();
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const onClickGroupName = (data: any) => {
    setGroupId(data?.id || '');
    setViewItem(data);
    setShowGroupDetail(true);
  };

  const onAfterSaved = (nVal: any) => {
    setViewItem(nVal);
  };

  return (
    <>
      {!showGroupDetail && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={t('ncrm_generalsetting_preferences_assignment_user')} {...a11yProps(0)} />
              <Tab label={t('ncrm_generalsetting_preferences_assignment_group')} {...a11yProps(1)} />
            </Tabs>
            <Box sx={{ margin: 'auto 0 5px auto' }}>
              {value == 1 && (
                <Button
                  size="small"
                  sx={{ marginRight: '5px', height: '70%' }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setIsOpenNewGroup(true);
                  }}
                >
                  {t('ncrm_common_btn_add')}
                </Button>
              )}
              <Tooltip title={t('ncrm_common_btn_refresh')}>
                <IconButton
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.lighter,
                      borderColor: theme.palette.secondary.light
                    }
                  }}
                  onClick={() => {
                    if (value == 1) {
                      queryClient.refetchQueries([queryKeys.assignmentGroups]);
                    } else {
                      queryClient.refetchQueries([queryKeys.assignmentUsers]);
                    }
                  }}
                >
                  <Sync fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <TabPanel value={value} index={0}>
            <Box sx={{ p: 2, height: 'calc(100vh-224px)' }} className="scroll-box">
              <User />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ p: 2, height: 'calc(100vh-224px)' }} className="scroll-box">
              <Group onClickGroupName={onClickGroupName} />
            </Box>
          </TabPanel>
        </>
      )}
      {showGroupDetail && (
        <>
          <GroupDetail
            viewItem={viewItem}
            onBack={() => {
              queryClient.refetchQueries([queryKeys.assignmentGroups]);
              setShowGroupDetail(false);
            }}
            groupId={groupId}
            onAfterSaved={onAfterSaved}
          />
        </>
      )}
      {isOpenNewGroup && <NewGroup isOpen={isOpenNewGroup} onClose={onCloseNewGroup} onSave={onSaveNewGroup} />}
    </>
  );
};

export default DeskAssignment;
