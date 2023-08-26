import React, { useMemo, useState, Suspense } from 'react';

// mui import
import { useMediaQuery, useTheme } from '@mui/material';

// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { SETTING_ASSIGNMENT_RULE } from '@base/config/routeMenus';
import { KEY_NAME_ASSIGNMENT_RULE_NAME } from '@settings/assignment-rule/rule/config/keyNames';
import Title from '@base/containers/ViewField/Title';
import WritePage from '../WritePage';
import { PageLayoutData } from '@base/types/pagelayout';
import { CopyAllOutlined, DeleteOutline, PrintOutlined } from '@mui/icons-material';
import { MENU_DESK_TICKET } from '@base/config/menus';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { useAssignRuleDelete } from '@settings/assignment-rule/rule/hooks/useAssignRuleDelete';
import { useAssignRuleCopy } from '@settings/assignment-rule/rule/hooks/useAssignRuleCopy';
import { MENU_SETTING_ASSIGNMENT_RULE } from '@base/config/menus';
import { toAny } from '@base/utils/helpers/stringUtils';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  // menuSource: string;
  // menuSourceId: string;
  layoutData: PageLayoutData;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const { menu, isSplitMode, layoutData } = props;
  const { menuSource, data } = layoutData;
  let { menuSourceId } = layoutData;

  const [showWrite, setShowWrite] = useState<boolean>(false);
  const titleKey = KEY_NAME_ASSIGNMENT_RULE_NAME;
  const { mutationDelete, isSuccess } = useAssignRuleDelete();
  const { mutationCopy } = useAssignRuleCopy();

  const title = useMemo(() => {
    return (
      <Title
        value={data?.[titleKey]}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ isEdit: true, isShow: true }}
      />
    );
  }, [layoutData]);

  const moreActions: LabelValueIcon[] = [
    /*{
      label: 'Print',
      value: 'print',
      icon: <PrintOutlined />
      // onClick: () => setIsOpenReply(true),
    },*/
    {
      label: t('ncrm_common_clone'),
      value: 'clone',
      icon: <CopyAllOutlined />,
      onClick: () => {
        mutationCopy({ id: toAny(menuSourceId) });
        navigate(`/settings/assignment/rule`);
      }
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: t('ncrm_common_delete'),
      value: 'delete',
      icon: <DeleteOutline />,
      onClick: () => {
        mutationDelete({ id: toAny(menuSourceId) });
        navigate(`/settings/assignment/rule`);
      }
    }
  ];
  console.log('>>>>>>>> menu', menu);
  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: SETTING_ASSIGNMENT_RULE,
      menu,
      isSplitMode,
      title,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

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
          menuApi={MENU_DESK_TICKET}
          // onReload={onRefresh}
        />
      )}
    </Suspense>
  );
};

export default Header;
