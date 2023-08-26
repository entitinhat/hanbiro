import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

//project
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { DESC } from '@base/config/constant';
import { default as configFields } from '@desk/ticket/config/view-field';
import { buildListSchema } from '@base/utils/helpers/schema';
import { MENU_DESK_TICKET } from '@base/config/menus';
import { Box, Button, Divider, IconButton, InputAdornment, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import NoData from '@base/components/@hanbiro/NoData';

//related menu
import { useTicketList } from '@desk/ticket/hooks/useTicketList';
//import { getListQuery } from '@desk/ticket/services/graphql';

//local
//import PageBody from './Body';
import PageBodyGrid from './GridBody';
import RouteName from '@base/components/@hanbiro/RouteName';

interface CustomerTicketProps {
  menuSource?: string;
  menuSourceId: string;
  isRecent?: boolean;
  recentLimited?: number; // default to 3
}

const CustomerTicket = (props: CustomerTicketProps) => {
  const {
    isRecent = false,
    recentLimited = 3,
    menuSourceId //customer id
  } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  //state
  const layoutMenu = MENU_DESK_TICKET; //for list
  const [viewingFields, setViewingFields] = useState<any>([]);
  const [listFilter, setListFilter] = useState<any>({
    paging: {
      page: 1,
      size: 99,
      totalPage: 1
    },
    sort: {
      field: 'createdAt',
      orderBy: DESC
    },
    query: `customer=\"${menuSourceId}\"`
  });

  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(layoutMenu, 'list');

  //get list data
  let listQuerySchema =
    listLayoutData?.data && viewingFields.length > 0 ? buildListSchema({ fields: viewingFields, configFields }) + ' \ncode \ncontent' : '';
  //console.log('listQuerySchema', listQuerySchema);

  let filtersQuery: any = {
    sort: listFilter.sort,
    paging: { page: listFilter.paging.page, size: listFilter.paging.size },
    query: listFilter.query
  };

  //console.log('filter query', filtersQuery);
  const { data: postResult, isLoading: isListLoading } = useTicketList(
    listQuerySchema,
    { filter: filtersQuery },
    { enabled: menuSourceId.length > 0 && listQuerySchema !== '' }
  );
  //console.log('useTicketList', postResult);

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
      <PageBodyGrid category={'ticket'} fields={viewingFields || []} itemsList={postResult?.data || []} />
      //====== List Body
      // <PageBody
      //   category={'ticket'}
      //   fields={viewingFields || []}
      //   itemsList={postResult?.data || []}
      //   paging={postResult?.paging}
      //   filter={listFilter}
      //   setFilter={setListFilter}
      // />
      //================
    );
  }, [postResult, viewingFields]);

  //header
  const renderHeader = () => {
    return (
      <Box
        sx={{
          my: 1,
          mx: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            // setHideWriteForm(!hideWriteForm);
          }}
          size="small"
          sx={{ mr: 1 }}
        >
          + New
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <OutlinedInput
            fullWidth
            //onChange={handleTextChange}
            //value={searchText}
            //onKeyPress={handleEnter}
            sx={
              {
                // bgcolor: (t) => t.palette.grey[50],
                // overflow: 'hidden'
              }
            }
            placeholder={t('ncrm_common_search_placeholder') as string}
            size="small"
            endAdornment={
              <>
                <Divider orientation="vertical" sx={{ height: 32 }} />
                <InputAdornment
                  position="end"
                  sx={{
                    '& .MuiInputAdornment-sizeSmall': {
                      width: 32,
                      ml: '-8px'
                    },
                    ':hover': {
                      '& .MuiIconButton-root': {
                        bgcolor: theme.palette.primary.lighter,
                        color: `${theme.palette.primary.main}`
                      }
                    },
                    '& .MuiIconButton-root': {
                      height: 32
                    },
                    py: 0
                  }}
                >
                  <IconButton
                    aria-label="search"
                    edge="end"
                    color="inherit"
                    sx={{
                      ml: '-8px',
                      mr: '-14px'
                    }}
                    onClick={() => {}}
                  >
                    <Search
                      sx={
                        {
                          // color: `${theme.palette.grey[300]}`
                        }
                      }
                      fontSize="small"
                    />
                  </IconButton>
                </InputAdornment>
              </>
            }
          />
        </Box>
      </Box>
    );
  };

  if (isRecent) {
    //right side
    return (
      <>
        {(!postResult?.data || postResult?.data?.length === 0) && <NoData />}
        <Stack spacing={2} sx={{ padding: '8px 16px' }}>
          {postResult?.data?.slice(0, 3).map((v: any, i: number) => {
            if (i < 3) {
              return (
                <Stack key={i} direction={'row'} alignItems="center" spacing={1}>
                  <Typography>{v?.code}</Typography>
                  <RouteName name={v?.subject} url={`/mdesk/ticket/${v.id}`} variant="h6" />
                </Stack>
              );
            }
          })}
        </Stack>
      </>
    );
  }

  return (
    <Box>
      {renderHeader()}
      {PageBodyMemo}
      {(!postResult?.data || postResult?.data?.length === 0) && <NoData />}
    </Box>
  );
};

export default CustomerTicket;
