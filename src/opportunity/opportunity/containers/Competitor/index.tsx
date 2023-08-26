import { useEffect, useMemo, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { AddOutlined, CloseOutlined } from '@mui/icons-material';

//project base
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { MENU_OPPORTUNITY_COMPETITOR } from '@base/config/menus';
import { CompetitorQuickView } from '@base/containers/QuickView';

//competior menu
import { Competitor } from '@competitor/types/interfaces';
import * as competitorKeyNames from '@competitor/config/keyNames';
import { useOpportunityCompetitors } from '@competitor/hooks/useCompetitors';
import WritePage from '@competitor/pages/WritePage';
import { useOpportunityDeleteCompetitor } from '@opportunity/hooks/useOpportunityDelete';
import CompetitorAutoComplete from '@competitor/containers/CompetitorAutoComplete';
import { nanoid } from '@base/utils/helpers';
import { useOpportunityCompetitorCreate } from '@competitor/hooks/useCompetitorCreate';

//menu
//import * as keyNames from '@opportunity/config/keyNames';

interface CompetitorProps {
  menuSourceId: string;
  isOpenNew?: boolean;
  onCloseNew?: () => void;
}

const OpportunityCompetitors = (props: CompetitorProps) => {
  const { t } = useTranslation();
  const { menuSourceId, isOpenNew = false, onCloseNew } = props;
  //state
  const [items, setItems] = useState<Competitor[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [deletedIdx, setDeletedIdx] = useState(-1);
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  //get list
  const { data, refetch } = useOpportunityCompetitors(menuSourceId);
  const mDelete = useOpportunityDeleteCompetitor(menuSourceId);
  const mOppCompetitorAdd = useOpportunityCompetitorCreate();

  //set data
  useEffect(() => {
    if (data?.data) {
      setItems(data.data);
    } else {
      setItems([]);
    }
  }, [data]);

  //save success
  useEffect(() => {
    if (mOppCompetitorAdd.isSuccess) {
      if (selectedIdx > -1 && selectedCompetitor !== null) {
        const newItems = [...items];
        newItems[selectedIdx] = selectedCompetitor;
        setItems(newItems);
        //reset
        setSelectedIdx(-1);
        setSelectedCompetitor(null);
      }
    }
  }, [mOppCompetitorAdd.isSuccess]);

  //delete success
  useEffect(() => {
    if (mDelete.isSuccess) {
      if (deletedIdx > -1) {
        const newItems = [...items];
        newItems.splice(deletedIdx, 1);
        setItems(newItems);
        //reset
        setDeletedIdx(-1);
      }
    }
  }, [mDelete.isSuccess]);

  //delete a item
  const handleDelete = (competitorId: string) => {
    const fIdx = items.findIndex((_ele) => _ele.id === competitorId);
    if (items[fIdx].name) {
      setDeletedIdx(fIdx);
      const params = {
        id: menuSourceId,
        competitorIds: [competitorId]
      };
      mDelete.mutate(params);
    } else {
      const newItems = [...items];
      newItems.splice(fIdx, 1);
      setItems(newItems);
    }
  };

  //add new item
  const handleAddNew = () => {
    const newItems = [...items];
    newItems.push({ id: nanoid(), code: '', name: '', website: '' });
    setItems(newItems);
  };

  //change value
  const handleChange = (rowId: string, selected: Competitor) => {
    if (selected) {
      //check exist
      const existIdx = items.findIndex((_ele) => _ele.id === selected.id);
      if (existIdx === -1) {
        const fIdx = items.findIndex((_ele) => _ele.id === rowId);
        setSelectedIdx(fIdx);
        setSelectedCompetitor(selected);
        //start save
        mOppCompetitorAdd.mutate({ id: menuSourceId, competitors: [{ id: selected.id, name: selected.name }] });
      }
    }
  };

  //columns render
  const getMapColumns = () => {
    return {
      [competitorKeyNames.KEY_NAME_COMPETITOR_NAME](col: string, data: any, extra: any) {
        const name = data[col] ? data[col] : '';
        const id = data.id ?? '';

        return (
          <>
            {name ? (
              <CompetitorQuickView value={{ id, name }} />
            ) : (
              <CompetitorAutoComplete onChange={(selected: Competitor) => handleChange(id, selected)} />
            )}
          </>
        );
      },
      [competitorKeyNames.KEY_NAME_COMPETITOR_WEBSITE](col: string, data: any, extra: any) {
        return data[col] ? <Typography>{data[col]?.website}</Typography> : <em></em>;
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
      { languageKey: 'Name', keyName: competitorKeyNames.KEY_NAME_COMPETITOR_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Website', keyName: competitorKeyNames.KEY_NAME_COMPETITOR_WEBSITE, enableSorting: false, width: 'auto' },
      { languageKey: '', keyName: 'action', enableSorting: false, width: '20px' }
    ];
  }, []);

  //render columns
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields, items]);

  //render table
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: [...items],
      columns: columns,
      sx: { p: 0, mb: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items]);

  //console.log('competitor items', items);
  return (
    <>
      {TableMemo}
      <Stack direction="row" sx={{ p: 0.5 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
          startIcon={<AddOutlined />}
          onClick={handleAddNew}
        >
          {t('Add another line')}
        </Button>
      </Stack>
      {isOpenNew && (
        <WritePage
          fullScreen={false}
          isOpen={isOpenNew}
          menuApi={MENU_OPPORTUNITY_COMPETITOR}
          opportunityId={menuSourceId}
          onClose={() => onCloseNew && onCloseNew()}
          onReload={refetch}
        />
      )}
    </>
  );
};

export default OpportunityCompetitors;
