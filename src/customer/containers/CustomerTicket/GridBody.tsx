import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

//project
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { Ticket } from '@desk/ticket/types/ticket';
import { columnRenderRemap } from '@desk/ticket/pages/ListPage/Helper';
import { DESC, ASC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import * as keyNames from '@customer/config/keyNames';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import ListGridCard from '@desk/ticket/containers/ListGridCard';

interface BodyProps {
  category: string;
  fields: any[];
  itemsList: Ticket[];
}

const PageBody = (props: BodyProps) => {
  const {
    category, //router category
    fields,
    itemsList
  } = props;
  const { t } = useTranslation();
  //state

  const getMapColumns = () => {
    return columnRenderRemap(category);
  };

  //=====GRID
  const listGridProps: ListGridProps = {
    rows: itemsList || [],
    columns: fields,
    hideColumns: [],
    columnRenderRemap: getMapColumns(),
    itemPerRow: 2,
    children: () => <></>
  };
  //==========
  //v8: body
  const ListBodyMemo = useMemo(() => {
    return (
      <>
        <ListGrid {...listGridProps}>
          {(props) => {
            return <ListGridCard {...props} category={category} disableCheckBox={true} />;
          }}
        </ListGrid>
      </>
    );
  }, [itemsList]);

  //main
  return <>{ListBodyMemo}</>;
};

export default PageBody;
