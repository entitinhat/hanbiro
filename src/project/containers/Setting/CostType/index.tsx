import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { removeItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add } from '@mui/icons-material';
import {
    Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme
} from '@mui/material';
import useSettingMutation from '@project/hooks/useSettingMutation';
import { Setting } from '@project/types/setting';
import Section from '@settings/preferences/components/Section';

import Item from './Item';

interface CostTypeProps {
  items: Setting[];
}

function CostType({ items }: CostTypeProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const [settings, setSettings] = useState(items);
  const { mutationDelete } = useSettingMutation({});

  const handleAdd = useCallback(() => {
    setSettings([
      ...settings,
      {
        id: uuidv4(),
        name: 'KRW',
        type: 'TYPE_COST',
        meta: {
          cost: 1
        },
        default: false,
        fixed: false,
        new: true
      }
    ]);
  }, [settings]);

  useEffect(() => {
    if (JSON.stringify(items) !== JSON.stringify(settings)) {
      setSettings(items);
    }
  }, [items]);

  const handleRemove = useCallback(
    (id: string, edit: boolean) => {
      const findIndex = settings.findIndex((v) => v.id == id);
      setSettings(removeItemAtIndex(settings, findIndex));

      if (edit) {
        // integrate with api
        mutationDelete({ id: id });
      }
    },
    [settings]
  );

  const handleChange = useCallback(
    (item: Setting) => {
      const newItems = settings.map((v) => {
        if (v.id == item.id) {
          return item;
        } else {
          return { ...v, default: item.default ? false : v.default };
        }
      });
      console.log('newItems', newItems, item);
      setSettings(newItems);
    },
    [settings]
  );

  return (
    <Section header={t('ncrm_common_cost_type')}>
      <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '20%', p: 0.5 }}>
                {t('ncrm_common_currency')}
              </TableCell>
              <TableCell align="right" component="th" sx={{ width: '50%', p: 0.5 }}>
                {t('ncrm_common_cost')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '10%', p: 0.5 }}>
                {t('ncrm_common_default')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%', p: 0.5 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settings?.map((item) => {
              return <Item key={item.id} item={item} handleChange={handleChange} handleRemove={handleRemove} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ m: 1, display: 'flex', flexDirction: 'flex-start' }}>
        <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={handleAdd}>
          {t('ncrm_common_add_a_line')}
        </Button>
      </Box>
    </Section>
  );
}

export default CostType;
