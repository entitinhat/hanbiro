import React from 'react';
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import {
  GroupAdd,
  GroupRemove,
  ManageAccounts,
  Delete,
  Download,
  Block,
  RestoreFromTrashRounded,
  DeleteOutlined,
  CheckCircleOutlined,
  CircleOutlined
} from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { MENU_ACTIVITY } from '@base/config/menus';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { useActivityMutation } from '@activity/hooks/useActivityMutation';
import { useReadMutation } from '@base/hooks/mark-read-unread';
import * as activitiesGroupBy from '@activity/config/list-field/activitiesGroupBy';
import { useActivityDelete } from '@activity/hooks/useActivityDelete';


import * as keyNames from '@activity/config/keyNames';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { LookupCustom } from '@activity/config/write-field/components';
import { useSelectionFields } from '@base/services/graphql/format-service';
import { IdLanguageKey } from '@base/types/common';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  refetch: any;
}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { checkedIds, onCancel, refetch, ...restProps } = props;

  const { filterValues } = useListPageSettings(`${MENU_ACTIVITY}_activity`);
  const groupBy = filterValues?.groupBy;


  const { listQueryKey } = useListQueryKeys(`${MENU_ACTIVITY}_activity`);
  const { mRestore, mEmpty } = useActivityMutation(listQueryKey);
  const { mUpdate: mReadUpdate } = useReadMutation();
  const { mutationDelete: mDelete } = useActivityDelete();

  const handleDelete = () => {
    mDelete({ ids: checkedIds });
  };

  const defaultItems: LabelValueIcon[] = [
    // {
    //   label: 'ncrm_common_mark_as_read',
    //   value: 'LOG_ACTION_MARK_AS_READ',
    //   icon: <CheckCircleOutlined fontSize="small" />,
    //   onClick: () => {
    //     const logView = {
    //       action: 'LOG_ACTION_MARK_AS_READ',
    //       menu: `${MENU_ACTIVITY}_activity`,
    //       ids: checkedIds
    //     };
    //     mReadUpdate.mutate(
    //       { logView },
    //       {
    //         onSuccess() {
    //           onCancel && onCancel();
    //           refetch && refetch();
    //         }
    //       }
    //     );
    //   }
    // },
    // {
    //   label: 'ncrm_common_mark_as_unread',
    //   value: 'LOG_ACTION_MARK_AS_UNREAD',
    //   icon: <CircleOutlined fontSize="small" />,
    //   onClick: () => {
    //     const logView = {
    //       action: 'LOG_ACTION_MARK_AS_UNREAD',
    //       menu: `${MENU_ACTIVITY}_activity`,
    //       ids: checkedIds
    //     };

    //     mReadUpdate.mutate(
    //       { logView },
    //       {
    //         onSuccess() {
    //           onCancel && onCancel();
    //           refetch && refetch();
    //         }
    //       }
    //     );
    //   }
    // },
    // {
    //   label: 'ncrm_activity_change_reps',
    //   value: 'CHANGE_REP',
    //   icon: <ManageAccounts fontSize="small" />
    // },
    // {
    //   label: 'ncrm_activity_add_reps',
    //   value: 'ADD_REP',
    //   icon: <GroupAdd fontSize="small" />
    // },
    // {
    //   label: 'ncrm_activity_delete_reps',
    //   value: 'DELETE_REP',
    //   icon: <GroupRemove fontSize="small" />
    // }
    {
      label: 'ncrm_common_bulk_update',
      value: 'BulkUpdate',
      moreAction: [
        {
          label: 'activity_activity_field_basic_from', // Assigned Rep
          value: keyNames.KEY_NAME_ACTIVITY_FROM,
          component: UserAutoComplete,
          getValue: (value: any) => {
            return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
          },
          setValue: (value: string) => {
            return value ? value.split(',') : [];
          }
        },
        {
          label: 'ncrm_activity_priority',
          value: keyNames.KEY_NAME_ACTIVITY_PRIORITY, // Priority
          component: LookupCustom,
          componentProps: {
            fetchList: useSelectionFields,
            fieldLabel: 'languageKey',
            fieldValue: 'id',
            extraParams: { filter: { query: 'keyRoot=priority' } },
            isMultiple: true,
            useDefault: false
          },
          getValue: (value: IdLanguageKey[]) => {
            return value?.map((v: any) => v?.id).join(',');
          }
        },
        {
          label: 'activity_call_field_basic_purpose', // Purpose
          value: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
          component: LookupCustom,
          componentProps: {
            fetchList: useSelectionFields,
            fieldLabel: 'languageKey',
            fieldValue: 'id',
            extraParams: { filter: { query: 'keyRoot=activity_purpose' } },
            isMultiple: true,
            useDefault: false
          },
          getValue: (value: IdLanguageKey[]) => {
            return value?.map((v: any) => v?.id).join(',');
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        //API to excute
        console.log('Apply value Value', value, 'to', checkedIds);

        // Reload
        // onCancel && onCancel();
        // onReload && onReload();
      }
    },
    {
      label: 'ncrm_common_export',
      value: 'Export',
      icon: <Download fontSize="small" />,
      onClick: () => {}
    },
    {
      label: 'ncrm_activity_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: () => {}
    }
  ];

  const missCallToolbars: LabelValueIcon[] = [
    {
      label: 'ncrm_common_btn_confirm',
      value: 'CONFIRM'
    }
  ];

  const scheduledEmailsToolbars: LabelValueIcon[] = [
    {
      label: 'ncrm_common_btn_cancel',
      value: 'CANCEL',
      icon: <Block fontSize="small" />,
      onClick: onCancel
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
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

  let items = [] as LabelValueIcon[];
  switch (groupBy) {
    case activitiesGroupBy.ALL_MISSED_CALL:
    case activitiesGroupBy.MY_MISSED_CALL:
      // case 'all_scheduled_call':
      items = missCallToolbars;
      break;
    case activitiesGroupBy.ALL_SCHEDULED_EMAILS:
      // case 'my_scheduled_call':
      items = scheduledEmailsToolbars;
      break;
    case activitiesGroupBy.DELETED_ACTIVITY:
      items = deleteToolbars;
      break;
    default:
      items = defaultItems;
      break;
  }
  
  return <BaseListBottomToolbar items={items} checkedIds={checkedIds} onCancel={onCancel} {...restProps} />;

};

export default ListBottomToolbar;
