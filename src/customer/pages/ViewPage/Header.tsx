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
import * as keyNames from '@customer/config/keyNames';
import useCustomerDelete from '@customer/hooks/useCustomerDelete';
import WritePage from '@customer/pages/WritePage';
import PrintPreview from '@customer/containers/PrintPreview';

//material
import { CachedOutlined, ContentCopyOutlined, DeleteOutlineOutlined, PrintOutlined } from '@mui/icons-material';
import { CUSTOMER_CATEGORY_ALL, KEY_CUSTOMER_CLONE, KEY_CUSTOMER_MERGE } from '@customer/config/constants';
import CustomerMergeModal from '@customer/containers/Merge';
import useCustomerClone from '@customer/hooks/useCustomerClone';
import { useTranslation } from 'react-i18next';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { Customer } from '@customer/types/interface';

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
  const [showMerge, setShowMerge] = useState<boolean>(false);
  const queryClient = useQueryClient();

  //constants
  const titleKey = keyNames.KEY_NAME_CUSTOMER_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //hooks
  const navigate = useNavigate();
  const mutationDelete = useCustomerDelete({ category: menuCategory, onCancel: undefined, onReload: undefined });
  const mutationClone = useCustomerClone();

  useEffect(() => {
    if (mutationDelete.isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/${MENU_CUSTOMER}/${routeCategory}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mutationDelete.isSuccess]);

  useEffect(() => {
    if (mutationClone.isSuccess) {
      if (mutationClone.data?.id) {
        setTimeout(() => {
          let url = `/${MENU_CUSTOMER}/${menuCategory}/${mutationClone.data.id}`;
          if (routeCategory === CUSTOMER_CATEGORY_ALL) {
            url = `/${MENU_CUSTOMER}/${routeCategory}/${mutationClone.data.id}/${menuCategory}`;
          }
          navigate(url, { replace: true });
        }, SET_TIMEOUT);
      }
    }
  }, [mutationClone.isSuccess]);

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([customerQueryKeys.customerGet], (old: Customer | undefined) => {
        return { ...old, ...value };
      });
    }

    setTimeout(() => {
      onRefresh && onRefresh();
    }, SET_TIMEOUT);
  };

  //render title
  const TitleRender = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? ''}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={{ ...userPermission, isEdit: layoutData?.data?.restore?.id ? false : userPermission?.isEdit ?? false }}
        onSave={handleOnSave}
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
      label: t('ncrm_common_merge'),
      value: KEY_CUSTOMER_MERGE,
      icon: Icon('merge'),
      onClick: () => {
        setShowMerge(true);
      }
    },
    {
      label: t('ncrm_common_clone'),
      value: KEY_CUSTOMER_CLONE,
      icon: <ContentCopyOutlined fontSize="small" />,
      onClick: () => {
        mutationClone.mutate({ id: menuSourceId });
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
      <PrintPreview isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} />
      <CustomerMergeModal
        isOpen={showMerge}
        category={menuCategory}
        onClose={() => setShowMerge(false)}
        //defaultItems={[]}
        customer={layoutData.data}
        onReload={() => {
          onRefresh && onRefresh();
        }}
      />
    </>
  );
};

export default Header;
