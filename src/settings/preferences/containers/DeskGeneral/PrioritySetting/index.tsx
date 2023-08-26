import { PRIORITY_HIGH, PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_URGENT } from '@base/config/constant';
import PriorityView from '@base/containers/ViewField/Priority/View';
import { Switch, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { Selection } from '@settings/general/types/interface';
import Section from '@settings/preferences/components/Section';
import usePriorityMutation from '@settings/preferences/hooks/desk/usePriorityMutation';
import { usePrioritySetting } from '@settings/preferences/hooks/desk/usePrioritySetting';
import { PriorityItem } from '@settings/preferences/types/desk/common';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PriorityProps {}
const PrioritySetting: React.FC<PriorityProps> = (props: PriorityProps) => {
  const [items, setItems] = useState<PriorityItem[]>([]);
  const { data, isLoading, refetch } = usePrioritySetting();
  const { mUpdate } = usePriorityMutation();
  const { t } = useTranslation();
  const theme = useTheme();

  const onSave = (newItems: PriorityItem[]) => {
    const nSetting = {
      menu: 'desk',
      key: 'priority',
      value: JSON.stringify(newItems)
    };
    console.log('tlog nSetting-', nSetting);
    mUpdate.mutate(
      { menuSetting: nSetting },
      {
        onSuccess: () => refetch() // update priority data when update is successful
      }
    );
  };
  const onSetDefault = (row: PriorityItem) => {
    const newItems = items.map((item: PriorityItem) => {
      let isDefault = false;
      if (item.priority == row.priority) {
        isDefault = true;
      }
      return {
        ...item,
        isDefault: isDefault
      };
    });
    setItems(newItems);
    // save data
    onSave(newItems);
  };

  const onSetActive = (row: PriorityItem) => {
    const newItems = items.map((item: PriorityItem) => {
      let isActive = item.active;
      if (item.priority == row.priority) {
        isActive = !item.active;
      }
      return {
        ...item,
        active: isActive
      };
    });
    setItems(newItems);
    // save data
    onSave(newItems);
  };
  useEffect(() => {
    if (!isLoading && data?.value) {
      try {
        const slas: PriorityItem[] = JSON.parse(data.value).map((item: PriorityItem) => {
          switch (item.priority) {
            case PRIORITY_URGENT:
              return {
                ...item,
                languageKey: t('ncrm_common_urgent')
              };
            case PRIORITY_HIGH:
              return {
                ...item,
                languageKey: t('ncrm_common_high')
              };
            case PRIORITY_MEDIUM:
              return {
                ...item,
                languageKey: t('ncrm_common_medium')
              };
            case PRIORITY_LOW:
              return {
                ...item,
                languageKey: t('ncrm_common_low')
              };
          }
        });
        setItems(slas);
      } catch (err: any) {}
    }
  }, [data]);

  const getChipColor = (priority: string, languageKey: string) => {
    const value: Selection = {
      keyName: priority,
      languageKey: languageKey
    };
    return <PriorityView value={value} />;
  };

  return (
    <Section header={t('ncrm_generalsetting_preferences_desk_priority')}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', padding: '12px', borderRadius: '10px' }}>
        <Table>
          <TableHead sx={{ borderTop: 0, borderBottom: `0.3px solid ${theme.palette.divider}`, borderRadius: '10px' }}>
            <TableRow>
              <TableCell> {t('ncrm_generalsetting_preferences_desk_priority')}</TableCell>
              <TableCell>{t('ncrm_generalsetting_default')}</TableCell>
              <TableCell>{t('ncrm_generalsetting_active')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {items.map((item, idx) => (
              <TableRow key={item.priority}>
                <TableCell sx={{ padding: 1 }}>{getChipColor(item.priority, item.languageKey)}</TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <Radio
                    checked={item.isDefault}
                    onChange={() => {
                      onSetDefault(item);
                    }}
                  />
                </TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <Switch
                    checked={item.active}
                    // {...label}
                    size="small"
                    onChange={() => {
                      onSetActive(item);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default PrioritySetting;
