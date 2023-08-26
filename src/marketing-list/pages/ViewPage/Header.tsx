import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { SET_TIMEOUT } from '@base/config/constant';
import { MENU_CUSTOMER } from '@base/config/menus';
import { CUSTOMER_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import Icon from '@base/assets/icons/svg-icons';

//menu
import * as keyNames from '@marketing-list/config/keyNames';
import WritePage from '@marketing-list/pages/WritePage';

//material
import { CachedOutlined, ContentCopyOutlined, DeleteOutlineOutlined, PrintOutlined } from '@mui/icons-material';
import { KEY_CUSTOMER_CLONE, KEY_CUSTOMER_MERGE } from '@marketing-list/config/constants';
import { useTranslation } from 'react-i18next';
import useMarketingDelete from '@marketing-list/hooks/useMarketingDelete';
import { queryClient } from '@base/config/queryClient';
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';

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

  console.log('menuSource: ', menuSource);
  console.log('menuCategory: ', menuCategory);

  // delete
  const mDelete = useMarketingDelete();

  // //restore deleted items
  const handleDelete = () => {
    mDelete.mutate(
      { ids: [menuSourceId] },
      {
        onSuccess: (data: any) => {
          queryClient.refetchQueries({ queryKey: [marketingQueryKeys.marketingListsGet], type: 'inactive' });
          setTimeout(() => {
            navigate('/customer/marketing', { replace: true });
          }, SET_TIMEOUT);
        }
      }
    );
  };

  //constants
  const titleKey = keyNames.KEY_NAME_CUSTOMER_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //hooks
  const navigate = useNavigate();

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
        handleDelete();
      }
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: CUSTOMER_MENUS,
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
        menuApi={[MENU_CUSTOMER, menuCategory.toLowerCase()].join('_')}
        onReload={onRefresh}
      />
    </>
  );
};

export default Header;
