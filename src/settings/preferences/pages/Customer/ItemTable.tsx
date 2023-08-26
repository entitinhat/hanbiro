import { useMemo, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
//material
import { ButtonGroup, Radio, Stack } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

//project
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import IconButton from '@base/components/@extended/IconButton';

interface ItemTableProps {
  items: any[];
  onChange: (id: string, keyName: string, keyValue: string) => void;
  onDelete?: (val: any) => void;
  onEdit?: (val: any) => void;
  keyRoot: string;
}

const ItemTable = (props: ItemTableProps) => {
  const { items = [], onChange, onDelete, onEdit, keyRoot } = props;
  const [rowHover, setRowHover] = useState<string | undefined>(undefined);

  const { t } = useTranslation();
  //table column cell render
  const getMapColumns = () => {
    return {
      languageKey(col: string, data: any) {
        return (
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* {selectedItem?.id === data.id ? renderEditForm(selectedItem) : <SpanLang keyLang={data[col]} />} */}
            <SpanLang keyLang={data[col]} />
          </Stack>
        );
      },
      isDefault(col: string, data: any) {
        return (
          <Stack
            direction={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            // sx={{
            //   '&:hover #btn-group-edit': {
            //     visibility: 'visible'
            //   }
            // }}
          >
            <Radio
              sx={{ ml: '24px' }}
              id={'radio-' + data.id}
              checked={data[col]}
              onChange={(e: any) => onChange(data.id, 'isDefault', e.target.checked)}
            />
            <ButtonGroup id="btn-group-edit" sx={{ visibility: rowHover === data?.id ? 'visible' : 'hidden' }}>
              <IconButton
                size="small"
                aria-label="edit"
                color="inherit"
                onClick={(event: any) => {
                  event.stopPropagation();
                  onEdit && onEdit(data);
                }}
              >
                <EditOutlined fontSize="small" color="primary" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={(event: any) => {
                  event.stopPropagation();
                  onDelete && onDelete(data);
                }}
              >
                <DeleteOutline fontSize="small" color="error" />
              </IconButton>
            </ButtonGroup>
          </Stack>
        );
      }
    };
  };

  //table props
  // const fields = useMemo(() => {
  //   return [
  //     { languageKey: t('ncrm_generalsetting_preferences_product_name'), keyName: 'languageKey', enableSorting: false, width: '80%' },
  //     { languageKey: t('ncrm_generalsetting_default'), keyName: 'isDefault', enableSorting: false, width: '20%' }
  //   ];
  // }, []);

  let fields = [
    { languageKey: t('ncrm_generalsetting_preferences_product_name'), keyName: 'languageKey', enableSorting: false, width: '80%' },
    { languageKey: t('ncrm_generalsetting_default'), keyName: 'isDefault', enableSorting: false, width: '20%' }
  ];

  switch (keyRoot) {
    case 'customer_rating':
      fields = [
        { languageKey: t('Rating'), keyName: 'languageKey', enableSorting: false, width: '80%' },
        { languageKey: t('ncrm_generalsetting_default'), keyName: 'isDefault', enableSorting: false, width: '20%' }
      ];
      break;

    case 'employee_role':
      fields = [
        { languageKey: t('Employee Role'), keyName: 'languageKey', enableSorting: false, width: '80%' },
        { languageKey: t('ncrm_generalsetting_default'), keyName: 'isDefault', enableSorting: false, width: '20%' }
      ];
      break;

    case 'job_position':
      fields = [
        { languageKey: t('Job title'), keyName: 'languageKey', enableSorting: false, width: '80%' },
        { languageKey: t('ncrm_generalsetting_default'), keyName: 'isDefault', enableSorting: false, width: '20%' }
      ];
      break;
  }

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'moveicon',
        width: '24px',
        minWidth: '24px',
        minSize: 8,
        size: 32,
        header: ({ table }) => <></>,
        cell: ({ row }) => (
          <DragIndicatorIcon
            sx={{ cursor: 'move', p: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 16 }}
            fontSize="small"
          />
        )
      },
      ,
      ...makeTable8Columns(fields, getMapColumns(), { category: '' }, [])
    ],
    [fields, onChange]
  );

  const handleRowHover = (item: any) => {
    setRowHover(item?.id);
  };

  return (
    <>
      <ReactTable8 columns={columns} data={[...items]} paging={{ pageSize: 100 }} isDraggable setRowHover={handleRowHover} />
    </>
  );
};

export default ItemTable;
