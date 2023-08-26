import { useMemo } from 'react';

import { ArticleOutlined, History, NoteAltOutlined } from '@mui/icons-material';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { PageLayoutData } from '@base/types/pagelayout';
import ViewDetail from '@product/unit/containers/ViewDetail';
import { useQueryClient } from '@tanstack/react-query';
import { BaseUnit } from '@product/unit/types/unit';
import { queryKeys } from '@product/unit/config/queryKeys';
import { KEY_UNIT_VALUES } from '@product/unit/config/keyNames';
import { MENU_PRODUCT_UNIT } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import RelatedProductTable from '@product/unit/containers/RelatedProductTable';

import Timeline from '@base/containers/TimeLine';

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
  const data = queryClient.getQueryData<BaseUnit>([queryKeys.viewBaseUnit, menuSourceId]);

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'ncrm_common_detail',
        path: 'detail',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <ViewDetail
            menuSource={menuSource}
            menuSourceId={menuSourceId}
            value={data?.[KEY_UNIT_VALUES] || []}
            canEdit={data?.restore?.id ? false : true}
          />
        )
      },
      {
        default: false,
        label: 'ncrm_common_menu_product_product',
        path: 'product',
        order: 1,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <RelatedProductTable menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: 'ncrm_common_timeline',
        path: 'timeline',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
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
