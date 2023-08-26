import { useEffect, useMemo, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';

//material
import { Box, Button, Checkbox, InputLabel, Stack } from '@mui/material';

//project
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import { LIST_STALE_TIME, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
//menu
import * as keyNames from '@base/config/keyNames';

import { Customer } from '@customer/types/interface';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { MENU_SETTING_CTA, MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
// import { getMapColumns } from './Helper';
import { getMapColumns as ctaGetMapColumns } from '@settings/digital/cta/pages/ListPage/Helper';
import { getMapColumns as landingGetMapColumns } from '@settings/digital/landing-page/pages/ListPage/Helper';

// cta
import { default as configFields } from '@settings/digital/cta/config/view-field';
import { useCtaList } from '@settings/digital/cta/hooks/useCtas';
import { FilterInput } from '@base/types/common';
import _ from 'lodash';
import { useLandingPages } from '@settings/digital/landing-page/hooks/useLandingPages';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { buildListSchema } from '@base/utils/helpers/schema';
import { FILE_TYPE_CTA, FILE_TYPE_LANDING_PAGE } from '@quote/config/constants';

interface TableTabProps {
  defaultSelectedIds: string[];
  onChange?: (selected: any) => void;
  isMulti: boolean;
  category: string;
  handlePopClose: () => void;
}

const TableTab = (props: TableTabProps) => {
  const { defaultSelectedIds = [], onChange: handleAddItems, isMulti, category, handlePopClose } = props;

  //state
  const [selectedMarketingList, setSelectedMarketingList] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [items, setItems] = useState<Customer[]>([]);

  // get cta list
  const pageDataKey = MENU_SETTING_CTA;
  let { data: listLayoutData, isLoading } = usePageLayoutByMenu(pageDataKey, 'list');
  const { keyword, sort, paging: ctaPaging, filterQuery, setPaging: setCtaPaging } = useListPageSettings(pageDataKey);

  const { listQuerySchema, fields: ctaFields } = useMemo(() => {
    let fields = [];
    let listQuerySchema = '';
    if (listLayoutData && listLayoutData.data) {
      fields = listLayoutData.data;
    }
    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable
      };
    });

    if (!_.isEmpty(fields)) {
      listQuerySchema = buildListSchema({ fields, configFields });
    }
    return { listQuerySchema, fields };
  }, [listLayoutData]);

  const { results: ctaData, refetch: ctaRefetch } = useCtaList(
    listQuerySchema,
    {
      filter: {
        keyword: keyword ?? '',
        sort: sort,
        paging: ctaPaging,
        query: `groupBy="all"`
      } as FilterInput
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: !!ctaFields?.length && category === FILE_TYPE_CTA
    }
  );

  //get landing page list

  const landingPageDataKey = MENU_SETTING_LANDINGPAGE;
  let { data: landingListLayoutData } = usePageLayoutByMenu(landingPageDataKey, 'list');
  const { setPaging: setLangingPaging, paging: landingPaging } = useListPageSettings(landingPageDataKey);

  const { fields: landingFields } = useMemo(() => {
    let fields = [];
    if (landingListLayoutData && landingListLayoutData.data) {
      fields = landingListLayoutData.data;
    }
    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable
      };
    });
    return { fields };
  }, [landingListLayoutData]);

  const { data: landingData, refetch } = useLandingPages(landingPageDataKey, landingFields, {
    enabled: landingFields.length > 0 && category === FILE_TYPE_LANDING_PAGE
  });

  //init selected
  useEffect(() => {
    if (JSON.stringify(defaultSelectedIds) !== JSON.stringify(selectedIds)) {
      setSelectedIds(defaultSelectedIds);
    }
  }, [defaultSelectedIds]);

  //init from customer list
  useEffect(() => {
    //console.log('data', data);
    if (category === FILE_TYPE_CTA) {
      if (ctaData?.data) {
        setItems(ctaData.data);
      } else {
        setItems([]);
      }
    }
    if (category === FILE_TYPE_LANDING_PAGE) {
      if (landingData?.data) {
        setItems(landingData.data);
      } else {
        setItems([]);
      }
    }
  }, [ctaData, landingData]);

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    if (category === FILE_TYPE_CTA) {
      setCtaPaging({ page, size });
    } else {
      setLangingPaging({ page, size });
    }
  };

  //selected change
  const handleCheckChange = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
    //callback
    const selectedItems = items.filter((_item) => checkedIds.includes(_item.id));
    handleAddItems && handleAddItems({ customers: selectedItems, marketingList: selectedMarketingList });
  };

  //build columns for table v8

  const defaultColumns = [keyNames.KEY_NAME_NAME, keyNames.KEY_NAME_TYPE, keyNames.KEY_NAME_CREATED_BY, keyNames.KEY_NAME_UPDATED_BY];

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
      ...makeTable8Columns(
        ctaFields.filter((v: any) => defaultColumns.includes(v.keyName)),
        category === FILE_TYPE_CTA ? ctaGetMapColumns() : landingGetMapColumns(''),
        {},
        []
      )
    ],
    [ctaFields, selectedIds]
  );

  //paging props
  const pagingProps: ListPaginationProps = {
    pageTotal: category === FILE_TYPE_CTA ? ctaData?.paging?.totalPage || 1 : landingData?.paging?.totalPage || 1,
    pageCount: category === FILE_TYPE_CTA ? ctaData?.paging?.totalItems || 0 : landingData?.paging?.totalItems || 0,
    pageSize:
      category === FILE_TYPE_CTA
        ? !!ctaPaging?.size
          ? ctaPaging?.size
          : LIST_TABLE_PAGE_SIZE
        : !!landingPaging?.size
        ? landingPaging?.size
        : LIST_TABLE_PAGE_SIZE,
    pageIndex: category === FILE_TYPE_CTA ? ctaData?.paging?.currentPage || 1 : landingData?.paging?.currentPage || 1
  };

  const handleOnRowChecked = (data: any) => {
    if (!isMulti && data.length > 0) {
      // const newItem = data.map((id: string) => ({ ...items.find((v: any) => v.id === id), category }));

      const newItem = data.map((id: string) => {
        const item = items.find((v: any) => v.id === id);

        return {
          id: item?.id,
          type: category,
          file: {
            id: item?.id,
            name: item?.name,
            type: item?.type
          },
          createdAt: new Date().toISOString()
        };
      });

      handleAddItems && handleAddItems(newItem);
      handlePopClose && handlePopClose();
    }
    setSelectedIds(data);
  };

  const handleAddMultiple = () => {
    const newItem = selectedIds.map((id: string) => {
      const item = items.find((v: any) => v.id === id);

      return {
        id: item?.id,
        type: category,
        file: {
          id: item?.id,
          name: item?.name,
          type: item?.type
        },
        createdAt: new Date().toISOString()
      };
    });

    handleAddItems && handleAddItems(newItem);
    handlePopClose && handlePopClose();
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items,
      checkedIds: selectedIds,
      onRowChecked: handleOnRowChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: columns,
      sx: { p: 0 },
      isMultiSelection: isMulti
    };
    return <ListTable {...listTableProps} />;
  }, [items, pagingProps, columns, selectedIds]);

  return (
    <>
      <Box className="scroll-box" height={500}>
        {TableMemo}
      </Box>
      {isMulti && (
        <Stack width="100%" direction="row" justifyContent="flex-end" mr={2}>
          <Button variant="contained" onClick={handleAddMultiple}>
            Save
          </Button>
        </Stack>
      )}
    </>
  );
};

export default TableTab;
