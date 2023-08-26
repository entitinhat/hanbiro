import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { PageLayoutData } from '@base/types/pagelayout';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import Attachments from '@base/containers/Attachments';

import { Product } from '@product/product/types/product';
import { queryKeys } from '@product/product/config/queryKeys';
import Items from '@product/product/containers/Items';
import RelatedCustomerTable from '@product/product/containers/RelatedCustomerTable';
import { User } from '@base/types/user';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<Product>([queryKeys.viewProduct, menuSourceId]);
  const isDeleted = data?.restore?.id ? true : false

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'product_product_field_basic_items',
        path: 'item',
        order: 0,
        tabComponent: <Items menuSourceId={menuSourceId} canAddNew={!isDeleted} />
      },
      {
        default: false,
        label: 'ncrm_common_timeline',
        path: 'timeline',
        order: 1,
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} getAssignRep={() => {
          return data?.assignTo as User
        }} />
      },
      {
        default: false,
        label: 'ncrm_product_field_more_related_customer',
        path: 'customer',
        order: 2,
        tabComponent: <RelatedCustomerTable menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'common_section_attachment',
        path: 'attachments',
        order: 3,
        tabComponent: <Attachments menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'ncrm_common_notes',
        path: 'note',
        order: 4,
        tabComponent: <Notes menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];
  }, [layoutData]);

  const viewTabsProps = { menuSource, menuSourceId, tabs };

  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);

  return <>{centerMemo}</>;
};

export default Center;
