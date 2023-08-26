import { isArray } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

import { MENU_SOURCE } from '@base/config/menus';
import { FilterInput } from '@base/types/common';
import { generateUUID } from '@base/utils/helpers';
import useKBInsertedMutate from '@desk/knowledge-base/hooks/useKBInsertedMutation';
import useKBInserteds from '@desk/knowledge-base/hooks/useKBInserteds';
import { KBInserted, KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { Box, Button, Stack, useTheme } from '@mui/material';
import KBs from './KBs';
import { useTranslation } from 'react-i18next';

interface AssignKBsContainerProps {
  menuSource: string;
  menuSourceId: string;
}

const AssignKBsContainer = (props: AssignKBsContainerProps) => {
  // console.log(props)
  const theme = useTheme();
  const { t } = useTranslation();

  const { menuSourceId, menuSource } = props;
  const menu = MENU_SOURCE[menuSource];
  //state
  const [items, setItems] = useState<any>([]);
  const params: FilterInput = {
    query: 'menu=' + menu + ' refId=' + menuSourceId
  };
  const { mAddKbInserted, mDeleteKBInserted } = useKBInsertedMutate({ filterKey: params.query ?? '' });

  //get list
  const { data, isLoading, refetch } = useKBInserteds({ filter: params });

  // init value
  useEffect(() => {
    if (data?.results && data?.results?.length > 0) {
      if (items.length === 0) {
        setItems(data?.results.map((v: any, i: number) => ({ ...v, rowId: generateUUID() })));
      } else {
        setItems((prev: any) => {
          const newData = data?.results;
          const newItems = prev.map((v: any, i: number) => {
            let newItem = v;
            // if have item same id update new
            const syncItem = newData.find((dataItem: any) => dataItem?.knowledge?.id === v?.knowledge?.id);
            if (syncItem) {
              newItem = syncItem;
            }

            return { ...newItem, rowId: generateUUID() };
          });
          return newItems;
        });
      }
    } else {
      setItems([]);
    }
  }, [data]);

  //assign KB to ticket
  const handleAssign = (item: KnowledgeBase) => {
    mAddKbInserted.mutate({
      id: generateUUID(),
      refId: {
        id: menuSourceId,
        name: ''
      },
      menu: menu,
      knowledge: {
        id: item.id,
        name: item.subject
      }
    });
  };

  //delete KB
  const handleDelete = (id: KBInserted, rowId: string) => {
    mDeleteKBInserted.mutate(
      {
        ids: [id]
      },
      {
        onSuccess: () => {
          const newItems = items?.filter((v: any) => v?.rowId !== rowId);
          setItems(newItems);
        }
      }
    );
  };

  const handleAddRow = () => {
    const newItem = {
      isEmptyRow: true,
      rowId: generateUUID()
    };
    setItems((prev: any) => [...prev, newItem]);
  };

  const handleDeleteRow = (item: any, rowId: string) => {
    if (item?.id) {
      handleDelete(item?.id, rowId);
    } else {
      const newItems = items?.filter((v: any) => v?.rowId !== rowId);
      setItems(newItems);
    }
  };

  const handleKnowledgeChange = (nVal: any, rowId: string) => {
    const newItems = items?.map((v: any) => {
      if (v?.rowId === rowId) {
        return { ...v, knowledge: nVal };
      } else {
        return v;
      }
    });

    setItems(newItems);
    handleAssign(nVal);
  };

  // DeleteTwoTone

  return (
    <>
      <Box sx={{ postion: 'relative', mb: '10px' }}>
        <KBs items={items} onDelete={handleDeleteRow} onKnowledgeChange={handleKnowledgeChange} />
      </Box>

      <Button
        size="small"
        variant="contained"
        onClick={handleAddRow}
        sx={{ px: 1.5, ml: 2, mb: '10px', width: 'fit-content', borderRadius: 1 }}
      >
        + {t('ncrm_common_btn_add_another_line')}
      </Button>
    </>
  );
};

export default AssignKBsContainer;
