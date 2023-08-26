import { useEffect, useMemo, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus'
import { SET_TIMEOUT } from '@base/config/constant';
import { SETTING_ONLINE_DIGITAL_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import { useLandingPageDelete, useLandingPageUpdate } from '@settings/digital/landing-page/hooks/useLandingPageMutations';
import { LANDING_PAGE_PUBLISH_PUBLISHED } from '@settings/digital/landing-page/config/constants'
import { t } from 'i18next';
//menu
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys'
import WritePage from '@settings/digital/landing-page/pages/WritePage';

//material
import { DeleteOutlineOutlined } from '@mui/icons-material';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';

interface HeaderProps {
  //menu: string;
  menuSource: string; 
  menuCategory: string; 
  menuSourceId: string;
  isSplitMode?: boolean;
  layoutData: PageLayoutData; 
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
  const titleKey = keyNames.KEY_NAME_LANDING_PAGE_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  const customTitleField: any = useMemo(() => {
    return {
      ...titleField,
      config: {
        ...titleField?.config,
        refetchQueryKey: [landingPageQueryKeys.landingPageGet, menuSourceId, 'view']
      }
    };
  }, [titleField]);

  //hooks
  const navigate = useNavigate();
  
  const mDelete = useLandingPageDelete();
  const mUpdate = useLandingPageUpdate(); // Update Landing page Publish state
  // const mutationClone = useCustomerClone();

  useEffect(() => {
    if (mDelete.isSuccess) {
      onRefresh && onRefresh()
      setTimeout(() => {
        // back to list router
        navigate(`settings/digital/landing-page`,  { replace: true }); 
      }, SET_TIMEOUT);
    }
    if (mUpdate.isSuccess){
      onRefresh && onRefresh()
    }
  }, [mDelete.isSuccess, mUpdate.isSuccess]);

  //render title
  const TitleRender = useMemo(() => {
    const userPermission = customTitleField?.config?.viewProps?.userPermission ?? customTitleField?.userPermission;
    return (
      <Title
        value={customTitleField?.data ?? <em>(none)</em>}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource}
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

  const publish = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === keyNames.KEY_NAME_LANDING_PAGE_PUBLISH)?.data.publish;

  if(publish == 'PUBLISH_UNBLISH'){
    moreActions.unshift({
      label: t('ncrm_generalsetting_landing_page_publish_type_published'),
      value: 'publish',
      icon: <TaskOutlinedIcon fontSize="small" color="primary" />,
      onClick: () => {
        const landingPage = {
            id : menuSourceId,
            publish : LANDING_PAGE_PUBLISH_PUBLISHED
          };
        mUpdate.mutate({ landingPage });
      }
    })
  }

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: SETTING_ONLINE_DIGITAL_MENUS,
      menu: 'landing-page',
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
      <WritePage
        isOpen={showWrite}
        onClose={() => setShowWrite(false)}
        onReload={onRefresh}
        // templateGroup='email'
      />
    </>
  );
};

export default Header;
