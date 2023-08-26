import ViewTabs from '@base/components/@hanbiro/ViewTabs';

import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { Box } from '@mui/material';
import { FILE_TYPE_CTA, FILE_TYPE_LANDING_PAGE } from '@quote/config/constants';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import TableTab from './TableTab';

interface ContentAddTabsProps {
  isMulti: boolean;
  handleAddItems: any;
  handlePopClose: () => void;
}

const ContentAddTabs = (props: ContentAddTabsProps) => {
  const { isMulti, handleAddItems, handlePopClose } = props;
  const { t } = useTranslation();
  const tabs: TabProps[] = [
    {
      default: false,
      label: t('Files'),
      path: 'files',
      order: 1,
      // icon: <History fontSize="small" />,
      // iconPosition: 'start',
      tabComponent: (
        <TableTab
          defaultSelectedIds={[]}
          isMulti={isMulti}
          onChange={handleAddItems}
          category={FILE_TYPE_CTA}
          handlePopClose={handlePopClose}
        />
      )
    },
    {
      default: false,
      label: t('Landing page'),
      path: 'landing page',
      order: 2,
      // icon: <History fontSize="small" />,
      // iconPosition: 'start',
      tabComponent: (
        <TableTab
          defaultSelectedIds={[]}
          isMulti={isMulti}
          onChange={handleAddItems}
          category={FILE_TYPE_LANDING_PAGE}
          handlePopClose={handlePopClose}
        />
      )
    }
  ];

  const viewTabsProps = { menuSource: '', menuSourceId: '', tabs: tabs };

  const tabsMemo = useMemo(() => {
    return <ViewTabs {...viewTabsProps} />;
  }, []);

  return <Box width={670}>{tabsMemo}</Box>;
};

export default ContentAddTabs;
