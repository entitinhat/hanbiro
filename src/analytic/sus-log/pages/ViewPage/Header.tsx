import React, { Suspense, useEffect, useMemo, useState } from 'react';

import { ANALYTIC_MENU } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_SALES_QUOTE } from '@base/config/menus';

//menu
import * as keyNames from '@analytic/sus-log/config/keyNames';
import WritePage from '@quote/pages/WritePage';
import PrintPreview from '@quote/containers/PrintPreview';

//material
import { CachedOutlined, PrintOutlined } from '@mui/icons-material';
import { QUOTE_CATEGORY_ORIGINAL } from '@quote/config/constants';

interface HeaderProps {
  //menu: string;
  menuSource: string; //e.g: setting_survey
  menuCategory: string; //e.g: survey
  menuSourceId: string;
  isSplitMode?: boolean;
  layoutData: PageLayoutData; // can get from recoil
  ignoreFields?: string[];
  onRefresh?: () => void;
}

const Header = (props: HeaderProps) => {
  const {
    //menu,
    menuSource,
    menuCategory,
    menuSourceId = '',
    isSplitMode,
    layoutData,
    ignoreFields = [],
    onRefresh
  } = props;

  //state
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  //constants
  const titleKey = keyNames.SUS_LOG_SURL;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //render title
  const TitleRender = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? <em>(none)</em>}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={userPermission}
      />
    );
  }, [titleField]);

  //action events
  const moreActions: LabelValueIcon[] = [
    {
      label: 'Print',
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => {
        setShowPrint(true);
      }
    },
    {
      label: 'Refresh',
      value: 'refresh',
      icon: <CachedOutlined fontSize="small" />,
      onClick: () => {
        onRefresh && onRefresh();
      }
    },
    {
      label: 'Divider',
      value: 'divider'
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: ANALYTIC_MENU,
      menu: 'sus-log',
      isSplitMode,
      title: TitleRender,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menuSource, isSplitMode, titleField, moreActions]);

  return (
    <>
      {HeaderRender}
      <WritePage
        isOpen={showWrite}
        category={QUOTE_CATEGORY_ORIGINAL}
        onClose={() => setShowWrite(false)}
        menuApi={MENU_SALES_QUOTE}
        onReload={onRefresh}
      />
      <PrintPreview isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} />
    </>
  );
};

export default Header;
