import { useMemo } from 'react';
import _ from 'lodash';
import { ColumnDef } from '@tanstack/react-table';

// mui import
import { Checkbox, useMediaQuery, useTheme, Grid } from '@mui/material';

// project import
import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_PRODUCT_UNIT } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import GridList from '@base/components/@hanbiro/List/GridList';
import useDevice from '@base/hooks/useDevice';
import { KEY_ITEM_PRODUCT, KEY_ITEM_UNIT, KEY_ITEM_IMAGES } from '@product/item/config/keyNames';
import { defaultColumnsRender } from '@base/components/@hanbiro/ReactTable8/Helper';

// menu import
import ListGridCard from '@product/unit/containers/ListGridCard';
import { sortsBy } from '@product/unit/config/list-field';
import { columnRenderRemap } from './Helper';
import * as keyNames from '@product/unit/config/keyNames';

interface BodyProps {
  [x: string]: any;
}

const Body = (props: BodyProps) => {
  const { isSplitMode, category, fields, itemsList, paging = {}, checkedIds, onChecked, isRowSpanned } = props;
  const { isMobile } = useDevice();

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const layoutKey: string = MENU_PRODUCT_UNIT;
  const {
    listType: cListType,
    settingColumns,
    filterValues,
    setSort,
    setPaging,
    paging: cPaging,
    getViewingFields
  } = useListPageSettings(layoutKey);
  const groupBy = filterValues?.groupBy;
  const groupByProdPerUnit = groupBy == 'prodPerUnit'

  const unitListSortByProductName = _.cloneDeep(itemsList).sort((a: any, b: any) => { // grouping unit by sort to spanned all item have same product group
    return a?.prod?.name >= b?.prod?.name ? 1 : -1;
  });

  let listType = matchesSm ? ListType.GRID : cListType;

  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const getMapColumns = () => {
    return columnRenderRemap(category, groupByProdPerUnit);
  };

  const getMapGridColumns = () => {
    return {
      ...defaultColumnsRender,
      ...columnRenderRemap(category, groupByProdPerUnit)
    };
  };

  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: sortsBy?.findIndex((v: any) => v.value === _ele.keyName) >= 0 || _ele?.keyName == keyNames.KEY_UNIT_ACTIVE,
        width: _ele.keyName === 'photo' ? '100px' : 'auto'
      });
    });
    return newFields;
  }, [viewingFields, category]);

  const tableColumns = useMemo<ColumnDef<any>[]>(
    groupByProdPerUnit ? 
    () => [
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ]
    :
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
            sx={{ p: 0 }}
          />
        ),
        cell: ({ row }) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                color: 'secondary',
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
              sx={{ p: 0 }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ],
    [tableFields, checkedIds]
  );

  const getConfigRowSpanned = (data: any) => {
    let colEnable = [KEY_ITEM_UNIT,KEY_ITEM_PRODUCT];
    let baseRows = [...data];
    const rows = baseRows.map((item) => {
      return {
        ...item,
        [KEY_ITEM_UNIT]: {
          ...item?.[KEY_ITEM_UNIT],
          isRowSpanned: false,
          rowSpan: 1
        },
        [KEY_ITEM_PRODUCT]: {
          ...item?.[KEY_ITEM_PRODUCT],
          isRowSpanned: false,
          rowSpan: 1
        },
        // fixed wrong display when table cell first-of-type apply on image item from 2nd to end
        // [KEY_ITEM_IMAGES]: {
        //   ...item?.[KEY_ITEM_IMAGES],
        //   isRowSpanned: false,
        //   rowSpan: 1
        // }
      };
    });

    let topCellIndex = 0;
    colEnable.forEach((item: string, index: number) => {
      for (let i = 1; i < rows.length; i++) {
        if (index == 0) {
          if (rows[i][item].id == undefined && rows[topCellIndex][item].id == undefined) {
            rows[i][item].isRowSpanned = true;
            rows[topCellIndex][item].rowSpan++;
            // rows[i][item].id = topCellIndex;
            // rows[i][item].name = 'null';
          } else if (rows[topCellIndex][item].id == rows[i][item].id && rows[i][item].id != undefined) {
            rows[i][item].isRowSpanned = true;
            rows[topCellIndex][item].rowSpan++;
          } else {
            topCellIndex = i;
          }
        } 
        else {
          const preIndex = index - 1;
          if (
            rows[topCellIndex][item]?.id == rows[i][item]?.id &&
            rows[topCellIndex][colEnable[preIndex]]?.id == rows[i][colEnable[preIndex]]?.id
          ) {
            rows[i][item].isRowSpanned = true;
            rows[topCellIndex][item].rowSpan++;
          } else {
            topCellIndex = i;
          }
        }
      }
      topCellIndex = 0;
    });
    return rows;
  };

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const GridMemo = useMemo(() => {
    const handleOnRowChecked = (cId: string) => {
      const newCheckedIds = _.cloneDeep(checkedIds);
      const fIndex = newCheckedIds?.findIndex((v: string) => v === cId);
      if (fIndex >= 0) {
        newCheckedIds.splice(fIndex, 1);
      } else {
        newCheckedIds.push(cId);
      }
      onChecked && onChecked(newCheckedIds);
    };

    return (
      <GridList pagingProps={pagingProps} onPageChange={handlePagingChange} isSmall={isSplitMode || isMobile}>
        {itemsList?.map((item: any, index: number) => {
          return (
            <Grid key={item.id} item xs={12} {...(isSplitMode || isMobile ? { pt: '0px !important' } : { sm: 6, lg: 4 })}>
              <ListGridCard
                {...{
                  data: item,
                  isChecked: checkedIds?.indexOf(item?.id) >= 0
                }}
                onChecked={handleOnRowChecked}
                isSplitMode={isSplitMode || isMobile} //new listGridCard props
                fields={fields}
                mapFields={getMapGridColumns()}
              />
            </Grid>
          );
        })}
      </GridList>
    );
  }, [itemsList, fields, isSplitMode, checkedIds, isMobile]);

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        // const listGridProps: ListGridProps = {
        //   rows: itemsList || [],
        //   checkedIds,
        //   onRowChecked: onChecked,
        //   pagingProps,
        //   onPageChange: handlePagingChange,
        //   columns: fields,
        //   hideColumns: [],
        //   columnRenderRemap: getMapColumns(),
        //   isSmall: isSplitMode,
        //   children: () => <></>
        // };
        // return (
        //   <ListGrid {...listGridProps}>
        //     {(props) => {
        //       return <ListGridCard {...props} />;
        //     }}
        //   </ListGrid>
        // );
        return GridMemo
      default:
        const listTableProps: ListTableProps = {
          rows: isRowSpanned ? getConfigRowSpanned(unitListSortByProductName) : itemsList || [],
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
          isRowSpanned: isRowSpanned
        };
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, viewingFields, listType, checkedIds]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
