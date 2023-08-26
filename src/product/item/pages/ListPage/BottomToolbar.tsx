import React, { useEffect, useMemo, useState } from 'react';

import { CheckCircleOutlined, CircleOutlined, Delete, DeleteOutlined, Edit, Print, RestoreFromTrashRounded } from '@mui/icons-material';

import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { LabelValue, LabelValueIcon } from '@base/types/app';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_PRODUCT_ITEM } from '@base/config/menus';
import { Item } from '@product/item/types/item';
import { useItemMutation } from '@product/item/hooks/useItemMutation';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import ItemsPrintPreview from '@product/item/containers/ItemsPrintPreview';
import _ from 'lodash';
import { useReadMutation } from '@base/hooks/mark-read-unread';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import InventoryTypeSelect from '@product/item/components/InventoryTypeSelect';
import { PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS } from '@product/main/config/constants';

import { useTranslation } from 'react-i18next';
import Switch from '@base/components/@hanbiro/Switch';
interface BottomToolbarProps extends BaseListBottomToolbarProps {
  listData: Item[];
  refetch: any;
  nlistType: string;
}

const BottomToolbar = (props: BottomToolbarProps) => {
  const { listData, checkedIds, onCancel, refetch, nlistType, ...restProps } = props;

  const { filterValues } = useListPageSettings(MENU_PRODUCT_ITEM);
  const groupBy = filterValues?.groupBy;
  const isDeleteGroup = groupBy == 'deletedItem';
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const nPage = listData.filter((o: Item) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedItems.concat(nPage));
    setSelectedItems(nSelected.filter((o: Item) => checkedIds.includes(o.id)));
  }, [listData, checkedIds]);
  // hook mutaion
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_ITEM);
  const { mDelete, mRestore, mEmpty, mUpdateBatch } = useItemMutation([...listQueryKey, nlistType]);
  // const { mUpdate: mReadUpdate } = useReadMutation();

  const items: LabelValueIcon[] = [
    {
      label: 'ncrm_common_bulk_update',
      value: 'BULK_UPDATE',
      icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'product_item_field_basic_inventorytype',
          value: 'inventoryType',
          component: InventoryTypeSelect,
          componentProps: {},
          getValue: (componentValue: any) => {
            return PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS.findIndex((v: LabelValue) => v.value == componentValue?.id) + 1;
          },
          setValue: (value: number) => {
            return PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.[value - 1]?.value;
          }
        },
        {
          label: 'product_item_field_basic_active',
          value: 'active',
          component: Switch,
          componentProps: {
            // defaultValue: true
          },
          getValue: (value?: boolean) => {
            return value ?? false;
          },
          setValue: (value?: boolean) => {
            return value ?? false;
          },
          parseExtra: (value: boolean) => {
            return value ? t(`ncrm_common_active`) : t(`ncrm_common_inactive`);
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        const tmp: Item = {
          inventoryType: PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS?.[value?.inventoryType - 1]?.value,
          active: value?.active
        };

        mUpdateBatch.mutate({ ids: checkedIds, item: tmp });
        // Reload
        onCancel && onCancel();
        // onReload && onReload();
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
      icon: <Delete fontSize="small" />,
      onClick: () => {
        mDelete.mutate(
          { ids: checkedIds },
          {
            onSuccess() {
              onCancel && onCancel();
              refetch && refetch();
            }
          }
        );
      }
    }
  ];

  const itemsOnDeleteMenu: LabelValueIcon[] = [
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
        <ItemsPrintPreview layoutData={selectedItems} isOpen={showPrintPreview} onClose={() => setShowPrintPreview(false)} />
      )
    );
  }, [selectedItems, showPrintPreview]);
  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={isDeleteGroup ? itemsOnDeleteMenu : items}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
      {renderItemPrintPreview}
    </>
  );
};

export default BottomToolbar;
