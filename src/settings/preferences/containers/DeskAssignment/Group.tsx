import { Box, Switch, Typography, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

// project
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';

// menu
import useAssignmentGroupsMutation from '@settings/preferences/hooks/desk/useAssignmentGroupsMutation';
import { useAssignmentGroups } from '@settings/preferences/hooks/desk/useAssimentGroups';
import * as keyNames from '@settings/preferences/config/desk/keyNames';
interface Props {
  onClickGroupName: (data: any) => void;
}

const Group = (props: Props) => {
  const { onClickGroupName } = props;
  const { data: listGroups, isLoading, refetch: refetch } = useAssignmentGroups('');
  const { mUpdate } = useAssignmentGroupsMutation();
  const [items, setItems] = useState<any[]>([]);
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (listGroups?.results && listGroups?.results) {
      setItems(listGroups?.results);
    } else {
      setItems([]);
    }
  }, [listGroups]);

  const handleUpdateActive = (newValue: boolean, id: string) => {
    const params = {
      group: {
        id: id,
        active: newValue
      }
    };
    mUpdate.mutate(params);
  };

  // ========== make table=========
  const getMapColumns = () => {
    return {
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME](col: string, data: any, extra: any) {
        return (
          <Box onClick={() => onClickGroupName(data)} sx={{ width: 'fit-content' }}>
            <Typography color={theme.palette.primary.main}>{data?.[col]}</Typography>
          </Box>
        );
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_TOTAL_REPS](col: string, data: any, extra: any) {
        return <Typography>{data?.[col]}</Typography>;
      },
      [keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_ACTIVE](col: string, data: any, extra: any) {
        const checked = data?.[col];
        return <Switch defaultChecked={checked || false} onClick={() => handleUpdateActive(!checked, data?.id || '')} />;
      }
    };
  };
  const fields = useMemo(() => {
    return [
      {
        languageKey: t('ncrm_generalsetting_preferences_group_name'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_NAME,
        enableSorting: false,
        width: 'auto'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_group_users'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_TOTAL_REPS,
        enableSorting: false,
        width: '400px'
      },
      {
        languageKey: t('ncrm_generalsetting_preferences_active'),
        keyName: keyNames.KEY_SETTING_PREFERENCES_ASSIGNMENT_GROUP_ACTIVE,
        enableSorting: false,
        width: 'auto'
      }
    ];
  }, []);
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items || [],
      columns: columns,
      sx: { p: 0, mb: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns]);
  // ========== End make table=========

  return <>{TableMemo}</>;
};

export default Group;
