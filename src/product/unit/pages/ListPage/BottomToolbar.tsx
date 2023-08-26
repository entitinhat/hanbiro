// mui import
import { DeleteOutlined, RestoreFromTrashRounded } from '@mui/icons-material';

// project import
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { LabelValueIcon } from '@base/types/app';
import Switch from '@base/components/@hanbiro/Switch';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_PRODUCT_UNIT } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { isDeleteList } from './Helper';
// menu import
import { useBaseUnitMutation } from '@product/unit/hooks/useBaseUnitMutation';
import { useUnitsMutation } from '@product/unit/hooks/useUnitsMutation';
import { useEffect } from 'react';

interface BottomToolbarProps extends BaseListBottomToolbarProps {
  refetch: any;
}

const BottomToolbar = (props: BottomToolbarProps) => {
  const { checkedIds, onCancel, refetch, ...restProps } = props;

  const { filterValues } = useListPageSettings(MENU_PRODUCT_UNIT);
  const isDeleteGroup = isDeleteList(filterValues?.groupBy);

  // hook mutaion
  const { listQueryKey } = useListQueryKeys(MENU_PRODUCT_UNIT);
  const { mDelete, mRestore, mEmpty } = useBaseUnitMutation(listQueryKey);
  const { mUpdates } = useUnitsMutation();

  useEffect(() => {
    if(mUpdates.isSuccess){
      // Reload
      onCancel && onCancel();
      refetch && refetch();
    }
  }, [mUpdates.isSuccess])

  const items: LabelValueIcon[] = [
    {
      label: 'ncrm_common_bulk_update',
      value: 'BulkUpdate',
      // icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'ncrm_common_active',
          value: 'active',
          component: Switch,
          componentProps: {
            
          },
          getValue: (value?: boolean) => {
            return value ?? false;
          },
          setValue: (value?: boolean) => {
            return value ?? false;
          },
        }
      ],
      excuteMoreAction: (value: any) => {
        //API to excute
        mUpdates.mutate({ unit : value, ids: checkedIds });
      }
    },
    {
      label: 'ncrm_common_delete',
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

  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={isDeleteGroup ? itemsOnDeleteMenu : items}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
    </>
  );
};

export default BottomToolbar;
