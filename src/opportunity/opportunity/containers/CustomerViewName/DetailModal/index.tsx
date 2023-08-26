import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { MENU_CUSTOMER } from '@base/config/menus';
// import { CustomerQuickView } from '@base/containers/QuickView/Customer';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';

import { Box, TabProps, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Summary from './Summary';
import { CustomerQuickView } from '@base/containers/QuickView';
import Contacts from './Contacts';

interface Props extends QuickViewComponentProps {
  name: string;
}

const DetailModal = (props: Props) => {
  const { value, id, isLoading, name } = props;
  const theme = useTheme();

  const { t } = useTranslation();
  const menuSource = MENU_CUSTOMER;

  const tabs = useMemo(() => {
    return [
      {
        default: false,
        label: t('Summary'),
        path: 'summay',
        order: 2,
        tabComponent: <Summary menuSourceId={id} />
      },
      {
        default: false,
        label: t('Contact'),
        path: 'contact',
        order: 3,
        tabComponent: <Contacts menuSourceId={id} />
      }
    ];
  }, []);

  //   const tabs: any[] = []

  const viewTabsProps = { menuSource, menuSourceId: value?.id, tabs: tabs };
  return (
    <Box minHeight={550}>
      <Box p={2} pb={0}>
        <Typography color={theme.palette.primary.main}>{name}</Typography>
      </Box>
      <ViewTabs {...viewTabsProps} />
    </Box>
  );
};

export default withTextAndPreviewModal(DetailModal, { title: 'Customer Detail' });
