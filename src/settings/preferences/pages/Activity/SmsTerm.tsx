import React, { ReactNode, useEffect, useMemo, useState } from 'react';

//material
import { useTheme } from '@mui/material/styles';
import { RadioGroup, Box, Button, ButtonGroup, FormControlLabel, Radio, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { AddOutlined, DeleteOutline } from '@mui/icons-material';

//project
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import IconButton from '@base/components/@extended/IconButton';
import { LabelValue } from '@base/types/app';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { User } from '@base/types/user';
import { useTranslation } from 'react-i18next';
import { Chip } from '@mui/material';
import SenderNumberVerificationCompany from '@settings/preferences/containers/SenderNumberVerificationCompany';
import SenderNumberVerificationMobile from '@settings/preferences/containers/SenderNumberVerificationMobile';
import useDevice from '@base/hooks/useDevice';

const TABS: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_preferences_activity_company_phone_number',
    value: 'company'
  },
  {
    label: 'ncrm_generalsetting_preferences_activity_personal_mobile_number',
    value: 'individual'
  }
];

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`activity-email-tabpanel-${index}`}
      aria-labelledby={`activity-email-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface ItemTableProps {
  phones: any[];
  mobiles: any[];
  onChange: (type: string, data: any[]) => void;
  onAdd?: (type: string) => void;
}
//const rerender = React.useReducer(() => ({}), {})[1]; //force rerender

const SmsTerm = (props: ItemTableProps) => {
  const { phones = [], mobiles = [], onChange, onAdd } = props;
  //  const { onChange, onAdd } = props;
  const { isMobile, isDesktop } = useDevice();

  // Fake data in Phones & Mobiles
  //const [phones, setPhones] = useState(phoneDataFake);
  //const [mobiles, setMobiles] = useState(mobileDataFake);

  const theme = useTheme();
  const { t } = useTranslation();

  //state

  const [defaultNumber, setDefaultNumber] = useState(localStorage.getItem('defaultNumber') || '0');
  const [activeTab, setActiveTab] = useState<number>(parseInt(defaultNumber));

  useEffect(() => {
    if (defaultNumber) {
      localStorage.setItem('defaultNumber', defaultNumber);
    }
  }, [defaultNumber]);

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Give our default column cell renderer editing superpowers!
  const companyEditableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('table', table);
      //console.log('column id', id);
      const initialValue = getValue();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue || '');
      console.log('🚀 ~ file: SmsTerm.tsx:136 ~ SmsTerm ~ value:', value);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      const [isOpenComment, setIsOpenComment] = useState(false);

      return (
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems={'center'}
          sx={{
            '&:hover #btn-group-edit': {
              display: 'block'
            }
          }}
        >
          {id == 'number' && (
            <TextField
              autoFocus
              type={id === 'number' ? 'number' : 'text'}
              variant="standard"
              fullWidth
              multiline
              placeholder={t('ncrm_generalsetting_preferences_type_number') as string}
              InputProps={{
                disableUnderline: true
              }}
              sx={{
                '& .MuiInputBase-root.Mui-focused': {
                  border: `1px solid ${theme.palette.primary[400]}`,
                  borderRadius: 1,
                  p: 0.5
                }
              }}
              value={value as string}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
            />
          )}
          {id == 'status' && value == 'Verified' && (
            <Chip
              sx={{
                color: theme.palette.success.main,
                backgroundColor: theme.palette.success.lighter
              }}
              key={1}
              // label={t('Verified')}
              label={value as string}
              size="small"
            />
          )}
          {id == 'status' && value != 'Verified' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Chip
                sx={{
                  color: theme.palette.grey[800],
                  backgroundColor: theme.palette.grey[100]
                }}
                key={1}
                label={t('ncrm_generalsetting_preferences_status_unverified')}
                size="small"
              />
              <Button variant="contained" onClick={() => setIsOpenComment(true)} color="success" sx={{ py: 0.5, mt: 1 }} size="small">
                {t('ncrm_generalsetting_preferences_verify_number')}
              </Button>
            </Box>
          )}
          {isOpenComment && (
            <SenderNumberVerificationCompany
              //ticketId
              title={'ncrm_generalsetting_preferences_sender_number_verification'} //New Comment
              menuSource={'123123'}
              isOpen={isOpenComment}
              onClose={() => setIsOpenComment(false)}
              // onReload={refetch}
              ticketId={'123'}
              ticketName={'123'}
            />
          )}
          {id == 'description' && (
            <TextField
              //type={id === 'number' ? 'number' : 'text'}
              variant="standard"
              fullWidth
              multiline
              InputProps={{
                disableUnderline: true
              }}
              sx={{
                '& .MuiInputBase-root.Mui-focused': {
                  border: `1px solid ${theme.palette.primary[400]}`,
                  borderRadius: 1,
                  p: 0.5
                }
              }}
              value={value as string}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
            />
          )}
          {id == 'isDefault' && (
            <>
              <Radio
                id={`${index}-${id}`}
                checked={(value as boolean) || false}
                onChange={(e) => {
                  setValue(e.target.checked);
                  //update current index to true, others are false
                  const newData = [...table.options.data];
                  newData.map((_row: any, _otherIdx: number) => {
                    if (_otherIdx !== index) {
                      newData[_otherIdx].isDefault = false;
                    } else {
                      newData[index].isDefault = true;
                    }
                  });
                  table.options.meta?.updateTableData(newData);
                }}
              />
              <ButtonGroup id="btn-group-edit" sx={{ display: 'none' }}>
                <IconButton
                  size="small"
                  aria-label="delete"
                  color="error"
                  onClick={(event: any) => {
                    event.stopPropagation();
                    table.options.meta?.removeTableRow(index, id);
                  }}
                >
                  <DeleteOutline fontSize="small" color="error" />
                </IconButton>
              </ButtonGroup>
            </>
          )}
        </Stack>
      );
    }
  };

  // Give our default column cell renderer editing superpowers!
  const individualEditableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('row index', index);
      //console.log('column id', id);
      const initialValue = getValue();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue || '');

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      const [isOpenComment, setIsOpenComment] = useState(false);

      return (
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems={'center'}
          sx={{
            '&:hover #btn-group-edit': {
              display: 'block'
            }
          }}
        >
          {id == 'user' && (
            <>
              <UserAutoComplete
                single={true}
                showAvatar={true}
                placeholder={t('ncrm_generalsetting_preferences_user_select') as string}
                value={value}
                onChange={(newUser: any) => {
                  setValue(newUser);
                  //update
                  table.options.meta?.updateCellData(index, id, newUser);
                }}
              />
            </>
          )}
          {id == 'number' && (
            <>
              <TextField
                // type={id === 'number' ? 'number' : 'text'}
                autoFocus
                variant="standard"
                placeholder={t('ncrm_generalsetting_preferences_type_number') as string}
                fullWidth
                multiline
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  '& .MuiInputBase-root.Mui-focused': {
                    border: `1px solid ${theme.palette.primary[400]}`,
                    borderRadius: 1,
                    p: 0.5
                  }
                }}
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
            </>
          )}
          {id == 'description' && (
            <>
              <TextField
                // type={id === 'number' ? 'number' : 'text'}
                variant="standard"
                multiline
                InputProps={{
                  disableUnderline: true
                }}
                sx={{
                  width: '90%',
                  '& .MuiInputBase-root.Mui-focused': {
                    border: `1px solid ${theme.palette.primary[400]}`,
                    borderRadius: 1,
                    p: 0.5
                  }
                }}
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
              />
              <ButtonGroup id="btn-group-edit" sx={{ display: 'none' }}>
                <IconButton
                  size="small"
                  aria-label="delete"
                  color="error"
                  onClick={(event: any) => {
                    event.stopPropagation();
                    table.options.meta?.removeTableRow(index, id);
                  }}
                >
                  <DeleteOutline fontSize="small" color="error" />
                </IconButton>
              </ButtonGroup>
            </>
          )}
          {id == 'status' && value == 'Verified' && (
            <Chip
              sx={{
                color: value == 'Verified' ? theme.palette.success.main : theme.palette.grey[800],
                backgroundColor: value == 'Verified' ? theme.palette.success.lighter : theme.palette.grey[100]
              }}
              key={1}
              // label={t('Verified')}
              label={t('ncrm_generalsetting_preferences_status_verified')}
              size="small"
            />
          )}
          {id == 'status' && value != 'Verified' && (
            // <Stack spacing={1} marginY={0.5} paddingX={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Chip
                sx={{
                  color: theme.palette.grey[800],
                  backgroundColor: theme.palette.grey[100]
                }}
                key={1}
                label={t('ncrm_generalsetting_preferences_status_unverified')}
                size="small"
              />
              <Button variant="contained" onClick={() => setIsOpenComment(true)} color="success" sx={{ py: 0.5, mt: 1 }} size="small">
                {t('ncrm_generalsetting_preferences_verify_number')}
              </Button>
            </Box>
            //</Stack>
          )}
          {isOpenComment && (
            <SenderNumberVerificationMobile
              //ticketId
              title={'ncrm_generalsetting_preferences_sender_number_verification'} //New Comment
              menuSource={'123123'}
              isOpen={isOpenComment}
              onClose={() => setIsOpenComment(false)}
              // onReload={refetch}
              ticketId={'123'}
              ticketName={'123'}
            />
          )}
          {id == 'isDefault' && (
            <>
              <Radio
                id={`${index}-${id}`}
                checked={(value as boolean) || false}
                onChange={(e) => {
                  setValue(e.target.checked);
                  //update current index to true, others are false
                  const newData = [...table.options.data];
                  newData.map((_row: any, _otherIdx: number) => {
                    if (_otherIdx !== index) {
                      newData[_otherIdx].isDefault = false;
                    } else {
                      newData[index].isDefault = true;
                    }
                  });
                  table.options.meta?.updateTableData(newData);
                }}
              />
            </>
          )}
        </Stack>
      );
    }
  };

  //build columns - company
  const companyColumns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'number',
        maxWidth: '42%',
        header: () => <div>{t('ncrm_generalsetting_preferences_activity_phone_number')}</div>
      },
      {
        accessorKey: 'status',
        width: '8%',
        header: () => <span>{t('ncrm_generalsetting_preferences_status')}</span>
      },
      {
        maxWidth: '42%',
        accessorKey: 'description',
        header: () => <div>{t('ncrm_generalsetting_preferences_description')}</div>
      },
      {
        accessorKey: 'isDefault',
        width: '8%',
        header: () => <span>{t('ncrm_generalsetting_default')}</span>
      }
    ],
    []
  );

  //build columns - personal
  const individualColumns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'user',
        maxWidth: '32%',
        header: () => <div>{t('ncrm_generalsetting_preferences_user_name')}</div>
      },
      {
        accessorKey: 'number',
        maxWidth: '32%',
        header: () => <div>{t('ncrm_generalsetting_preferences_activity_phone_number')}</div>
      },
      {
        accessorKey: 'status',
        width: '4%',
        header: () => <span>{t('ncrm_generalsetting_preferences_status')}</span>
      },
      {
        accessorKey: 'description',
        maxWidth: '32%',
        header: () => <div>{t('ncrm_generalsetting_preferences_description')}</div>
      }
    ],
    []
  );

  return (
    <>
      <Box padding={1} marginBottom={7} marginTop={2}>
        <Typography>{t('ncrm_generalsetting_preferences_default_sender_number')}</Typography>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={defaultNumber}
          name="radio-buttons-group"
          onChange={(e) => {
            setActiveTab(Number(e.target.value));
            setDefaultNumber(e.target.value);
          }}
        >
          <FormControlLabel
            sx={{ width: '210px' }}
            value={0}
            control={<Radio />}
            label={t('ncrm_generalsetting_preferences_activity_company_phone_number')}
          />
          <FormControlLabel value={1} control={<Radio />} label={t('ncrm_generalsetting_preferences_activity_personal_mobile_number')} />
        </RadioGroup>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack spacing={2} sx={{ p: 1 }}>
          <Typography variant="subtitle1">{t('ncrm_generalsetting_preferences_activity_sender_number')}</Typography>
          <Typography variant="h6" sx={{ color: 'warning.main' }}>
            {t('ncrm_generalsetting_preferences_activity_sender_number_introduce')}
          </Typography>
        </Stack>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="activity componay individual tabs">
          {TABS.map((_tab: LabelValue, index: number) => (
            <Tab key={_tab.value} label={t(_tab.label)} id={`activity-sms-tab-${index}`} aria-controls={`activity-sms-tabpanel-${index}`} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <ReactEditable8
          editableColumn={companyEditableColumn}
          columns={companyColumns}
          data={[...phones]}
          setData={(newData: any) => onChange('company', newData)}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <ReactEditable8
          editableColumn={individualEditableColumn}
          columns={individualColumns}
          data={[...mobiles]}
          setData={(newData: any) => onChange('individual', newData)}
        />
      </TabPanel>
      <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={() => onAdd && onAdd(TABS[activeTab].value as string)}
        //disabled={showAdd}
      >
        <AddIcon fontSize="small" />
        <Box sx={{ paddingTop: '1px' }}>{t('ncrm_generalsetting_preferences_add_another_line')}</Box>
      </Button>
    </>
  );
};

export default SmsTerm;
