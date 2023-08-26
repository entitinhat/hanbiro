import { useMemo } from 'react';

import {
  ArticleOutlined,
  History,
  QueryStats
} from '@mui/icons-material';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { PageLayoutData } from '@base/types/pagelayout';

import ViewDetail from '@analytic/sus-log/containers/ViewDetail';
import ViewAnalytic from "@analytic/sus-log/containers/ViewAnalytic";
import ViewClickTimeLine from "@analytic/sus-log/containers/ViewClickTimeLine";
import * as baseKeyNames from "@base/config/keyNames";

interface CenterProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;

  const createdAtData: any = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === baseKeyNames.KEY_NAME_CREATED_AT) ?? '';

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'Details',
        path: 'detail',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <ViewDetail
            menuSource={menuSource}
            menuSourceId={menuSourceId}
            layoutData={layoutData}
            ignoreFields={ignoreFields}
          />
        )
      },
      {
        default: false,
        label: 'Analytics',
        path: 'analytics',
        order: 1,
        icon: <QueryStats fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <ViewAnalytic menuSourceId={menuSourceId} data={{createdAt: createdAtData?.data ?? ''}}/>
      },
      {
        default: false,
        label: 'Click Timeline',
        path: 'timeline',
        order: 2,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <ViewClickTimeLine menuSourceId={menuSourceId}/>
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
