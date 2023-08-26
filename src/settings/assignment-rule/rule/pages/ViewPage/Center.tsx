import { useMemo } from 'react';

import ViewDetail from '@settings/assignment-rule/rule/containers/ViewDetail';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { PageLayoutData } from '@base/types/pagelayout';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;
  console.log('Center section', layoutData);
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'Detail',
        path: 'detail',
        order: 0,
        tabComponent: <ViewDetail menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />
      }
    ];
  }, [layoutData]);
  const viewTabsProps = { menuSource, menuSourceId, tabs };
  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);
  //return <>{centerMemo}</>;

  return <ViewDetail menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />;
};

export default Center;
