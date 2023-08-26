import { useEffect, useState } from 'react';
import BaseListBottomToolbar, {
  ListBottomToolbarProps as BaseListBottomToolbarProps
} from '@base/components/@hanbiro/List/ListBottomToolbar';
import { ManageAccounts, Delete, Download, Block, GroupRemove, Edit } from '@mui/icons-material';

import * as components from '@desk/ticket/config/write-field/components';
import * as keyNames from '@desk/ticket/config/keyNames';

import { LabelValueIcon } from '@base/types/app';
import GroupUserModal from '@desk/ticket/containers/GroupUserModal';
import ProductCategoryModal from '@desk/ticket/containers/ProductCategoryModal';
import useTicketMutation from '@desk/ticket/hooks/useTicketMutations';
import TagsModal from '@desk/ticket/containers/TagsModal';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_DESK_TICKET } from '@base/config/menus';
import { useTranslation } from 'react-i18next';
import { useReadMutation } from '@base/hooks/mark-read-unread';
import ExportDataModal from '@base/containers/ExportData';

interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  isGroupByDeleted?: boolean;
  refetch: any;
  onReload?: () => void;
}

const BottomToolbar = (props: ListBottomToolbarProps) => {
  const { category, checkedIds, onCancel, onReload, isGroupByDeleted, refetch, ...restProps } = props;
  const { listQueryKey } = useListQueryKeys(MENU_DESK_TICKET);
  const { mCloseTicket, mDeleteTicket, mReportSpam, mUpdateBulk, mDeleteBulk, mRestoreTicket, mEmptyTicket } =
    useTicketMutation(listQueryKey);

  const [showGroupRep, setShowGroupRep] = useState(false);
  const [showProductCategory, setProductCategory] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [repAction, setRepAction] = useState('');
  const [showExport, setShowExport] = useState(false);
  const pageDataKey = `${category}`;

  const { mUpdate: mReadUpdate } = useReadMutation();

  //restore deleted items
  const handleDelete = () => {
    mDeleteTicket.mutate({ ids: checkedIds });
  };

  useEffect(() => {
    if (mCloseTicket.isSuccess || mDeleteTicket.isSuccess || mReportSpam.isSuccess || mRestoreTicket.isSuccess || mEmptyTicket.isSuccess) {
      onCancel && onCancel();
    }
  }, [mCloseTicket.isSuccess, mDeleteTicket.isSuccess, mReportSpam.isSuccess, mRestoreTicket.isSuccess, mEmptyTicket.isSuccess]);

  //buttons
  const quickButtons: LabelValueIcon[] = [
    {
      label: 'ncrm_common_bulk_update',
      value: 'BULK_UPDATE',
      // icon: <Edit fontSize="small" />,
      moreAction: [
        {
          label: 'ncrm_desk_ticket_filter_priority', // Priority
          value: 'prioirty',
          component: components.PrioritySelect,
          componentProps: {
            filterToolbarAction: true
          },
          getValue: (value: any) => {
            //return param for query
            return value?.priority || '';
          }
        },
        {
          label: 'ncrm_desk_ticket_filter_category', // Category
          value: keyNames.KEY_TICKET_CATEGORY,
          component: components.ProductCategorySelect,
          // component: components.CategorySelect,
          componentProps: {
            hideProductLabel: true,
            hideCategoryLabel: true,
            filterToolbarAction: true
          },
          getValue: (value: any) => {
            //return param for query
            return value?.category ? value.category.id : '';
          },
          setValue: (value: any) => {
            //initial value for component
          }
        },
        {
          label: 'ncrm_desk_ticket_filter_classification', // Classification
          value: keyNames.KEY_TICKET_CLASSIFICATION,
          component: components.Classification,
          componentProps: {
            cardMode: true
          },
          getValue: (value: any) => {
            //return param for query
            let newParam: string = '';
            if (value?.region) {
              newParam += value.region.id + '|' + value.region.value;
            }
            if (value?.language) {
              newParam += '|__|' + value.language.id + '|' + value.language.value;
            }
            return newParam;
          },
          setValue: (value: any) => {
            //initial value for component
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        const params: any = {};
        Object.keys(value).map((_keyName: string) => {
          if (value[_keyName]) {
            params[_keyName] = value[_keyName];
          }
        });
        //params
        if (Object.keys(params).length > 0) {
          mUpdateBulk.mutate({ ids: checkedIds, customer: params });
        }
      }
    },
    {
      label: 'ncrm_desk_ticket_quick_button_delete_rep',
      value: 'DELETE_REP',
      // icon: <GroupRemove fontSize="small" />,
      // onClick: () => {
      //   setShowModal(true);
      //   setRepAction('DELETE_REP');
      // }
      moreAction: [
        {
          label: 'ncrm_desk_ticket_filter_assigned_rep',
          value: keyNames.KEY_TICKET_ASSIGN_USER,
          component: components.AssignRepAutocomplete,
          componentProps: {},
          getValue: (value: any) => {
            return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
          },
          setValue: (value: string) => {
            return value ? value.split(',') : [];
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        mDeleteBulk.mutate({
          ids: checkedIds,
          assignedUser: {
            user: {
              id: value.assignedUser.id,
              name: value.assignedUser.name
            },
            group: null
          }
        });
      }
    },
    {
      label: 'ncrm_desk_ticket_quick_button_change_rep',
      value: 'CHANGE_REP',
      // icon: <ManageAccounts fontSize="small" />,
      // onClick: () => {
      //   setShowModal(true);
      //   setRepAction('CHANGE_REP');
      // },
      moreAction: [
        {
          label: 'ncrm_desk_ticket_filter_assigned_rep',
          value: keyNames.KEY_TICKET_ASSIGN_USER,
          component: components.AssignRepAutocomplete,
          componentProps: {},
          getValue: (value: any) => {
            return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
          },
          setValue: (value: string) => {
            return value ? value.split(',') : [];
          }
        }
      ],
      excuteMoreAction: (value: any) => {
        mUpdateBulk.mutate({
          ids: checkedIds,
          assignedUser: {
            user: {
              id: value.assignedUser.id,
              name: value.assignedUser.name
            },
            group: null
          }
        });
      }
    },
    {
      label: 'ncrm_desk_ticket_export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => setShowExport(true)
    },
    {
      label: 'ncrm_desk_ticket_quick_button_mark_as_spam', // Mark as Spam
      value: 'MARK_AS_SPAM',
      icon: <Block fontSize="small" />,
      onClick: () => {
        mReportSpam.mutate({ ids: checkedIds });
      }
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    }
  ];

  return (
    <>
      {!!checkedIds?.length && (
        <BaseListBottomToolbar
          items={quickButtons}
          checkedIds={checkedIds}
          onCancel={onCancel}
          {...restProps}
          visible={!showGroupRep && !showProductCategory && !showTag}
        />
      )}

      {showGroupRep && (
        <GroupUserModal
          title={t('ncrm_desk_ticket_quick_button_change_group_rep')} //Change Group / Rep
          size="sm"
          isOpen={true}
          onClose={() => setShowGroupRep(false)}
          onChange={(item: any) => {
            mUpdateBulk.mutate({
              ids: checkedIds,
              assignedGroup: {
                id: item.assignedGroup.id,
                name: item.assignedGroup.name
              },
              assignedUser: {
                user: {
                  id: item.assignedUser.id,
                  name: item.assignedUser.name
                },
                group: null
              }
            });
          }}
        />
      )}
      {showProductCategory && (
        <ProductCategoryModal
          title={t('ncrm_desk_ticket_quick_button_change_product_category')} //Change Product / Category
          size="sm"
          isOpen={true}
          onClose={() => setProductCategory(false)}
          onChange={(item: any) => {
            mUpdateBulk.mutate({
              ids: checkedIds,
              product: {
                id: item.product.id,
                name: item.product.name
              },
              category: {
                id: item.category.id,
                name: item.category.name
              }
            });
          }}
        />
      )}
      {showTag && (
        <TagsModal
          title={t('ncrm_desk_ticket_quick_button_change_tag')} //Change Tag
          size="sm"
          isOpen={true}
          onClose={() => setShowTag(false)}
          onChange={(item: any) => {
            mUpdateBulk.mutate({
              ids: checkedIds,
              tags: item
            });
          }}
        />
      )}
      <ExportDataModal menu={pageDataKey} isOpen={showExport} onClose={() => setShowExport(false)} onReload={onReload} />
    </>
  );
};

export default BottomToolbar;
