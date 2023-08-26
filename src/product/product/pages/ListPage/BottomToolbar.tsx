import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { DeleteOutlined, Edit, RestoreFromTrashRounded
} from '@mui/icons-material';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { LabelValueIcon } from '@base/types/app';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_PRODUCT_PRODUCT } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import Switch from '@base/components/@hanbiro/Switch';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

import ProductGroupAutoComplete from '@product/group/containers/ProductGroupAutoComplete';
import ProductsPrintPreview from '@product/product/containers/ProductsPrintPreview';
import { Product } from '@product/product/types/product';
import { useProductMutation } from '@product/product/hooks/useProductMutation';
import { useProductsMutation } from '@product/product/hooks/useProductsMutation';
import Type from '@product/product/components/Type';

import { isDeleteList } from './Helper';
interface BottomToolbarProps extends BaseListBottomToolbarProps {
  listData: Product[];
  refetch: any;
}

const BottomToolbar = (props: BottomToolbarProps) => {
  const { listData, checkedIds, onCancel, refetch, ...restProps } = props;

  // state
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  const { filterValues } = useListPageSettings(MENU_PRODUCT_PRODUCT);
  const groupBy = filterValues?.groupBy;
  const isDeleteGroup = isDeleteList(groupBy);

  // hook mutaion
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_PRODUCT);
  const { mDelete, mRestore, mEmpty } = useProductMutation(listQueryKey);
  const { mUpdates } = useProductsMutation();

  //get and save selected items
  useEffect(() => {
    const nPage = listData.filter((o: Product) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems.concat(nPage));
    setSelectedItems(nSelected.filter((o: Product) => checkedIds.includes(o.id)));
  }, [listData, checkedIds]);

  useEffect(() => {
    if(mUpdates.isSuccess){
      onCancel && onCancel();
      refetch && refetch();
    }
  }, [mUpdates.isSuccess])

  const toolbars: LabelValueIcon[] = [
    {
      label: 'ncrm_common_bulk_update',
      value: 'BULK_UPDATE',
      icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'product_product_field_basic_group',
          value: 'group',
          component: ProductGroupAutoComplete,

          getValue: (componentValue: any): { id: string; name: string } => {
            return { id: componentValue?.id, name: componentValue?.name };
          },
          setValue: (value: { id: string; name: string }) => {
            return { id: value?.id };
          }
        },
        {
          label: 'product_product_field_basic_type',
          value: 'type',
          component: Type,
          componentProps: {
            showAvatar: true
          },
          getValue: (componentValue: string) => {
            return PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === componentValue)?.value ?? '';
          },
          setValue: (value: string) => {
            return PRODUCT_TYPE_OPTIONS?.find((v: any) => v.value === value)?.value ?? '';
          }
        },
        {
          label: 'product_product_field_basic_active',
          value: 'active',
          component: Switch,
          componentProps: {},
          getValue: (value?: boolean) => {
            return value ?? false;
          },
          setValue: (value?: boolean) => {
            return value ?? false;
          }
        },
        {
          label: 'product_product_field_basic_assignto',
          value: 'assignTo',
          component: UserAutoComplete,
          componentProps: {
            single: true,
            showAvatar: true
          },
          getValue: (componentValue: any) => {
            return {
              user: {
                id: componentValue?.id,
                name: componentValue?.name
              },
              group: {}
            };
          },
          setValue: (value?: any) => {
            return value?.user?.id ?? '';
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        //API to excute
        mUpdates.mutate({ product: value, ids: checkedIds });
      }
    },
    {
      label: 'ncrm_common_export',
      value: 'EXPORT',
      icon: <VerticalAlignBottomIcon fontSize="small" />,
      onClick: () => {
        setShowPrintPreview(true);
      }
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'DELETE',
      icon: <DeleteOutlined fontSize="small" />,
      onClick: () => {
        mDelete.mutate(
          { ids: checkedIds },
          {
            onSuccess(data, variables, context) {
              onCancel && onCancel();
            }
          }
        );
      }
    }
  ];

  const deleteToolbars: LabelValueIcon[] = [
    {
      label: 'ncrm_common_btn_restore',
      value: 'RESTORE',
      icon: <RestoreFromTrashRounded fontSize="small" />,
      onClick: () => {
        mRestore.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
            }
          }
        );
      }
    },
    {
      label: 'ncrm_common_btn_empty',
      value: 'EMPTY',
      icon: <DeleteOutlined fontSize="small" />,
      onClick: () => {
        mEmpty.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
            }
          }
        );
      }
    }
  ];

  const renderItemPrintPreview = useMemo(() => {
    return (
      showPrintPreview && (
        <ProductsPrintPreview layoutData={selectedItems} isOpen={showPrintPreview} onClose={() => setShowPrintPreview(false)} />
      )
    );
  }, [selectedItems, showPrintPreview]);

  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={isDeleteGroup ? deleteToolbars : toolbars}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
      {renderItemPrintPreview}
    </>
  );
};

export default BottomToolbar;
