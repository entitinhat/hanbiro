import React, {useMemo, useState} from 'react';
import {ChartComponentProps} from "@analytic/main/components/ChartBox";
import {useTranslation} from 'react-i18next';
import ColumnStacked from "@analytic/main/components/ApexCharts/ColumnStacked";
import useGetSusCampaignCounting from "@analytic/main/hooks/useGetSusCampaignCounting";
import ListPagination, {ListPaginationProps} from "@base/components/@hanbiro/List/ListPagination";
import {LIST_TABLE_PAGE_SIZE} from "@base/config/constant";

const SusCampaign = (props: ChartComponentProps) => {
  const {filters = {}} = props;
  const {t} = useTranslation()

  const [listFilter, setListFilter] = useState<any>({
    filter: {
      ...(filters?.filter ?? {}),
      paging: {
        page: 1,
        size: 10
      }
    }
  });

  const {data} = useGetSusCampaignCounting(listFilter ?? {});

  const results = data?.results ?? [];
  const paging: any = data?.paging ?? {};

  let oData: any = {
    categories: [],
    clicked: {
      name: (t('ncrm_sus_status_clicked') as string),
      data: [],
    },
    noClicked: {
      name: (t('ncrm_sus_status_no_clicked') as string),
      data: [],
    }
  };

  if (!!results) {
    oData = results?.reduce(
      (f: any, v: any) => {
        f['categories'].push(v?.idName?.name ?? '-');
        f['clicked']['data'].push(v?.number1);
        f['noClicked']['data'].push(v?.number2);
        return f;
      }, oData);
  }

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const handlePagingChange = (page: number, size: number) => {
    console.log("Changed");
    setListFilter({
      filter: {
        ...listFilter.filter,
        paging: {
          page,
          size
        }
      }
    });
  };

  const PaginationMenu = useMemo(() => {
    return <ListPagination
      sx={{
        justifyContent: 'flex-end!important'
      }}
      isSmall={true}
      gotoPage={(page: number) => handlePagingChange && handlePagingChange(page, pagingProps.pageSize)}
      setPageSize={(size: number, pageIndex) => handlePagingChange && handlePagingChange(pageIndex ?? pagingProps.pageIndex, size)}
      pageSize={pagingProps.pageSize}
      pageIndex={pagingProps.pageIndex}
      pageTotal={pagingProps.pageTotal}
      pageCount={pagingProps.pageCount}
    />;
  }, [pagingProps.pageIndex]);

  return <>
    <ColumnStacked
      categories={oData?.categories ?? []}
      series={[oData.clicked, oData.noClicked]}
      height={'85%'}
      width={'98%'}
    />
    {PaginationMenu}
  </>;
};

export default SusCampaign;
