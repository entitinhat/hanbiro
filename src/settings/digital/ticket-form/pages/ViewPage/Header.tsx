import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { SET_TIMEOUT } from '@base/config/constant';
import { SETTING_ONLINE_DIGITAL_MENUS } from '@base/config/routeMenus';
import { MENU_SETTING, MENU_SETTING_TICKET_FORM } from '@base/config/menus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import WritePage from '@settings/digital/ticket-form/pages/WritePage';

//material
import { CachedOutlined, DeleteOutlineOutlined, PrintOutlined } from '@mui/icons-material';
import { useTicketFormDelete } from '@settings/digital/ticket-form/hooks/useTicketFormMutation';
import { useTranslation } from 'react-i18next';

// import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';

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
  const { t } = useTranslation();

  //state
  const [showWrite, setShowWrite] = useState<boolean>(false);

  //constants
  const titleKey = keyNames.KEY_TICKET_FORM_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //hooks
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mDelete = useTicketFormDelete();
  const menu = 'form';

  useEffect(() => {
    if (mDelete.isSuccess) {
      onRefresh;
      queryClient.invalidateQueries({
        queryKey: ['setting_ticketForms'],
        refetchType: 'inactive'
      });
      setTimeout(() => {
        // back to list router
        navigate(`/settings/digital/form`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mDelete.isSuccess]);

  const customTitleField: any = useMemo(() => {
    return {
      ...titleField,
      config: {
        ...titleField?.config,
        refetchQueryKey: [MENU_SETTING_TICKET_FORM, menuSourceId, 'view']
      }
    };
  }, [titleField]);

  //render title
  const TitleRender = useMemo(() => {
    const userPermission = customTitleField?.config?.viewProps?.userPermission ?? customTitleField?.userPermission;
    return (
      <Title
        value={customTitleField?.data ?? <em>(none)</em>}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={customTitleField?.config}
        userPermission={userPermission}
      />
    );
  }, [titleField]);

  //action events
  const moreActions: LabelValueIcon[] = [
    {
      label: t('ncrm_common_btn_delete'),
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mDelete.mutate({ ids: [menuSourceId] });
      }
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: SETTING_ONLINE_DIGITAL_MENUS,
      menu: menu,
      isSplitMode,
      title: TitleRender,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [isSplitMode, titleField, moreActions]);

  return (
    <>
      {HeaderRender}
      <WritePage isOpen={showWrite} onClose={() => setShowWrite(false)} menuApi={MENU_SETTING_TICKET_FORM} onReload={onRefresh} />
    </>
  );
};

export default Header;
