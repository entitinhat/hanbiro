import SpanLang from '@base/components/@hanbiro/SpanLang';
import { Button, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import Section from '@settings/preferences/components/Section';
import { SLA_LANGS } from '@settings/preferences/config/constants';
import useSLAMutation from '@settings/preferences/hooks/desk/useSLAMutation';
import { useSLASetting } from '@settings/preferences/hooks/desk/useSLASetting';
import React, { useEffect, useState } from 'react';
import ViewCustomer from './ViewCustomer';
import { SLA } from '@settings/preferences/types/desk/common';
import { useTranslation } from 'react-i18next';

interface SLAProps {}
const SLA = (props: SLAProps) => {
  const [items, setItems] = useState<SLA[]>([]);
  const [viewItem, setViewItem] = useState<SLA | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useSLASetting();
  const { mUpdate } = useSLAMutation();
  const theme = useTheme();
  const { t } = useTranslation();

  const onClose = () => {
    setViewItem(null);
    setIsOpen(false);
  };

  const onSave = (newItems: SLA[], callback?: any, type?: string) => {
    const nSetting = {
      menu: 'desk',
      key: 'sla',
      value: JSON.stringify(newItems)
    };
    mUpdate.mutate(
      { menuSetting: nSetting },
      {
        onSuccess() {
          refetch();
        }
      }
    );
    callback && callback();
  };
  const onSetDefault = (row: SLA) => {
    const newItems = items.map((item: SLA) => {
      let isDefault = false;
      if (item.sla == row.sla) {
        isDefault = true;
      }
      return {
        ...item,
        isDefault: isDefault
      };
    });
    setItems(newItems);
    onSave(newItems);
  };
  const onUpdateCustomers = (row: SLA) => {
    const newItems = items.map((item: SLA) => {
      if (item.sla == row.sla) {
        return row;
      }
      return {
        ...item
      };
    });
    setItems(newItems);
    onSave(newItems, () => {
      onClose();
    });
  };

  useEffect(() => {
    if (!isLoading && data?.value) {
      try {
        const slas: SLA[] = JSON.parse(data.value);
        setItems(slas);
      } catch (err: any) {}
    }
  }, [data]);

  return (
    <Section header={t('ncrm_preferences_desk_service_level_agreement')}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', padding: '12px' }}>
        <Table>
          <TableHead sx={{ borderTop: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell>{t('ncrm_generalsetting_preferences_desk_name')}</TableCell>
              <TableCell>{t('ncrm_generalsetting_default')}</TableCell>
              <TableCell>{t('ncrm_generalsetting_preferences_desk_customers')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ pading: 1 }}>
                  <SpanLang keyLang={SLA_LANGS[item.sla]} />
                </TableCell>
                <TableCell sx={{ pading: 1 }}>
                  <Radio
                    checked={item.isDefault}
                    onChange={() => {
                      onSetDefault(item);
                    }}
                  />
                </TableCell>
                <TableCell sx={{ pading: 1 }}>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => {
                      setIsOpen(true);
                      setViewItem(item);
                    }}
                  >
                    {t('ncrm_generalsetting_preferences_desk_view')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpen && (
        <>
          <ViewCustomer open={isOpen} onClose={onClose} onSave={onUpdateCustomers} data={viewItem} />
        </>
      )}
    </Section>
  );
};

export default SLA;
