import React, { Suspense, useMemo } from 'react';

import { PROJECT_MENU } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { KEY_NAME_TASK_NAME } from '@project/config/keyNames';
import { CachedOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
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
  const { t } = useTranslation();
  const titleKey = KEY_NAME_TASK_NAME;

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
    },
    {
      label: 'Delete',
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        // mutationDelete({ ids: [menuSourceId] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: PROJECT_MENU.map((_item) => ({ ..._item, label: t(_item.label) })),
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
