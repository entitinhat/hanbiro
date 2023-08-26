import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

// mui import
import { DeleteOutlineOutlined, PrintOutlined, CachedOutlined, ContentCopyOutlined } from '@mui/icons-material';

import { PRODUCT_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_PRODUCT, MENU_PRODUCT_PRODUCT } from '@base/config/menus';
import { SET_TIMEOUT } from '@base/config/constant';
import PrintPreview from '@product/product/containers/PrintPreview';
import { KEY_PRODUCT_NAME } from '@product/product/config/keyNames';
import { useProductMutation } from '@product/product/hooks/useProductMutation';
import { WriteOption } from '@base/types/common';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import WritePage from '../WritePage';
import { Product } from '@product/product/types/product';
import { queryKeys } from '@product/product/config/queryKeys';

interface HeaderProps {
  menu: string;
  menuSource: string; // can get from recoil > layoutData
  menuSourceId: string; // can get from recoil > layoutData
  isSplitMode?: boolean;
  layoutData: PageLayoutData; // can get from recoil
  ignoreFields?: string[];
  onRefresh?: any;
}

const Header = (props: HeaderProps) => {
  const { menu, menuSource, menuSourceId = '', isSplitMode, layoutData, onRefresh, ignoreFields = [] } = props;

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Product>([queryKeys.viewProduct, menuSourceId]);

  const [showPrint, setShowPrint] = useState<boolean>(false);
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: menuSource, isOpenWrite: false });

  const titleKey = KEY_PRODUCT_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_PRODUCT);
  const { mClone, mDelete } = useProductMutation(listQueryKey);

  useEffect(() => {
    if (mDelete.isSuccess) {
      setTimeout(() => {
        navigate(`/${MENU_PRODUCT}/${menu}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mDelete.isSuccess]);

  const title = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? ''}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={{ ...userPermission, isEdit: data?.restore?.id ? false : userPermission?.isEdit ?? false }}
      />
    );
  }, [titleField, data]);

  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_common_btn_print',
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => {
        setShowPrint(true);
      }
    },
    {
      label: 'ncrm_common_btn_clone',
      value: 'clone',
      icon: <ContentCopyOutlined fontSize="small" />,
      onClick: () => {
        mClone.mutate({ ids: [menuSourceId] });
      }
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mDelete.mutate({ ids: [menuSourceId] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: PRODUCT_MENUS,
      menu,
      isSplitMode,
      title,
      moreActions,
      onNew: (mode?: string) => {
        setWriteOption({
          ...writeOption,
          writeType: mode || menuSource,
          isOpenWrite: true
        });
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

  return (
    <Suspense fallback={<></>}>
      {HeaderMemo}
      {showPrint && (
        <PrintPreview isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} ignoreFields={ignoreFields} />
      )}
      {writeOption.isOpenWrite && (
        <WritePage
          isOpen={writeOption.isOpenWrite}
          onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
          // onReload={onRefresh}
        />
      )}
    </Suspense>
  );
};

export default Header;
