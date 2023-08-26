import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// mui import
import { DeleteOutlineOutlined, PrintOutlined, CachedOutlined, ContentCopyOutlined } from '@mui/icons-material';

// project import
import { PRODUCT_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';
import { FieldUserPermission, PageLayoutData } from '@base/types/pagelayout';
import { MENU_PRODUCT, MENU_PRODUCT_ITEM } from '@base/config/menus';
import { SET_TIMEOUT } from '@base/config/constant';
import { WriteOption } from '@base/types/common';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

// menu import
import { useItemMutation } from '@product/item/hooks/useItemMutation';
import PrintPreview from '@product/item/containers/PrintPreview';
import * as keyNames from '@product/item/config/keyNames';

import WritePage from '../WritePage';
import { concat } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';
import { Item } from '@product/item/types/item';
import { queryKeys } from '@product/item/config/queryKeys';

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

  // get viewData from queryClient
  const data = queryClient.getQueryData<Item>([queryKeys.viewItem, menuSourceId]);

  const [showPrint, setShowPrint] = useState<boolean>(false);
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: menuSource, isOpenWrite: false });

  const titleKey = keyNames.KEY_ITEM_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_ITEM);
  const { mDelete } = useItemMutation(listQueryKey);

  useEffect(() => {
    if (mDelete.isSuccess) {
      setTimeout(() => {
        navigate(`/${MENU_PRODUCT}/${menu}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mDelete.isSuccess]);

  const title = useMemo(() => {
    const userPermission: FieldUserPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? ''}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={{ ...userPermission, isEdit: data?.restore?.id ? false : userPermission?.isEdit }}
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
        <PrintPreview
          isOpen={showPrint}
          onClose={() => setShowPrint(false)}
          layoutData={layoutData}
          ignoreFields={concat(ignoreFields, [
            keyNames.KEY_ITEM_IMAGES,
            keyNames.KEY_ITEM_UNIT,
            keyNames.KEY_ITEM_UNIT_VALUE,
            keyNames.KEY_ITEM_UNIT_VALUE_QTY,
            keyNames.KEY_ITEM_ATTR_VALUES,
            keyNames.KEY_ITEM_UNIT_PRICE
          ])}
        />
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
