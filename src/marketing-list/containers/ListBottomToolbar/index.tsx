import React, { useEffect, useMemo, useState } from 'react';
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import {
  GroupAdd,
  GroupRemove,
  ManageAccounts,
  Delete,
  Merge,
  Mail,
  Sms,
  Download,
  DeleteOutlined,
  Print,
  RestoreFromTrashRounded
} from '@mui/icons-material';
import { LabelValue, LabelValueIcon } from '@base/types/app';
import { User } from '@base/types/user';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_CUSTOMER_ALL } from '@base/config/menus';
import {
  KEY_CUSTOMER_EXPORT,
  KEY_CUSTOMER_IMPORT,
  KEY_CUSTOMER_MARKETING_PREFERENCES,
  KEY_CUSTOMER_MERGE,
  MARKETING_TYPE_OPTIONS
} from '@marketing-list/config/constants';
import { SettingOutlined } from '@ant-design/icons';
import Icon from '@base/assets/icons/svg-icons';
import Switch from '@base/components/@hanbiro/Switch';
import useMarketingDelete from '@marketing-list/hooks/useMarketingDelete';
import * as keyNames from '@marketing-list/config/keyNames';
import SelectBox from '@base/components/@hanbiro/SelectBox';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean; //TODO - when groupby deleted selected
  onReload?: () => void;
}

export const CUSTOMER_TOOLBAR_MORE_OPTIONS: { [key: string]: LabelValueIcon[] } = {
  general: [
    {
      label: 'Import',
      value: KEY_CUSTOMER_IMPORT,
      icon: Icon('upload_cloud')
    },
    {
      label: 'Export',
      value: KEY_CUSTOMER_EXPORT,
      icon: Icon('download')
    },
    {
      label: 'Merge',
      value: KEY_CUSTOMER_MERGE,
      icon: Icon('merge')
    }
  ],
  marketing: [
    {
      label: 'Import',
      value: KEY_CUSTOMER_IMPORT,
      icon: Icon('upload_cloud')
    },
    {
      label: 'Export',
      value: KEY_CUSTOMER_EXPORT,
      icon: Icon('download')
    },
    {
      label: 'Marketing  Preferences',
      value: KEY_CUSTOMER_MARKETING_PREFERENCES,
      icon: <SettingOutlined style={{ fontSize: '18px' }} />
    }
  ]
};

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const { t } = useTranslation();
  //state
  const [showMerge, setShowMerge] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [repAction, setRepAction] = useState('');
  const [allReps, setAllReps] = useState<User[]>([]);
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>();
  //get current reps
  useEffect(() => {
    if (repAction === 'CHANGE_REP' || repAction === 'DELETE_REP') {
      let newReps: User[] = [];
      itemsList.map((_item: any) => {
        if (checkedIds.includes(_item.id)) {
          _item.assignTo?.map((_assign: User) => {
            const fIdx = newReps.findIndex((_rep: User) => _rep.id === _assign.id);
            if (fIdx === -1) {
              newReps.push(_assign);
            }
          });
        }
      });
      setAllReps(newReps);
    }
  }, [showModal, repAction]);
  //get current selected customers
  useEffect(() => {
    const nPage = itemsList.filter((o: any) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedCustomers?.concat(nPage));
    setSelectedCustomers(nSelected.filter((o: any) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);
  //hooks
  const mDelete = useMarketingDelete();

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };
  //open List Print Preview
  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  //restore deleted items
  const handleRestore = () => {
    // mRestore.mutate(
    //   { ids: checkedIds },
    //   {
    //     onSuccess() {
    //       onCancel && onCancel();
    //       onReload && onReload();
    //     }
    //   }
    // );
  };

  //Empty deleted items
  const handleEmpty = () => {
    // mEmpty.mutate(
    //   { ids: checkedIds },
    //   {
    //     onSuccess() {
    //       onCancel && onCancel();
    //       onReload && onReload();
    //     }
    //   }
    // );
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];

  if (category === 'marketing_list') {
    quickButtons = [
      {
        label: 'Bulk Update',
        value: 'BULK_UPDATE',
        // icon: <Delete fontSize="small" />,
        moreAction: [
          {
            label: 'Marketing Type',
            value: keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE,
            component: SelectBox,
            componentProps: {
              placeholder: 'Type or click to select a type',
              options: MARKETING_TYPE_OPTIONS
            },
            getValue: (value: any) => {
              return value.keyName;
            }
            // getValue: (componentValue: any) => {
            //   return MARKETING_TYPE_OPTIONS.findIndex((v: LabelValue) => v.value == componentValue?.id) + 1;
            // },
            // setValue: (value: number) => {
            // return MARKETING_TYPE_OPTIONS?.[value - 1]?.value;
            // }
          },
          {
            label: 'Active',
            value: 'active',
            component: Switch,
            componentProps: {
              showAvatar: true
            }
            // getValue: (value: any) => {
            // return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
            // },
            // setValue: (value: string) => {
            // return value ? value.split(',') : [];
            // }
          }
        ],
        excuteMoreAction: (value: any) => {
          //API to excute
          console.log('Apply value: ', value);
          console.log('to: ', checkedIds);

          // Reload
          onCancel && onCancel();
          onReload && onReload();
        }
      },
      {
        label: 'ncrm_customer_delete',
        value: 'DELETE',
        icon: <Delete fontSize="small" />,
        onClick: handleDelete
      },
      {
        label: 'ncrm_customer_export',
        value: 'EXPORT',
        icon: <Download fontSize="small" />,
        onClick: () => console.log('Export')
      }
    ];
  }

  if (isGroupByDeleted) {
    quickButtons = [
      {
        label: 'ncrm_common_btn_restore',
        value: 'RESTORE',
        icon: <RestoreFromTrashRounded fontSize="small" />,
        onClick: handleRestore
      },
      {
        label: 'ncrm_common_btn_empty',
        value: 'EMPTY',
        icon: <DeleteOutlined fontSize="small" />,
        onClick: handleEmpty
      }
    ];
  }

  //get assign title
  const assignTitle = useMemo(() => {
    switch (repAction) {
      case 'CHANGE_REP':
        return 'Change Assign Rep';
      case 'DELETE_REP':
        return 'Delete Assign Rep';
      default:
        return 'Add Assign Rep';
    }
  }, [repAction]);

  //console.log('allReps', allReps);
  return (
    <>
      <BaseListBottomToolbar
        visible={!!checkedIds?.length}
        items={quickButtons.map((_button: LabelValueIcon) => ({ ..._button, label: t(_button.label) }))}
        checkedIds={checkedIds}
        onCancel={onCancel}
        {...restProps}
      />
    </>
  );
};

export default ListBottomToolbar;
