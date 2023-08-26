import React, { Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PROJECT_MENU } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { WriteOption } from '@base/types/common';
import { CachedOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { KEY_NAME_PROJECT_NAME } from '@project/config/keyNames';
import WritePage from '@project/pages/WritePage/Planning';

interface HeaderProps {
  menu: string;
  menuSource: string;
  menuSourceId: string;
  isSplitMode?: boolean;
  name?: string;
  onRefresh?: any;
}

const Header = (props: HeaderProps) => {
  console.log('props', props);
  const { menu, menuSource, menuSourceId = '', isSplitMode, onRefresh, name = '' } = props;
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const { t } = useTranslation();
  const titleKey = KEY_NAME_PROJECT_NAME;

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
      menus: PROJECT_MENU.map((_item) => ({ ..._item, label: t(_item.label) })),
      menu,
      isSplitMode,
      title,
      moreActions,
      onNew: (mode?: string) => {
        setWriteOption({
          writeType: '',
          isOpenWrite: true
        });
      },
      newTitle: t('ncrm_project_planning') as string
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

  return (
    <Suspense fallback={<></>}>
      {HeaderMemo}
      <WritePage
        projectId={menuSourceId}
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
      />
    </Suspense>
  );
};

export default Header;
