import React, { useEffect, useMemo, useState } from 'react';

//project
import { LABEL_VALUE_PRIMARY } from '@base/config/constant';
import { formatAddress } from '@base/utils/helpers/generalUtils';

//material
import { Box, Checkbox, Chip, InputLabel, Stack, Typography } from '@mui/material';

//menu
import * as keyNames from '@customer/config/keyNames';
import { ColumnDef } from '@tanstack/react-table';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';

interface MergeTableProps {
  category: string;
  isMergeAll?: boolean;
  value: any;
  master: any;
  onChange?: (val: any) => void;
  onMasterChange?: (val: any) => void;
}

const MergeTable = (props: MergeTableProps) => {
  const { category, isMergeAll = false, value = [], master, onChange, onMasterChange } = props;
  //state
  //const [mergeMaster, setMergeMaster] = useState<any>(null);
  const [mergeItems, setMergeItems] = useState<any>([]);
  const [selectedMasterId, setSelectedMasterId] = useState<string>('');

  //intial merge items
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(mergeItems)) {
        const newItems = value.map((_ele: any) => ({ ..._ele, mergeFields: [] }));
        setMergeItems(newItems);
      }
    } else {
      setMergeItems([]);
    }
  }, [value]);

  //init master id
  useEffect(() => {
    if (master) {
      if (master.id !== selectedMasterId) {
        setSelectedMasterId(master.id);
      }
    } else {
      setSelectedMasterId('');
    }
  }, [master]);

  //row checked change
  const handleRowCheckChange = (rowId: string, keyName: string) => {
    const newMergeItems = [...mergeItems];
    const itemIdx = newMergeItems.findIndex((_ele: any) => _ele.id === rowId);
    if (itemIdx > -1) {
      const isExisted = newMergeItems[itemIdx].mergeFields.indexOf(keyName);
      if (isExisted > -1) {
        newMergeItems[itemIdx].mergeFields.splice(isExisted, 1);
      } else {
        newMergeItems[itemIdx].mergeFields.push(keyName);
      }
      setMergeItems(newMergeItems);
      //callback
      onChange && onChange(newMergeItems);
    }
  };

  //for react-table v8
  const handleCheckTableItem = (checkedValue: any[]) => {
    const newMasterId = checkedValue?.length > 0 ? checkedValue[0] : '';
    if (newMasterId) {
      setSelectedMasterId(checkedValue?.length > 0 ? checkedValue[0] : '');
      //callback
      const mergeMaster = mergeItems.find((_ele: any) => _ele.id === newMasterId);
      onMasterChange && onMasterChange(mergeMaster);
    }
  };

  //render column cell
  const getMapColumns = ({ isMergeAll, mergeMasterId, onRowCheckChange }: any) => {
    return {
      [keyNames.KEY_NAME_CUSTOMER_NAME](col: string, data: any) {
        return (
          <Typography variant="h6" color="primary">
            {data[col]}
          </Typography>
        );
      },
      [keyNames.KEY_NAME_CUSTOMER_EMAIL](col: string, data: any) {
        let emails: any = [];
        data[col]?.map((_ele: any) => {
          if (_ele.label?.label === LABEL_VALUE_PRIMARY) {
            emails.unshift({ ..._ele, name: _ele.email });
          } else {
            emails.push({ ..._ele, name: _ele.email });
          }
        });

        return (
          <Stack direction="row" alignItems="center" spacing={1.25}>
            {!(isMergeAll || mergeMasterId === data.id) && emails.length > 0 && (
              <Checkbox
                checked={data.mergeFields.includes(keyNames.KEY_NAME_CUSTOMER_EMAIL)}
                onChange={() => onRowCheckChange(data.id, keyNames.KEY_NAME_CUSTOMER_EMAIL)}
              />
            )}
            {emails.map(
              (_item: any) =>
                _item.name && (
                  <Box key={_item.name} sx={{ p: 0.5 }}>
                    <Chip color="error" label={_item.name} size="small" variant="light" />
                  </Box>
                )
            )}
          </Stack>
        );
      },
      [keyNames.KEY_NAME_CUSTOMER_PHONES](col: string, data: any) {
        let phones: any = [];
        data[col]?.map((_ele: any) => {
          if (_ele.label?.label === LABEL_VALUE_PRIMARY) {
            phones.unshift({ ..._ele, name: `+${_ele.country} ${_ele.phoneNumber}` });
          } else {
            phones.push({ ..._ele, name: `+${_ele.country} ${_ele.phoneNumber}` });
          }
        });

        return (
          <Stack direction="row" alignItems="center" spacing={1.25}>
            {!(isMergeAll || mergeMasterId === data.id) && phones.length > 0 && (
              <Checkbox
                checked={data.mergeFields.includes(keyNames.KEY_NAME_CUSTOMER_PHONES)}
                onChange={() => onRowCheckChange(data.id, keyNames.KEY_NAME_CUSTOMER_PHONES)}
              />
            )}
            {phones.map((_item: any) => (
              <Box key={_item.name} sx={{ p: 0.5 }}>
                <Chip color="success" label={_item.name} size="small" variant="light" />
              </Box>
            ))}
          </Stack>
        );
      }
      // [keyNames.KEY_NAME_CUSTOMER_ADDRESSES](col: string, data: any) {
      //   const billAddress = data?.billAddresses?.length > 0 ? data.billAddresses[0] : null;
      //   const shipAddress = data?.shipAddresses?.length > 0 ? data.shipAddresses[0] : null;
      //   return (
      //     <Stack direction="row" alignItems='center' spacing={1.25}>
      //       {!(isMergeAll || mergeMasterId === data.id) &&
      //         <Checkbox
      //           checked={data.mergeFields.includes(keyNames.KEY_NAME_CUSTOMER_ADDRESSES)}
      //           onChange={() => onRowCheckChange(data.id, keyNames.KEY_NAME_CUSTOMER_ADDRESSES)}
      //         />
      //       }
      //       <Stack spacing={1.25}>
      //         <Stack direction={"row"} spacing={1} alignItems="center">
      //           <InputLabel>Billing Address: </InputLabel>
      //           <Typography variant="inherit">{billAddress ? formatAddress(billAddress) : '(none)'}</Typography>
      //         </Stack>
      //         <Stack direction={"row"} spacing={1} alignItems="center">
      //           <InputLabel>Shipping Address: </InputLabel>
      //           <Typography variant="inherit">{shipAddress ? formatAddress(shipAddress) : '(none)'}</Typography>
      //         </Stack>
      //       </Stack>
      //     </Stack>
      //   );
      // }
    };
  };

  //table props
  const fields = [
    {
      name: category === 'account' ? 'Account Name' : 'Contact Name',
      keyName: keyNames.KEY_NAME_CUSTOMER_NAME,
      enableSorting: false,
      width: 'auto'
    },
    {
      name: 'Email',
      keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL,
      enableSorting: false,
      width: 'auto'
    },
    {
      name: 'Phones',
      keyName: keyNames.KEY_NAME_CUSTOMER_PHONES,
      enableSorting: false,
      width: 'auto'
    },
    {
      name: 'Address',
      keyName: keyNames.KEY_NAME_CUSTOMER_ADDRESSES,
      enableSorting: false,
      width: 'auto'
    }
  ];

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: 'Master',
        cell: ({ row }) => (
          <Box sx={{ px: 0.5 }}>
            <Checkbox
              {...{
                color: 'secondary',
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </Box>
        )
      },
      ...makeTable8Columns(
        fields,
        getMapColumns({ isMergeAll, mergeMasterId: selectedMasterId, onRowCheckChange: handleRowCheckChange }),
        { category },
        []
      )
    ],
    [fields, selectedMasterId]
  );

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <ReactTable8
        columns={columns}
        data={mergeItems}
        paging={{ pageSize: mergeItems.length || 20 }}
        isMultiSelection={false}
        rowSelected={[selectedMasterId]} //only one selected
        onRowSelect={handleCheckTableItem}
      />
    </>
    //   <ul className="list-unstyled mg-t-10 mg-b-0 pd-0">
    //     <li className="mg-b-5 text-muted">
    //       - Select the master account to whom the account(s) should be merged and check the
    //       records to merge to the master.
    //     </li>
    //     <li className="text-muted">
    //       - Once merged, all the Activities, Notes, Attachments, Contact, Opportunities,
    //       Tickets and transactions are transrered to the master account.
    //     </li>
    //   </ul>
  );
};

export default MergeTable;
