import React, { useEffect, useMemo, useState } from 'react';

//material
import { Box } from '@mui/material';

//project
import { DESC } from '@base/config/constant';
import { buildListSchema } from '@base/utils/helpers/schema';

//menu
import { default as configFields } from '@desk/ticket/config/view-field';
import { useSitePageLayoutByMenu } from '@public-page/site/hooks/useSitePagelayout';
import { useSiteTickets } from '@public-page/site/hooks/useSiteTickets';

//local
import PageBody from './Body';
import TicketWriteForm from '../../TicketWriteForm';

interface TicketsProps {
  menuSourceId: string;
  token: string;
  isOpenWrite?: boolean;
  ticketCustomer?: any;
  onClose?: () => void;
}

const Tickets = (props: TicketsProps) => {
  const {
    token,
    menuSourceId, //ticket id
    isOpenWrite,
    ticketCustomer,
    onClose
  } = props;
  //state
  const layoutMenu = `desk_ticket`; //for list
  const [viewingFields, setViewingFields] = useState<any>([]);
  const [listFilter, setListFilter] = useState<any>({
    paging: {
      page: 1,
      size: 15,
      totalPage: 1
    },
    sort: {
      field: 'createdAt',
      orderBy: DESC
    },
    query: `customer=\"${ticketCustomer?.customer?.id || ''}\"`
  });

  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = useSitePageLayoutByMenu(layoutMenu, 'list', token);

  //get list data
  let listQuerySchema =
    listLayoutData?.data && viewingFields.length > 0 ? buildListSchema({ fields: viewingFields, configFields }) + ' content' : '';
  //console.log('listQuerySchema', listQuerySchema);

  let filtersQuery: any = {
    sort: listFilter.sort,
    paging: { page: listFilter.paging.page, size: listFilter.paging.size },
    query: listFilter.query
  };

  //console.log('filter query', filtersQuery);
  const { data: postResult, isLoading: isListLoading, refetch } = useSiteTickets(token, listQuerySchema, filtersQuery);
  //console.log('customer tickets', postResult);

  //set viewing columns
  useEffect(() => {
    if (listLayoutData?.data) {
      const newItems: any[] = [];
      listLayoutData?.data.map((_ele: any) => {
        if (_ele.isDefault) {
          newItems.push({ ..._ele, isViewing: _ele.isDefault });
        }
      });
      setViewingFields(newItems);
    }
  }, [listLayoutData]);

  //set paging
  useEffect(() => {
    if (postResult?.paging) {
      let newFilter = {
        ...listFilter,
        paging: {
          ...listFilter.paging,
          totalPage: postResult.paging.totalPage,
          totalItems: postResult.paging.totalItems,
          itemPerPage: postResult.paging.itemPerPage
        }
      };
      setListFilter(newFilter);
    }
  }, [postResult]);

  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        category={'ticket'}
        fields={viewingFields || []}
        itemsList={postResult?.data || []}
        paging={postResult?.paging}
        filter={listFilter}
        setFilter={setListFilter}
      />
    );
  }, [postResult, viewingFields]);

  return (
    <Box>
      {PageBodyMemo}
      <TicketWriteForm
        isOpen={isOpenWrite || false}
        token={token}
        ticketCustomer={ticketCustomer}
        onClose={() => onClose && onClose()}
        onReload={refetch}
      />
    </Box>
  );
};

export default Tickets;
