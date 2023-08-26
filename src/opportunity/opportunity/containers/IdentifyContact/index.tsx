import { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { IconButton, Stack, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

//project base
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { MENU_OPPORTUNITY_IDENTIFY_CONTACT } from '@base/config/menus';

//menu
import { Competitor } from '@competitor/types/interfaces';
import { useOpportunityCompetitors } from '@competitor/hooks/useCompetitors';
import { useOpportunityDeleteContact } from '@opportunity/hooks/useOpportunityContact';

//local
import WriteIdentifyContact from '../WriteIdentifyContact';
import * as keyNames from '../WriteIdentifyContact/keyNames';
import IdentifyContactView from '../IdentifyContactView';

//menu

interface IdentifyContactsProps {
  data?: any;
  menuSourceId: string;
  isOpenNew?: boolean;
  onCloseNew?: () => void;
  onRefresh?: () => void;
}

const IdentifyContacts = (props: IdentifyContactsProps) => {
  const { t } = useTranslation();
  const { data, menuSourceId, isOpenNew = false, onCloseNew, onRefresh } = props;
  //state
  const [items, setItems] = useState<any>([]);

  //get list
  //const { data: , refetch } = useOpportunityCompetitors(menuSourceId); //TODO
  const mDelete = useOpportunityDeleteContact(menuSourceId);

  useEffect(() => {
    if (mDelete.isSuccess) {
      onRefresh && onRefresh();
    }
  }, [mDelete.isSuccess]);

  //set data
  useEffect(() => {
    if (data) {
      setItems(data);
    } else {
      setItems([]);
    }
  }, [data]);

  //delete a item
  const handleDelete = (contactId: string) => {
    const params = {
      id: menuSourceId,
      identifyContactIds: [contactId]
    };
    mDelete.mutate(params);
  };

  //columns render
  const getMapColumns = () => {
    return {
      [keyNames.KEY_NAME_IDENTIFY_CONTACT_NAME](col: string, data: any, extra: any) {
        const name = data[col] ? data[col] : '';
        const id = data.id ?? '';
        //let url = `/opportunity/competitor/${id}`;

        return (
          // <Stack direction="row" spacing={0.5} alignItems="center">
          //   <RouteName name={name} url={url} variant="h6" />
          // </Stack>
          <IdentifyContactView value={{ id, name }} data={data} />
        );
      },
      [keyNames.KEY_NAME_IDENTIFY_CONTACT_BUYING_ROLE](col: string, data: any, extra: any) {
        return data[col] ? <Typography>{data[col]?.name}</Typography> : <em>(none)</em>;
      },
      action(col: string, data: any, extra: any) {
        return (
          <IconButton color="error" size="small" onClick={() => handleDelete(data.id)}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        );
      }
    };
  };

  //render fields
  const fields = useMemo(() => {
    return [
      { languageKey: 'Name', keyName: keyNames.KEY_NAME_IDENTIFY_CONTACT_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Buying Role', keyName: keyNames.KEY_NAME_IDENTIFY_CONTACT_BUYING_ROLE, enableSorting: false, width: 'auto' },
      { languageKey: '', keyName: 'action', enableSorting: false, width: '20px' }
    ];
  }, []);

  //render columns
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  //render table
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: [...items],
      columns: columns,
      sx: { p: 0, mb: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items]);

  return (
    <>
      {TableMemo}
      {isOpenNew && (
        <WriteIdentifyContact
          fullScreen={false}
          isOpen={isOpenNew}
          menuApi={MENU_OPPORTUNITY_IDENTIFY_CONTACT}
          opportunityId={menuSourceId}
          onClose={() => onCloseNew && onCloseNew()}
          onReload={onRefresh}
        />
      )}
    </>
  );
};

export default IdentifyContacts;
