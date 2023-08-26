import React, { useEffect, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import _ from 'lodash';

//material
import { AddOutlined, DeleteOutline } from '@mui/icons-material';
import { Button, IconButton, TextField, useTheme } from '@mui/material';

//project
import SingleFileUpload from '@base/components/@hanbiro/Dropzone/SingleFile';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import MainCard from '@base/components/App/MainCard';
import { MENU_QUOTE } from '@base/config/menus';
//import { CustomFile } from '@base/types/dropzone';
import { User } from '@base/types/user';
import { generateUUID } from '@base/utils/helpers';

//related menu
import ItemAutoComplete from '@product/item/containers/ItemAutoComplete';
import { Item } from '@product/item/types/item';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

//menu
import { useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import { KEY_QUOTE_ATTACHMENT } from '../Quote';
import { useTranslation } from 'react-i18next';

export interface QuoteAttachment {
  id: string;
  uploadFile: any;
  uploadId: '';
  description: string;
  createdBy: User | null;
  includedItem: Item[];
  excludedItem: Item[];
}

interface AttachmentProps {
  defaultValue: QuoteAttachment[];
}

const Attachment = (props: AttachmentProps) => {
  const { defaultValue } = props;
  //state
  const [items, setItems] = useState<QuoteAttachment[]>(defaultValue);
  //hook
  const theme = useTheme();
  const { t } = useTranslation();

  const mSettingUpdate = useMenuSettingUpdate();

  //init data
  useEffect(() => {
    if (!_.isEqual(items, defaultValue)) {
      setItems(defaultValue);
    }
  }, [defaultValue]);

  //save item
  const handleSave = (newData: QuoteAttachment[]) => {
    //TODO:
    //1. upload file --> get upload id
    //2. set upload id to newData, remove file
    const saveData = newData.map((_ele: any) => ({
      ..._ele,
      uploadFile: _ele.uploadFile?.map((_file: any) => ({ name: _file.name, size: _file.size, type: _file.type }))
    }));
    //3. save
    const params: any = {
      menu: MENU_QUOTE,
      key: KEY_QUOTE_ATTACHMENT,
      value: JSON.stringify(saveData)
    };
    mSettingUpdate.mutate({ menuSetting: params });
  };

  // Give our default column cell renderer editing superpowers!
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('table', table);
      //console.log('column id', id);
      const initialValue = getValue();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState<any>(initialValue || '');

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      switch (id) {
        case 'uploadFile':
          return (
            <SingleFileUpload
              sx={{ padding: 0, borderColor: theme.palette.secondary.light, minWidth: '150px' }}
              simplePlaceholder={true}
              file={value}
              setFieldValue={(field: string, file: any) => {
                setValue(file);
                //update table
                table.options.meta?.updateCellData(index, id, file);
              }}
            />
          );
        case 'description':
          return (
            <TextField
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true
              }}
              sx={{
                minWidth: '150px',
                '& .MuiInputBase-root.Mui-focused': {
                  border: `1px solid ${theme.palette.primary[400]}`,
                  borderRadius: 1,
                  p: 0.5
                }
              }}
              placeholder={id}
              value={value as string}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
            />
          );
        case 'createdBy':
          return (
            <UserAutoComplete
              value={value}
              onChange={(newVal) => {
                setValue(newVal);
                table.options.meta?.updateCellData(index, id, newVal);
              }}
            />
          );
        case 'includedItem':
        case 'excludedItem':
          return (
            <ItemAutoComplete
              //single={true}
              value={value || []}
              onChange={(newVal) => {
                setValue(newVal);
                table.options.meta?.updateCellData(index, id, newVal);
              }}
            />
          );
        case 'action':
          return (
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
          );
      }
    }
  };

  //build columns - company
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'uploadFile',
        header: () => <span>{t('ncrm_generalsetting_preferences_quote_file_name')}</span>
      },
      {
        accessorKey: 'description',
        header: () => <span>{t('ncrm_generalsetting_preferences_quote_description')}</span>
      },
      {
        accessorKey: 'createdBy',
        header: () => <span>{t('ncrm_generalsetting_preferences_quote_created_by')}</span>
      },
      {
        accessorKey: 'includedItem',
        header: () => <span>{t('ncrm_generalsetting_preferences_quote_included_items')}</span>
      },
      {
        accessorKey: 'excludedItem',
        header: () => <span>{t('ncrm_generalsetting_preferences_quote_excluded_items')}</span>
      },
      {
        accessorKey: 'action',
        header: () => <span>{t('ncrm_generalsetting_preferences_quote_action')}</span>
      }
    ],
    []
  );

  //add new row
  const handleAddRow = () => {
    const defaultRow: QuoteAttachment = {
      id: generateUUID(),
      uploadFile: null,
      uploadId: '',
      description: '',
      createdBy: null,
      includedItem: [],
      excludedItem: []
    };
    setItems([...items, defaultRow]);
  };

  //table data change
  const handleDataChange = (newData: QuoteAttachment[]) => {
    setItems(newData);
    //save
    handleSave(newData);
  };

  //console.log('Attachments items', items);
  return (
    <MainCard title={t('ncrm_generalsetting_preferences_quote_attachments')}>
      <ReactEditable8 editableColumn={editableColumn} columns={columns} data={[...items]} setData={handleDataChange} />
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ lineHeight: '1.6', fontSize: '0.725rem', mt: 1 }}
        startIcon={<AddOutlined />}
        onClick={handleAddRow}
      >
        {t('Add another line')}
      </Button>
      {/* <Button size="small" color="primary" startIcon={<AddOutlined />} sx={{ mt: 1 }} onClick={handleAddRow}>
        {t('ncrm_generalsetting_preferences_quote_add_a_row')}
      </Button> */}
    </MainCard>
  );
};

export default Attachment;
