import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

// hook
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useGetAllKnowledgeByTag } from '@settings/preferences/hooks/desk/useGetAllKnowledgeByTag';

// menu
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { columnRenderRemap } from './Helper';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// thirty component
import Grid from '@mui/material/Grid';
import { Search, ArrowBackOutlined } from '@mui/icons-material';
import { OutlinedInput, Box, IconButton, Typography, useTheme, Button } from '@mui/material';
interface LinkedArticleTable {
  action: boolean;
  tag: {
    id: string;
    name: string;
  };
  onChangeState: () => void;
}

const LinkedArticleTable: React.FC<LinkedArticleTable> = (props: LinkedArticleTable) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const category = MENU_DESK_KNOWLEDGE;

  const { sort, setSort, paging: cPaging } = useListPageSettings(category);

  // get field
  const layoutMenu = MENU_DESK_KNOWLEDGE;
  const { data: listLayoutData } = usePageLayoutByMenu(layoutMenu, 'list');
  const fields = listLayoutData?.data;
  const tableFields = fields
    ? fields.filter((item: any) => {
        return (
          item?.name === 'category' ||
          item?.name === 'subject' ||
          item?.name === 'viewed' ||
          item?.name === 'inserted' ||
          item?.name === 'helped' ||
          item?.name === 'notHelped'
        );
      })
    : [];

  const configTableFields = tableFields.map((item: any, index: number) => {
    if (item.name === 'category')
      return {
        ...item,
        title: 'ncrm_generalsetting_preferences_desk_category_folder',
        languageKey: 'ncrm_generalsetting_preferences_desk_category_folder',
        enableSorting: true,
        width: '15%'
      };
    else if (item.name === 'subject')
      return {
        ...item,
        enableSorting: true,
        width: '45%'
      };
    else return { ...item, enableSorting: true, width: '10%' };
  });

  const categoryIndex = configTableFields.findIndex((item: any) => item.name === 'category');

  if (categoryIndex !== -1) {
    configTableFields.unshift(configTableFields.splice(categoryIndex, 1)[0]);
  }

  const { action, tag, onChangeState } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchQuery(searchText), 1000)).current;

  const getParams = () => {
    let params: any = {
      filter: {
        query: `tags=${tag.id} subject:"${searchQuery}"`,
        paging: {
          page: pagingList.page,
          size: pagingList.size
        },
        sort: sort
      }
    };
    return params;
  };

  const [pagingList, setPagingList] = useState({ page: 1, size: 10 });
  const handlePagingChange = (page: number, size: number) => {
    setPagingList({ page, size });
  };
  const { data, isLoading, refetch } = useGetAllKnowledgeByTag(getParams());

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value;
      setSearchTextDebounced(inputValue);
    }
  };
  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const handleSearchButtonClick = () => {
    setSearchTextDebounced(searchInput);
  };

  const { paging, results } = data ?? {};

  const getMapColumns = () => {
    return columnRenderRemap(category);
  };

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [...makeTable8Columns(configTableFields, getMapColumns(), { category }, [])],
    [configTableFields]
  );

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage ?? 1,
    pageCount: paging?.totalItems || 0,
    pageSize: pagingList.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const listTableProps: ListTableProps = {
    rows: results || [],
    // checkedIds,
    // onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    },
    sx: { px: 0 },
    sxTableHeader: { fontWeight: 'normal' }
  };

  return (
    <Box sx={{ p: '20px' }}>
      <Grid
        container
        sx={{
          border: '1px solid',
          borderColor: theme.palette.divider
        }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              p: '10px',
              alignItems: 'center',
              borderBottom: `1px solid ${theme.palette.divider}`
            }}
          >
            <IconButton onClick={onChangeState} size="medium">
              <ArrowBackOutlined className="arrow-icon" fontSize="small" />
            </IconButton>
            <Typography>
              <span style={{ paddingRight: '5px', marginRight: '5px', borderRight: `1px solid ${theme.palette.divider}` }}>
                {t('ncrm_generalsetting_preferrences_desk_tags')}
              </span>
              {tag.name}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ m: 2, border: `1px solid ${theme.palette.divider}` }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: '20px'
              }}
            >
              <OutlinedInput
                sx={{
                  // bgcolor: theme.palette.grey[50]
                  paddingRight: 0
                }}
                placeholder={t('ncrm_generalsetting_preferences_input_search_text') as string}
                size="small"
                endAdornment={
                  <Button
                    sx={{ borderLeft: `1px solid ${theme.palette.divider}`, padding: '3px', minWidth: '20px' }}
                    onClick={handleSearchButtonClick}
                  >
                    <Search
                      sx={{
                        color: theme.palette.grey[500],
                        width: '50px'
                      }}
                    />
                  </Button>
                }
                onChange={handleSearchQueryChange}
                onKeyDown={handleKeyDown}
              />
            </Box>
            <ListTable {...listTableProps} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LinkedArticleTable;
