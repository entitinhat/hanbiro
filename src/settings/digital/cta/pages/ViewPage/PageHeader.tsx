import { useEffect, useMemo, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { SET_TIMEOUT } from '@base/config/constant';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@settings/digital/cta/config/keyNames';
import { useCtaMutations } from '@settings/digital/cta/hooks/useCtaMutations';
import WritePage from '@settings/digital/cta/pages/WritePage';

//material
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';
import { MENU_SETTING_CTA } from '@base/config/menus';
import { t } from 'i18next';
import { SETTING_ONLINE_DIGITAL_MENUS } from '@base/config/routeMenus';

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

  //constants
  const titleKey: string = keyNames.KEY_SETTING_CTA_NAME;
  const titleField: any = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  const customTitleField: any = useMemo(() => {
    return {
      ...titleField,
      config: {
        ...titleField?.config,
        refetchQueryKey: [MENU_SETTING_CTA, menuSourceId, 'view']
      }
    };
  }, [titleField]);

  //hooks
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mDelete }: any = useCtaMutations();

  // handlers
  const handleDelete = () => {
    mDelete.mutate(
      { ids: [menuSourceId] },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ['setting_ctas'], type: 'inactive' });
        }
      }
    );
  };

  useEffect(() => {
    if (mDelete.isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/settings/digital/${menuCategory}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mDelete.isSuccess]);

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
      value: 'DELETE',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: handleDelete
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: SETTING_ONLINE_DIGITAL_MENUS,
      menu: menuCategory,
      isSplitMode,
      title: TitleRender,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menuCategory, isSplitMode, titleField, moreActions]);

  return (
    <>
      {HeaderRender}
      <WritePage isOpen={showWrite} onClose={() => setShowWrite(false)} menuApi={menuSource} onReload={onRefresh} />
    </>
  );
};

export default Header;
