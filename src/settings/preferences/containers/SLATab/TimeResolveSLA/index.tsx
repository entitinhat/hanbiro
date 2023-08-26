import Section from '@settings/preferences/components/Section';
import useResolveSLAMutation from '@settings/preferences/hooks/desk/useResolveSLAMutation';
import { useResolveSLASetting } from '@settings/preferences/hooks/desk/useResolveSLASetting';
import React, { useEffect, useRef, useState } from 'react';
import {
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme
} from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

interface ResolveSLA {
  standardSla: string;
  premiumSla: number;
}

interface TimeResolveSLAProps {}
const TimeResolveSLA: React.FC<TimeResolveSLAProps> = (props: TimeResolveSLAProps) => {
  const { t } = useTranslation();

  const defaultData: ResolveSLA[] = [
    {
      standardSla: t('ncrm_generalsetting_preferences_desk_follwed_by_category'),
      premiumSla: 0
    }
  ];
  const [items, setItems] = useState<any[]>(defaultData);
  const { data, isLoading } = useResolveSLASetting();
  const { mUpdate } = useResolveSLAMutation();
  const theme = useTheme();

  const onSave = (nData: ResolveSLA) => {
    const nSetting = {
      menu: 'desk',
      key: 'resolve_sla',
      value: JSON.stringify(nData)
    };
    mUpdate.mutate({ menuSetting: nSetting });
  };

  const debouncedOnSave = useRef(
    _.debounce((newItems) => {
      onSave(newItems);
    }, 800)
  ).current;

  const onChangePremimuSLA = (nRow: ResolveSLA) => {
    debouncedOnSave(nRow);
  };

  useEffect(() => {
    if (!isLoading && data?.value) {
      try {
        const slas = JSON.parse(data.value);
        setItems([slas]);
      } catch (err: any) {}
    }
  }, [data]);

  return (
    <Section header={t('ncrm_generalsetting_preferences_desk_time_to_resolve_by_sla')}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', padding: '12px' }}>
        <Table>
          <TableHead sx={{ borderTop: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell>{t('ncrm_preferences_desk_standard_sla')}</TableCell>
              <TableCell sx={{ width: '50%' }}>{t('ncrm_preferences_desk_premium_sla')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: 0 }}>
            {items.map((item, idx) => {
              const itemStandardSla = item['0'];
              return (
                <TableRow key={idx}>
                  <TableCell sx={{ padding: 2, fontWeight: 400, fontSize: 12 }}>{itemStandardSla?.standardSla}</TableCell>
                  <TableCell sx={{ padding: 2 }}>
                    <Stack direction="row" alignItems="center">
                      <TextField
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            paddingRight: 0
                          },
                          ml: 1,
                          // input: { padding: 1 },
                          width: 250
                        }}
                        size="medium"
                        value={item.premiumSla || 0}
                        onChange={(e: any) => {
                          const newSla = e.target.value.trim();
                          if (!Number(newSla) && Number(newSla) !== 0) {
                            return;
                          }
                          const nRow: ResolveSLA = {
                            ...item,
                            premiumSla: newSla
                          };
                          setItems([nRow]);
                          onChangePremimuSLA(nRow);
                        }}
                        placeholder="Type text"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              sx={{
                                padding: '17px 14px',
                                backgroundColor: (theme) => theme.palette.divider,
                                borderTopRightRadius: (theme) => theme.shape.borderRadius + 'px',
                                borderBottomRightRadius: (theme) => theme.shape.borderRadius + 'px',
                                marginLeft: 'auto', // Căn phải
                                marginRight: 0 // Loại bỏ khoảng cách bên phải
                              }}
                              position="end"
                            >
                              <PercentIcon sx={{ fontSize: '22px' }} />
                            </InputAdornment>
                          )
                        }}
                        // type="number"
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default TimeResolveSLA;
