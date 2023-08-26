import { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { IconButton, Stack, Typography } from '@mui/material';
import { DeleteOutline, DriveFileRenameOutline } from '@mui/icons-material';

//project base
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { convertDateTimeServerToClient } from '@base/utils/helpers';

//quote menu
import * as keyNames from '@quote/config/keyNames';
import { Quote } from '@quote/types/interfaces';
import WritePage from '@quote/pages/WritePage';
import { useQuoteRevisionDelete } from '@opportunity/hooks/useOpportunityQuote';
import { MENU_SALES_QUOTE } from '@base/config/menus';
import { QUOTE_CATEGORY_ORIGINAL, QUOTE_CATEGORY_REVISION } from '@quote/config/constants';
import QuoteRevisionQuickView from '@quote/containers/RevisionQuickView';

interface QuotesProps {
  data?: Quote[];
  menuSourceId: string; //opportunity id
  onReload?: () => void;
}

const Quotes = (props: QuotesProps) => {
  const { t } = useTranslation();
  const { data, menuSourceId, onReload } = props;
  //state
  const [items, setItems] = useState<any>([]);
  const [isOpenWriteQuote, setIsOpenWriteQuote] = useState(false);
  const [selectedQuoteRevision, setSelectedQuoteRevision] = useState<any>(null);
  //hook
  const mDelete = useQuoteRevisionDelete(menuSourceId);

  //set data
  useEffect(() => {
    if (data) {
      setItems(data);
    } else {
      setItems([]);
    }
  }, [data]);

  //delete a item
  const handleDelete = (proposalId: string) => {
    const params = {
      id: menuSourceId,
      quoteProposalIds: [proposalId]
    };
    mDelete.mutate(params);
  };

  //set edit quote
  const handleEditQuote = (selected: any) => {
    setSelectedQuoteRevision(selected);
    setIsOpenWriteQuote(true);
  };

  //columns render
  const getMapColumns = () => {
    return {
      [keyNames.KEY_NAME_QUOTE_CODE](col: string, data: any, extra: any) {
        return data.quote.code;
      },
      revision(col: string, data: any, extra: any) {
        //return data.quoteRevision?.code || <em></em>;
        return <QuoteRevisionQuickView value={{ id: data.quoteRevision?.id, name: data.quoteRevision?.code }} />;
      },
      [keyNames.KEY_NAME_QUOTE_NAME](col: string, data: any, extra: any) {
        const name = data.quoteRevision ? data.quoteRevision.name : data.quote.name;
        //const id = data.quote.id ?? '';

        return name;

        // return (
        //   // <CompetitorQuickView value={{ id, name }} />
        // );
      },
      [keyNames.KEY_NAME_QUOTE_CREATED_BY](col: string, data: any, extra: any) {
        return data[col] ? <Typography>{data[col]?.name}</Typography> : <em></em>;
      },
      [keyNames.KEY_NAME_QUOTE_CREATED_AT](col: string, data: any, extra: any) {
        return data[col] ? convertDateTimeServerToClient({ date: data[col] }) : <em></em>;
      },
      action(col: string, data: any, extra: any) {
        return (
          <Stack direction={'row'} spacing={0.5}>
            <IconButton color="secondary" size="small" onClick={() => handleEditQuote(data)}>
              <DriveFileRenameOutline fontSize="small" />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => handleDelete(data.id)}>
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Stack>
        );
      }
    };
  };

  //render fields
  const fields = useMemo(() => {
    return [
      { languageKey: 'Quote ID', keyName: keyNames.KEY_NAME_QUOTE_CODE, enableSorting: false, width: 'auto' },
      { languageKey: 'Revision ID', keyName: 'revision', enableSorting: false, width: 'auto' },
      { languageKey: 'Quote Name', keyName: keyNames.KEY_NAME_QUOTE_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Created By', keyName: keyNames.KEY_NAME_QUOTE_CREATED_BY, enableSorting: false, width: 'auto' },
      { languageKey: 'Created Date', keyName: keyNames.KEY_NAME_QUOTE_CREATED_AT, enableSorting: false, width: 'auto' },
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
  }, [items, columns]);

  return (
    <>
      {TableMemo}
      {isOpenWriteQuote && (
        <WritePage
          fullScreen={false}
          isOpen={isOpenWriteQuote}
          onClose={() => {
            setSelectedQuoteRevision(null);
            setIsOpenWriteQuote(false);
          }}
          menuApi={MENU_SALES_QUOTE}
          category={selectedQuoteRevision?.quoteRevision?.id ? QUOTE_CATEGORY_REVISION : QUOTE_CATEGORY_ORIGINAL}
          quoteId={selectedQuoteRevision?.quote.id}
          quoteRevisionId={selectedQuoteRevision?.quoteRevision?.id}
          onReload={onReload}
        />
      )}
    </>
  );
};

export default Quotes;
