import { useCallback, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';

//menu
import * as keyNames from '@customer/config/keyNames';
import { getMapColumns } from '@customer/pages/ListPage/Helper';

//material
import { Box, Checkbox } from '@mui/material';

//project
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { useRecoilValue } from 'recoil';
import { selectionFieldsAtom } from '@base/store/atoms';

const DuplicateTable = (props: any) => {
  const { category, isLoading, items = [], selectedIds, setSelectedIds } = props;
  const selectionFields = useRecoilValue(selectionFieldsAtom);
  //const defaultCurrency: Currency = useRecoilValue(defaultCurrencySelector);

  //table props
  const fields = useMemo(() => {
    if (category === 'account') {
      return [
        { languageKey: 'Account Name', keyName: keyNames.KEY_NAME_CUSTOMER_NAME, enableSorting: false, width: 'auto' },
        { languageKey: 'Customer Type', keyName: keyNames.KEY_NAME_CUSTOMER_TYPE, enableSorting: false, width: 'auto' },
        { languageKey: 'Email', keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, enableSorting: false, width: 'auto' },
        { languageKey: 'Phone', keyName: keyNames.KEY_NAME_CUSTOMER_PHONES, enableSorting: false, width: 'auto' }
      ];
    } else {
      return [
        { languageKey: 'Contact Name', keyName: keyNames.KEY_NAME_CUSTOMER_NAME, enableSorting: false, width: 'auto' },
        { languageKey: 'Customer Type', keyName: keyNames.KEY_NAME_CUSTOMER_TYPE, enableSorting: false, width: 'auto' },
        { languageKey: 'Email', keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, enableSorting: false, width: 'auto' },
        { languageKey: 'Phone', keyName: keyNames.KEY_NAME_CUSTOMER_PHONES, enableSorting: false, width: 'auto' },
        { languageKey: 'Related Account', keyName: keyNames.KEY_NAME_CUSTOMER_ACCOUNT, enableSorting: false, width: 'auto' }
      ];
    }
  }, [category]);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              color: 'secondary',
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              color: 'secondary',
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      ...makeTable8Columns(fields, getMapColumns(category, selectionFields), { category }, [])
    ],
    [fields, selectedIds]
  );

  //for react-table v8
  const handleCheckTableItem = (checkedValue: any[]) => {
    setSelectedIds(checkedValue);
  };

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <ReactTable8
        columns={columns}
        data={items}
        paging={{ pageSize: items.length || 20 }}
        rowSelected={selectedIds}
        onRowSelect={handleCheckTableItem}
      />
    </>
  );
};

export default DuplicateTable;
