import { useEffect, useMemo, useState } from 'react';

//third-party
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { DeleteOutline } from '@mui/icons-material';

//project
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import IconButton from '@base/components/@extended/IconButton';

//related menu
import CustomerModal from '@customer/containers/CustomerModal';
import * as keyNames from '@customer/config/keyNames';
import { getMapColumns } from '@customer/pages/ListPage/Helper';

//menu
import { useCampaignTargetMembers, useCampaignTargetMemberDelete } from '@campaign/hooks/useCampaignTargetMember';

interface TargetMemberProps {
  menuSource?: string;
  menuCategory?: string;
  menuSourceId: string;
  readOnly?: boolean;
}

const TargetMember = (props: TargetMemberProps) => {
  const { menuCategory, menuSourceId, readOnly = false } = props;
  const [items, setItems] = useState<any>([]);
  const [openingCustomerList, setOpeningCustomerList] = useState(false);
  const [deletedId, setDeletedId] = useState<string>('');

  //get list items
  const { data, isLoading, refetch } = useCampaignTargetMembers(menuSourceId);
  const mDelete = useCampaignTargetMemberDelete(menuSourceId);

  //init items
  useEffect(() => {
    if (data?.data) {
      const newItems = data.data.map((_item) => ({
        ..._item.customer,
        campaign: _item.campaign,
        targetId: _item.id,
        targetSource: _item.source,
        targetCreatedAt: _item.createdAt,
        targetCreatedBy: _item.createdBy
      }));
      setItems(newItems);
    } else {
      setItems([]);
    }
  }, [data]);

  //delete success
  useEffect(() => {
    if (mDelete.isSuccess) {
      setDeletedId('');
    }
  }, [mDelete.isSuccess]);

  //delete item
  const handleDelete = (targetId: string) => {
    setDeletedId(targetId);
    const params = {
      id: menuSourceId,
      memberIds: [targetId]
    };
    mDelete.mutate(params);
  };

  //table props
  const fields = useMemo(() => {
    return [
      { languageKey: 'Source', keyName: keyNames.KEY_NAME_CUSTOMER_MARKETING_TARGET_SOURCE, enableSorting: false, width: 'auto' },
      { languageKey: 'Created On', keyName: keyNames.KEY_NAME_CUSTOMER_MARKETING_TARGET_CREATED_AT, enableSorting: false, width: 'auto' },
      { languageKey: 'Name', keyName: keyNames.KEY_NAME_CUSTOMER_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Company', keyName: keyNames.KEY_NAME_CUSTOMER_ACCOUNT, enableSorting: false, width: 'auto' },
      { languageKey: 'Email', keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, enableSorting: false, width: 'auto' },
      { languageKey: 'Mobile', keyName: keyNames.KEY_NAME_CUSTOMER_MOBILE, enableSorting: false, width: 'auto' }
    ];
  }, []);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      ...makeTable8Columns(fields, getMapColumns('all'), { category: 'all' }, []),
      {
        id: 'delete',
        width: '45px',
        header: 'Delete',
        cell: ({ row }) => {
          return (
            <>
              {mDelete.isLoading && row.original.targetId === deletedId ? (
                <CircularProgress size={20} />
              ) : (
                <IconButton color={'error'} size="small" onClick={() => handleDelete(row.original.targetId)}>
                  <DeleteOutline />
                </IconButton>
              )}
            </>
          );
        }
      }
    ],
    [fields, mDelete.isLoading]
  );

  return (
    <Stack spacing={1} sx={{ pr: 2 }}>
      {!readOnly && (
        <>
          <Stack direction={'row'} alignItems="center" justifyContent="space-between">
            <Typography>Target members: {items.length}</Typography>
            <Button variant="contained" color="secondary" size="small" onClick={() => setOpeningCustomerList(true)}>
              Add Member
            </Button>
          </Stack>
          <CustomerModal
            campaignId={menuSourceId}
            isOpen={openingCustomerList}
            onClose={() => setOpeningCustomerList(false)}
            onReload={refetch}
          />
        </>
      )}
      <Stack>
        <ReactTable8 columns={!readOnly ? columns : columns.slice(0, columns.length - 1)} data={[...items]} paging={{ pageSize: 100 }} />
      </Stack>
    </Stack>
  );
};

export default TargetMember;
