import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//material
import { CachedOutlined, ContentCopyOutlined, DeleteOutlineOutlined, PrintOutlined } from '@mui/icons-material';

//project
import { SET_TIMEOUT } from '@base/config/constant';
import { MENU_CAMPAIGN } from '@base/config/menus';
import { CAMPAIGN_ROUTE_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import Icon from '@base/assets/icons/svg-icons';

//menu
import * as keyNames from '@campaign/config/keyNames';
import useCampaignDelete from '@campaign/hooks/useCampaign';
import WritePage from '@campaign/pages/WritePage';
import PrintPreviewView from '@campaign/containers/PrintPreviewView';

interface HeaderProps {
  routeCategory: string;
  menuSource: string; //e.g: customer
  menuCategory: string; //e.g: account
  menuSourceId: string;
  isSplitMode?: boolean;
  layoutData: PageLayoutData; // can get from recoil
  ignoreFields?: string[];
  onRefresh?: () => void;
}

const Header = (props: HeaderProps) => {
  const { routeCategory, menuSource, menuCategory, menuSourceId = '', isSplitMode, layoutData, ignoreFields = [], onRefresh } = props;
  const { t } = useTranslation(); //state
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  //constants
  const titleKey = keyNames.KEY_CAMPAIGN_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //hooks
  const navigate = useNavigate();
  const mutationDelete = useCampaignDelete({ category: menuCategory, onCancel: undefined, onReload: undefined });
  //const mutationClone = useCustomerClone();

  useEffect(() => {
    if (mutationDelete.isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/${MENU_CAMPAIGN}/${routeCategory}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mutationDelete.isSuccess]);

  // useEffect(() => {
  //   if (mutationClone.isSuccess) {
  //     if (mutationClone.data?.id) {
  //       setTimeout(() => {
  //         // back to list router
  //         navigate(`/${MENU_CAMPAIGN}/${routeCategory}/${mutationClone.data.id}`, { replace: true });
  //       }, SET_TIMEOUT);
  //     }
  //   }
  // }, [mutationClone.isSuccess]);

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
        userPermission={{ ...userPermission, isEdit: layoutData?.data?.restore?.id ? false : userPermission?.isEdit ?? false }}
      />
    );
  }, [titleField]);

  //action events
  const moreActions: LabelValueIcon[] = [
    {
      label: t('ncrm_common_print'),
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => {
        setShowPrint(true);
      }
    },
    // {
    //   label: t('ncrm_common_clone'),
    //   value: KEY_CUSTOMER_CLONE,
    //   icon: <ContentCopyOutlined fontSize="small" />,
    //   onClick: () => {
    //     mutationClone.mutate({ id: menuSourceId });
    //   }
    // },
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
      label: t('ncrm_common_delete'),
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mutationDelete.mutate({ ids: [menuSourceId] });
      }
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: CAMPAIGN_ROUTE_MENUS,
      menu: routeCategory,
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
        category={menuCategory}
        menuApi={[MENU_CAMPAIGN, menuCategory.toLowerCase()].join('_')}
        onReload={onRefresh}
      />
      <PrintPreviewView isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} />
    </>
  );
};

export default Header;
