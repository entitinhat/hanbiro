import { useEffect, useMemo, useState } from 'react';
import * as keyNames from '@base/config/keyNames';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { Box, Button, Checkbox, InputLabel, Stack, Typography, useTheme } from '@mui/material';
import { getMapColumns } from './Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { Add, AddOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface DigitalContentTableProps {
  value: any[];
  onChange: any;
  isMulti: boolean;
  onDelete?: (fileIds: string[]) => void;
}

// export const

const DigitalContentTable = (props: DigitalContentTableProps) => {
  const { value, onChange, isMulti = false, onDelete } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const [items, setItems] = useState<any[]>([]);

  // const [initedValue, setInitedValue] = useState<boolean>(false);

  const onChangeValue = (newData?: any) => {
    onChange && onChange(newData?.filter((v: any) => !!!v?.isRowEmpty));
  };

  const handleDeleteItems = (id: string, fileId: string) => {
    setItems((prev: any) => {
      const newDataItems = [...prev].filter((v: any) => v?.file?.id !== fileId);

      onDelete && onDelete([id]);
      return newDataItems.map((v: any, i: number) => {
        if (v?.isRowEmpty) {
          return { ...v, rowIdx: i };
        } else {
          return v;
        }
      });
    });
  };

  const handleReplaceItemById = (oleFileId: string, newItems: any) => {
    let newUnexistedItems: any[] = [];
    let id = undefined;
    let fileId = undefined;
    setItems((prev: any) => {
      newUnexistedItems = newItems.filter((v: any) => {
        const existed = prev.find((item: any) => item?.file?.id === v?.file?.id);
        return !!!existed;
      });

      if (newUnexistedItems) {
        const index = prev.findIndex((v: any) => v?.file?.id === oleFileId);
        id = prev[index]?.id;
        fileId = prev[index]?.file?.id;

        const newDataItems = [...prev];

        newDataItems.splice(index, 1, ...newUnexistedItems.map((v: any) => ({ ...v, isRowEmpty: true })));

        return newDataItems.map((v: any, i: number) => {
          if (v?.isRowEmpty) {
            return { ...v, rowIdx: i };
          } else {
            return v;
          }
        });
      }

      return prev;
    });
    if (id && fileId) {
      handleDeleteItems(id, oleFileId);
    }
    newUnexistedItems && onChangeValue(newUnexistedItems);
  };

  const handleReplaceItemByRowIndex = (rowIndex: number, newItems: any) => {
    let newUnexistedItems: any[] = [];

    setItems((prev: any) => {
      newUnexistedItems = newItems.filter((v: any) => {
        const existed = prev.find((item: any) => item?.file?.id === v?.file?.id);
        return !!!existed;
      });
      if (newUnexistedItems) {
        const newPrev = [...prev];

        newPrev.splice(rowIndex, 1, ...newUnexistedItems.map((v: any) => ({ ...v, isRowEmpty: true })));

        return newPrev.map((v: any, i: number) => {
          if (v?.isRowEmpty) {
            return { ...v, rowIdx: i };
          } else {
            return v;
          }
        });
      }

      return prev;
    });
    newUnexistedItems && onChangeValue(newUnexistedItems);
  };

  const handleClearRow = (id: string) => {
    setItems((prev: any) => {
      const newPrev = [...prev];
      const rowIndex = newPrev.findIndex((v: any) => v?.file?.id === id);

      newPrev.splice(rowIndex, 1, {
        name: undefined,
        type: undefined,
        createdBy: undefined,
        updatedBy: undefined,
        isRowEmpty: true,
        rowIdx: rowIndex,
        file: {
          id: prev[rowIndex]?.file?.id
        },
        id: prev[rowIndex]?.id
      });

      return [...newPrev];
    });
  };

  const deleteAddRow = (rowIndex: number) => {
    let id = undefined;
    let fileId = undefined;
    setItems((prev) => {
      id = prev[rowIndex]?.id;
      fileId = prev[rowIndex]?.file?.id;
      const newItems = [...prev];
      newItems.splice(rowIndex, 1);

      return [...newItems].map((v: any, i: number) => {
        if (v?.isRowEmpty) {
          return { ...v, rowIdx: i };
        } else {
          return v;
        }
      });
    });

    if (id && fileId) {
      handleDeleteItems(id, fileId);
    }
  };

  useEffect(() => {
    if (value && value?.length > 0) {
      if (items.length === 0) {
        setItems(value);
        return;
      }

      // check exist new data
      const existedNewData = value.find((v: any) => !items.find((item) => !item?.isRowEmpty && item?.file?.id === v?.file?.id));
      if (existedNewData) {
        const newItems = items.map((v: any) => {
          const newItem = value.find((valueItem: any) => valueItem?.file?.id === v?.file?.id);
          if (newItem) {
            return newItem;
          } else {
            return v;
          }
        });
        setItems(newItems);
      }
    } else {
      setItems([]);
    }

    // ============================= Old init value ==============================

    // if (items.length === 0 && value?.length > 0) {
    //   setItems(value);
    //   return;
    // }

    // if (value) {
    //   const newItems = items.map((v: any) => {
    //     const newItem = value.find((valueItem: any) => valueItem?.file?.id === v?.file?.id);
    //     if (newItem) {
    //       return newItem;
    //     } else {
    //       return v;
    //     }
    //   });
    //   setItems(newItems);
    // }
  }, [JSON.stringify(value)]);

  //table props
  const fields = useMemo(() => {
    return [
      { languageKey: 'Name', keyName: keyNames.KEY_NAME_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Type', keyName: keyNames.KEY_NAME_TYPE, enableSorting: false, width: 'auto' },
      { languageKey: 'Created On', keyName: keyNames.KEY_NAME_CREATED_AT, enableSorting: false, width: 'auto' },
      { languageKey: 'Created By', keyName: keyNames.KEY_NAME_CREATED_BY, enableSorting: false, width: 'auto' },
      { languageKey: '', keyName: keyNames.KEY_NAME_DELETE, enableSorting: false, width: 'auto' }
    ];
  }, []);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      ...makeTable8Columns(
        fields,
        getMapColumns(),
        { isMulti, handleDeleteItems, deleteAddRow, handleReplaceItemById, handleClearRow, handleReplaceItemByRowIndex },
        []
      )
    ],
    [fields]
  );

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items || [],
      columns: columns,
      sx: { p: 0, mb: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns]);

  const handleAddLine = () => {
    setItems((prev: any) => [
      ...prev,
      {
        name: undefined,
        type: undefined,
        createdBy: undefined,
        updatedBy: undefined,
        isRowEmpty: true,
        rowIdx: prev.length
      }
    ]);
    // setShowAdd(false);
  };

  return (
    <Stack sx={{ border: `1px solid ${theme.palette.divider}` }}>
      <Stack direction="row" alignItems="center" sx={{ pl: 3, height: 49, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle1">Files</Typography>
      </Stack>
      {TableMemo}
      <Stack direction="row" alignItems="center" sx={{ pl: 3, height: 49 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
          startIcon={<AddOutlined />}
          onClick={handleAddLine}
        >
          {t('Add another line')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default DigitalContentTable;
