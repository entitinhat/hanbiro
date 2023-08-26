import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import { PageLayoutData } from '@base/types/pagelayout';

import ViewDetail from '@product/item/containers/ViewDetail';
import { Item } from '@product/item/types/item';
import { queryKeys } from '@product/item/config/queryKeys';
import { KEY_ITEM_ASSOCIATED_ITEMS, KEY_ITEM_TYPE } from '@product/item/config/keyNames';
import { PRODUCT_ITEM_TYPE_ENUM_COMPOSITE } from '@product/main/config/constants';
import AssociatedItems from '@product/item/containers/AssociatedItems';
import Attachments from '@base/containers/Attachments';

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

  // get viewData from queryClient
  const data = queryClient.getQueryData<Item>([queryKeys.viewItem, menuSourceId]);
  const itemType = data?.[KEY_ITEM_TYPE];
  const associatedItems = data?.[KEY_ITEM_ASSOCIATED_ITEMS] || [];

  const tabs: TabProps[] = useMemo(() => {
    const _tabs: TabProps[] = [
      {
        default: true,
        label: 'ncrm_common_detail',
        path: 'detail',
        order: 0,
        tabComponent: <ViewDetail menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />
      },
      {
        default: false,
        label: 'ncrm_common_timeline',
        path: 'timeline',
        order: 2,
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'common_section_attachment',
        path: 'attachment',
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

    if (itemType === PRODUCT_ITEM_TYPE_ENUM_COMPOSITE) {
      _tabs.splice(1, 0, {
        default: false,
        label: 'product_item_field_basic_associateditems',
        path: 'associated-items',
        order: 1,
        tabComponent: <AssociatedItems value={associatedItems} itemId={menuSourceId} />
      });
    }

    return _tabs;
  }, [layoutData, itemType]);

  const viewTabsProps = { menuSource, menuSourceId, tabs };

  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);

  return <>{centerMemo}</>;
};

export default Center;
