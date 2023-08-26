import React, { useMemo, useState } from 'react';

import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { ListType } from '@base/types/app';
import { PageLayoutSectionField } from '@base/types/pagelayout';
import { Paging } from '@base/types/response';
import ListGridCard from '@desk/knowledge-base/containers/ListGridCard';
import ListMode from '@desk/knowledge-base/containers/ListMode';
import useKBMutation from '@desk/knowledge-base/hooks/useKBMutation';
import { CategoryParentType, KnowledgeBase, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { Box, Button, Checkbox, useMediaQuery, useTheme } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap } from './Helper';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';
import { DeleteOutline, ReplayOutlined } from '@mui/icons-material';

interface BodyProps<T> {
  isSplitMode: boolean;
  category: string;
  fields: PageLayoutSectionField[];
  itemsList: T[];
  paging?: Paging | undefined;
  checkedIds: string[];
  onChecked: (checkedIds: string[]) => void;
  onCancel: () => void;
  refetch: () => void;
  handleChangeCategoryFolder: (category: string, folder: string) => void;
  isViewMode?: boolean;
  //check role to give permission to publish|unpublish|delete category
  user: {
    id: string;
    role: string;
  };
}

const Body = (props: BodyProps<KnowledgeBase>) => {
  const {
    isSplitMode,
    category,
    fields,
    itemsList,
    paging,
    checkedIds,
    onChecked,
    onCancel,
    refetch,
    handleChangeCategoryFolder,
    user,
    isViewMode = false
  } = props;
  const {
    listType,
    settingColumns,
    filterValues,
    setSort,
    setPaging,
    getViewingFields,
    setFilter,
    paging: cPaging
  } = useListPageSettings(category);
  const { listQueryKey } = useListQueryKeys(category);
  const { mUpdatePublish, mDelete, mRestore, mEmpty, mEmptyAll } = useKBMutation(listQueryKey);

  const { t } = useTranslation();
  //responsive
  const { isMobile } = useDevice();
  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }
  //State
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeBaseCategory | null>(null);

  const groupBy = filterValues?.groupBy;

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };
  const handlePublish = (row: any) => {
    const params = {
      ids: [row.id],
      isPublish: !row.isPublish
    };
    mUpdatePublish.mutate(params);
  };
  const handleSelectCategory = (selectedCategory: KnowledgeBaseCategory | null) => {
    //Migrate from ncrmV2
    setSelectedCategory(selectedCategory);
    const curSearchFilters = filterValues ?? {};
    let newSearchFilter: any = {
      ...curSearchFilters
    };
    if (selectedCategory) {
      if (selectedCategory?.type && selectedCategory.type === CategoryParentType.CATEGORY) {
        newSearchFilter.category = selectedCategory.id;
        delete newSearchFilter.folder;
      } else if (selectedCategory?.type && selectedCategory.type === CategoryParentType.FOLDER) {
        newSearchFilter.folder = selectedCategory?.id;
        newSearchFilter.category = selectedCategory?.category?.id;
      } else {
        newSearchFilter.category = selectedCategory?.id;
      }
    } else {
      delete newSearchFilter.folder;
      delete newSearchFilter.category;
    }
    handleChangeCategoryFolder(newSearchFilter.folder, newSearchFilter.category);
  };
  const getHeaderWidth = (keyName: string) => {
    switch (keyName) {
      case 'subject': {
        return '300px';
      }
      case 'photo': {
        return '100px';
      }
      default: {
        return 'auto';
      }
    }
  };
  const getHeaderMinWidth = (keyName: string) => {
    switch (keyName) {
      case 'subject': {
        return '200px';
      }
      default: {
        return null;
      }
    }
  };
  const tableFields = viewingFields.map((_ele: any) => ({
    ..._ele,
    enableSorting: true,
    width: getHeaderWidth(_ele.keyName),
    minWidth: getHeaderMinWidth(_ele.keyName)
  }));

  const getMapColumns = () => {
    return columnRenderRemap(category);
  };

  const tableColumns = useMemo<ColumnDef<any>[]>(() => {
    const groupBy = filterValues.groupBy;
    const isMine =
      groupBy === 'myDrafts' ||
      groupBy === 'myPublished' ||
      groupBy === 'myGroupDrafts' ||
      groupBy === 'myGroupPublished' ||
      groupBy === 'deletedKB' ||
      user.role == 'admin'; //example: having 2 roles is admin and user
    return [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => {
          const isAllowed = isMine;
          return (
            <Checkbox
              {...{
                color: 'secondary',
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
              }}
              // disabled={!isAllowed}
              sx={{ p: 0 }}
            />
          );
        },
        cell: ({ row }) => {
          const owernerCateogry = row?.original?.createdBy?.id;
          const isAllowed = owernerCateogry === user.id || isMine;
          return (
            <div className="pd-x-1">
              <Checkbox
                {...{
                  color: 'secondary',
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler()
                }}
                // disabled={!isAllowed}
                sx={{ p: 0 }}
              />
            </div>
          );
        }
      },
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
      // {
      //   id: 'action',
      //   header: () => <Box>{t('desk_knowledge_field_basic_action')}</Box>,
      //   cell: ({ row }: any) => {
      //     const owernerCateogry = row?.original?.createdBy?.id;

      //     const isAllowed = owernerCateogry === user.id || isMine;

      //     return (
      //       <Button
      //         color={row.original.isPublish ? 'secondary' : 'primary'}
      //         size="small"
      //         variant="contained"
      //         // loading={mUpdate.isLoading}
      //         disabled={!isAllowed}
      //         onClick={() => handlePublish(row.original)}
      //       >
      //         {row.original.isPublish ? t('ncrm_desk_knowledge_base_detail_unpublish') : t('ncrm_desk_knowledge_base_detail_publish')}
      //       </Button>
      //     );
      //   }
      // }
    ];
  }, [tableFields, checkedIds]);
  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: cPaging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };
  //actions for group by delete
  const bottomHeaderDeletedProps = {
    checkedIds: checkedIds,
    actionOnSelected: [
      // action will display when some rows was selected
      {
        value: 'restore',
        label: 'ncrm_common_btn_restore',
        color: 'primary',
        icon: <ReplayOutlined fontSize="small" />,
        onClick: (e: any) => {
          mRestore.mutate({ ids: checkedIds });
        }
      },
      {
        value: 'delete',
        label: 'ncrm_common_btn_delete',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: (e: any) => {
          mEmpty.mutate({ ids: checkedIds });
        }
      }
    ],
    rightAction: [
      // action display on right bottom header by default
      {
        value: 'emptyAll',
        label: 'ncrm_common_btn_empty_recycle_bin',
        color: 'error',
        icon: <DeleteOutline fontSize="small" />,
        onClick: (e: any) => {
          mEmptyAll.mutate({});
        }
      }
    ],
    onCancel: onCancel
  };
  const listTableProps: ListTableProps = {
    rows: itemsList || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    },
    listTableHeaderProps: groupBy == 'deletedKB' ? bottomHeaderDeletedProps : undefined
  };

  const listGridProps: ListGridProps = {
    rows: itemsList || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: fields,
    hideColumns: [],
    columnRenderRemap: getMapColumns(),
    isSmall: isSplitMode,
    children: () => <></>
  };

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              return <ListGridCard {...props} category={category} isSplitMode={isSplitMode} />;
            }}
          </ListGrid>
        );
      default:
        return (
          <>
            {(filterValues.groupBy === 'all' && filterValues?.dateBy == null && filterValues?.filterBy?.length == 0) || isViewMode ? (
              <ListMode
                listTableProps={listTableProps}
                onSelect={handleSelectCategory}
                hideTree={isViewMode}
                selectedCategory={selectedCategory}
              />
            ) : (
              <ListTable {...listTableProps} />
            )}
          </>
        );
    }
  };

  const ListBodyMemo = useMemo(() => {
    if (isMobile) return getTypeBody(ListType.GRID);
    else return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, viewingFields, listType, checkedIds, filterValues]);

  //=================================================DEBUG==============================================
  // console.log('tableColumns', tableColumns);
  // console.log('tableField: ', tableFields);
  // console.log('viewingFields: ', viewingFields);
  // console.log('itemList: ', itemsList);
  // console.log('~~~~groupBy: ', groupBy);

  //======================================================================================================

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
