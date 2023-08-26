import { useMemo, Suspense } from 'react';

// mui import
import { useTheme } from '@mui/material';

// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';

import Title from '@base/containers/ViewField/Title';

import { User } from '../../types';
import * as keyNames from '@settings/users-groups/users/config/keyNames';
import { useTranslation } from 'react-i18next';
import { USER_VIEW_USERS } from '../../config/constants';
interface HeaderProps {
  menu: string;
  menuSource: string;
  menuSourceId: string;
  layoutData?: User;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();

  const { menuSource, menuSourceId, menu, layoutData } = props;
  const { t } = useTranslation();

  const title = useMemo(() => {
    const titleKey = keyNames.KEY_USER_DISPLAY_NAME;
    return (
      <Title value={layoutData?.[titleKey] ?? ''} keyName={titleKey} menuSourceId={menuSourceId ?? ''} menuSource={menuSource ?? ''} />
    );
  }, [layoutData]);

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: [
        {
          value: 'users',
          label: t(USER_VIEW_USERS),
          path: '/settings/manage-users-groups/users'
        }
      ],
      menu,
      title
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, title]);

  return <Suspense fallback={<></>}>{HeaderMemo}</Suspense>;
};

export default Header;
