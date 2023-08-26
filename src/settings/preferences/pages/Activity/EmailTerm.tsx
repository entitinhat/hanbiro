import React, { ReactNode, useState } from 'react';

//material
import { useTheme } from '@mui/material/styles';
import { Box, Button, ButtonGroup, Stack, Tab, Tabs, TextField, Typography, Grid } from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';

//project
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import IconButton from '@base/components/@extended/IconButton';
import { LabelValue } from '@base/types/app';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

const TABS: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_preferences_activity_email_address',
    value: 'email'
  },
  {
    label: 'ncrm_generalsetting_preferences_activity_domain',
    value: 'domain'
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
  emails: any[];
  domains: any[];
  onChange: (type: string, data: any[]) => void;
  onAdd?: (type: string) => void;
}
//const rerender = React.useReducer(() => ({}), {})[1]; //force rerender

const EmailTerm = (props: ItemTableProps) => {
  const { emails = [], domains = [], onChange, onAdd } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  //state
  const [activeTab, setActiveTab] = useState<number>(0);

  //tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Give our default column cell renderer editing superpowers!
  const editableColumn: Partial<ColumnDef<any>> = {
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
          {id === 'email' && (
            <TextField
              autoFocus // Add focus for email field
              placeholder={t('ncrm_generalsetting_preferences_activity_placeholder_email') as string}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                multiline: true // Set multiline to show long text
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
          {id === 'domain' && (
            <TextField
              autoFocus // Add focus for domain field
              placeholder={t('ncrm_generalsetting_preferences_activity_placeholder_domain') as string}
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true,
                multiline: true // Set multiline to show long text
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
          {id === 'description' && (
            <>
              <TextField
                placeholder={t('ncrm_generalsetting_preferences_activity_placeholder_description') as string}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  multiline: true // Set multiline to show long text
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

  //build columns for table v8
  const emailColumns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'email',
        header: () => <span>{t('ncrm_generalsetting_preferences_activity_email_address')}</span>
      },
      {
        accessorKey: 'description',
        header: () => <span>{t('ncrm_generalsetting_preferences_description')}</span>
      }
    ],
    []
  );

  const domainColumns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'domain',
        header: () => <span>{t('ncrm_generalsetting_preferences_activity_domain_address')}</span>
      },
      {
        accessorKey: 'description',
        header: () => <span>{t('ncrm_generalsetting_preferences_description')}</span>
      }
    ],
    []
  );

  // Show total items
  const total = (TABS[activeTab].value as string) === 'email' ? emails.length ?? 0 : domains.length ?? 0;

  return (
    <Box sx={{ border: 1, borderColor: 'divider' }}>
      <Stack spacing={2} sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h5">{t('ncrm_generalsetting_preferences_activity_excluded_email')}</Typography>
        <Typography variant="h6" sx={{ color: 'warning.main' }}>
          {t('ncrm_generalsetting_preferences_activity_excluded_email_introduce')}
        </Typography>
      </Stack>
      <Box>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="activity email domain tabs">
          {TABS.map((_tab: LabelValue, index: number) => (
            <Tab
              key={_tab.value}
              label={t(_tab.label)}
              id={`activity-email-tab-${index}`}
              aria-controls={`activity-email-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={activeTab} index={0}>
          <ReactEditable8
            editableColumn={editableColumn}
            columns={emailColumns}
            data={[...emails]}
            setData={(newData: any) => onChange('email', newData)}
            sx={{
              '& .MuiTableCell-root': { p: 2 }
            }}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ReactEditable8
            editableColumn={editableColumn}
            columns={domainColumns}
            data={[...domains]}
            setData={(newData: any) => onChange('domain', newData)}
            sx={{
              '& .MuiTableCell-root': { p: 2 }
            }}
          />
        </TabPanel>
      </Box>

      <Grid container>
        <Grid item xs={6}>
          <Button
            size="small"
            variant="contained"
            startIcon={<Add />}
            sx={{ m: 1 }}
            onClick={() => onAdd && onAdd(TABS[activeTab].value as string)}
          >
            {t('ncrm_common_btn_add_another_line')}
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>
            {t('ncrm_common_total_items')}: {total}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailTerm;
