import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { KEY_NAME_ACTIVITY_SUBJECT } from '@activity/config/keyNames';
import PrintPreview from '@activity/containers/PrintPreview';
import { useActivityDelete } from '@activity/hooks/useActivityDelete';
import { SET_TIMEOUT } from '@base/config/constant';
import { MENU_ACTIVITY } from '@base/config/menus';
import { ACTIVITY_MENU } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import { CachedOutlined, DeleteOutlineOutlined, PrintOutlined } from '@mui/icons-material';

import WritePage from '../WritePage';

interface HeaderProps {
  menu: string;
  menuSource: string;
  menuSourceId: string;
  isSplitMode?: boolean;
  activityType: string;
  layoutData: PageLayoutData; // can get from recoil
  ignoreFields?: string[];
  onRefresh?: any;
}

const Header = (props: HeaderProps) => {
  const { menu, menuSource, menuSourceId = '', isSplitMode, activityType, layoutData, onRefresh, ignoreFields = [] } = props;
  const navigate = useNavigate();

  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  const titleKey = KEY_NAME_ACTIVITY_SUBJECT;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  const { mutationDelete, isSuccess } = useActivityDelete();
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/${MENU_ACTIVITY}/${menu}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [isSuccess]);

  const title = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? ''}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={userPermission}
      />
    );
  }, [titleField]);

  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_activity_print',
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => {
        setShowPrint(true);
      }
    },
    {
      label: 'ncrm_activity_refresh',
      value: 'refresh',
      icon: <CachedOutlined fontSize="small" />,
      onClick: () => {
        onRefresh && onRefresh();
      }
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: 'ncrm_activity_delete',
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mutationDelete({ ids: [menuSourceId] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: ACTIVITY_MENU,
      menu,
      isSplitMode,
      title,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions, activityType]);

  return (
    <Suspense fallback={<></>}>
      {HeaderMemo}
      {showWrite && (
        <WritePage
          isOpen={showWrite}
          onClose={() => setShowWrite(false)}
          category={menuSource}
          type={'view'}
          listType={ListType.LIST}
          menuApi={[menuSource, activityType.toLowerCase()].join('_')}
          // onReload={onRefresh}
        />
      )}
      {showPrint && (
        <PrintPreview isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} ignoreFields={ignoreFields} />
      )}
    </Suspense>
  );
};

export default Header;
