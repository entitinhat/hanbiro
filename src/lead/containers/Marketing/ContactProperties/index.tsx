import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import MainCard from '@base/components/App/MainCard';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

import WritePage from './Write';
import { TableFields } from '../json';

interface ContactPropertiesProps {
  menuSourceId: string;
  value: any;
}
const ContactProperties = (props: ContactPropertiesProps) => {
  const { menuSourceId, value } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  //state
  const [items, setItems] = useState<TableFields[]>(value || []);
  const [isOpenWrite, setIsOpenWrite] = useState<boolean>(false);

  // Give our default column cell renderer editing superpowers!
  const editableColumn = useMemo<Partial<ColumnDef<any>>>(
    () => ({
      cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
        const initialValue = getValue();
        useEffect(() => {
          if (initialValue) setValue(initialValue);
        }, [initialValue]);

        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState<any>();

        switch (id) {
          case 'buyingRole':
            return(
              <Typography noWrap>{value?.name}</Typography>
            );
          case 'phones':
            return (<ListTableCellDroplist
                      showAvatar={false}
                      values={value?.map((item: any) => { return { ...item, name: item.phoneNumber } }) || []}
                    />);
          case 'mobiles':
            return (<ListTableCellDroplist
              showAvatar={false}
              values={value?.map((item: any) => {
                return { ...item, name: item.mobileNumber };
              }) || []}
            />);
          case 'emails':
            return (<ListTableCellDroplist
              showAvatar={false}
              values={value?.map((item: any) => {
                return { ...item, name: item.email };
              }) || []}
            />);
          case 'jobPosition':
            return (<Typography>{value?.keyName}</Typography>)
          default:
            return (<Typography>{value}</Typography>);
        }
      }
    }),
    [items]
  );

  //build columns - company
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name',
        minWidth: '130px',
        header: () => <SpanLang textOnly keyLang={'identify_contact_field_basic_name'} />
      },
      {
        accessorKey: 'buyingRole',
        header: () => <SpanLang textOnly keyLang={'identify_contact_field_basic_buyingrole'} />
      },
      {
        accessorKey: 'phones',
        header: () => <SpanLang textOnly keyLang={'identify_contact_field_basic_phones'} />
      },
      {
        accessorKey: 'mobiles',
        header: () => <SpanLang textOnly keyLang={'identify_contact_field_basic_mobiles'} />
      },
      {
        accessorKey: 'emails',
        header: () => <SpanLang textOnly keyLang={'identify_contact_field_basic_emails'} />
      },
      {
        accessorKey: 'jobPosition',
        header: () => <SpanLang textOnly keyLang={'identify_contact_field_basic_job'} />
      }
      // {
      //   accessorKey: 'action',
      //   width: '5%',
      //   header: () => <></>
      // }
    ],
    []
  );

  //table data change
  const handleDataChange = (newData: TableFields[]) => {
    setItems([...newData]);
  };

  return (
    <MainCard
      border={false}
      contentSX={{ p: 0, pb: '0px !important' }}
      headerSX={{ p: '8px 16px', height: '50px' }}
      title={<SpanLang keyLang={'ncrm_common_identify_contact_properties'} textOnly />}
      secondary={
        <Box sx={{ ml: 'auto', mr: 0.5 }}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" size={'small'} color="primary" startIcon={<AddIcon />} onClick={()=>  setIsOpenWrite(true)}>
              <SpanLang keyLang={'ncrm_common_btn_add'} textOnly />
            </Button>
          </Stack>
        </Box>
      }
    >
      <Grid sx={{ width: 'auto' }}>
        <ReactEditable8
          editableColumn={editableColumn}
          columns={columns}
          data={[...items]}
          setData={() => null}
          sx={{
            border: 'none',
            ' .MuiTableCell-head': {
              fontWeight: theme.typography.fontWeightRegular
            }
          }}
        />
      </Grid>
      {isOpenWrite && (
        <WritePage
          id={menuSourceId}
          value={''}
          isOpen={isOpenWrite}
          onClose={(formData: TableFields) => {
            if (formData.name) {
              setItems([...items, formData]);
            }
            setIsOpenWrite(false);
          }}
        />
      )}
    </MainCard>
  );
};
export default ContactProperties;
