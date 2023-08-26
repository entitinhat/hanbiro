import React, { Suspense, useMemo } from 'react';

import { PROCESS_MENU } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { CachedOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { KEY_NAME_BUSINESS_NAME } from '@process/config/keyNames';
import { useTranslation } from 'react-i18next';
interface HeaderProps {
  menu: string;
  menuSource: string;
  menuSourceId: string;
  isSplitMode?: boolean;
  name?: string;
  onRefresh?: any;
}

const Header = (props: HeaderProps) => {
  const { menu, menuSource, menuSourceId = '', isSplitMode, onRefresh, name = '' } = props;
  const titleKey = KEY_NAME_BUSINESS_NAME;
  const { t } = useTranslation()

  const title = useMemo(() => {
    return (
      <Title
        value={name}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ isEdit: false, isShow: true }}
      />
    );
  }, [name]);

  const moreActions: LabelValueIcon[] = [
    {
      label: t('ncrm_common_btn_refresh'),
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
      label: t('ncrm_common_btn_delete'),
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        // mutationDelete({ ids: [menuSourceId] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: PROCESS_MENU,
      menu,
      isSplitMode,
      title,
      moreActions,
      onNew: (mode?: string) => {
        // setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

  return <Suspense fallback={<></>}>{HeaderMemo}</Suspense>;
};

export default Header;
