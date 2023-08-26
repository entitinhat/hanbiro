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
  RestoreFromTrashRounded,
  CheckCircleOutlined,
  CircleOutlined
} from '@mui/icons-material';
import { LabelValueIcon } from '@base/types/app';
import useCustomerDelete from '@customer/hooks/useCustomerDelete';
import { User } from '@base/types/user';
import AssignRepModal from '@base/containers/AssignRepModal';
import CustomerMergeModal from '../Merge';
import { useCustomerCreateAssignRep, useCustomerDeleteRep } from '@customer/hooks/useCustomerAssignReps';
import { useTranslation } from 'react-i18next';
import CustomerPrintPreview from '../CustomerPrintPreview';
import { Customer } from '@customer/types/interface';
import _ from 'lodash';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { MENU_CUSTOMER, MENU_CUSTOMER_ALL } from '@base/config/menus';
import { useCusomerRestoreMutation } from '@customer/hooks/useCusomerRestoreMutation';
import { useReadMutation } from '@base/hooks/mark-read-unread';
interface ListBottomToolbarProps extends BaseListBottomToolbarProps {
  category: string;
  itemsList?: any[];
  isGroupByDeleted?: boolean; //TODO - when groupby deleted selected
  onReload?: () => void;
}

const ListBottomToolbar = (props: ListBottomToolbarProps) => {
  const { category, itemsList = [], checkedIds, isGroupByDeleted = false, onReload, onCancel, ...restProps } = props;
  const { t } = useTranslation();
  //state
  const [showMerge, setShowMerge] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [repAction, setRepAction] = useState('');
  const [allReps, setAllReps] = useState<User[]>([]);
  const [showPrintPreview, setShowPrintPreview] = useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>();
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
    const nPage = itemsList.filter((o: Customer) => checkedIds.includes(o.id));
    const nSelected = _.union(selectedCustomers?.concat(nPage));
    setSelectedCustomers(nSelected.filter((o: Customer) => checkedIds.includes(o.id)));
  }, [itemsList, checkedIds]);
  //hooks
  const mDelete = useCustomerDelete({ category, onCancel, onReload });
  const mAssignRep = useCustomerCreateAssignRep({ onClose: () => setShowModal(false), onCancel, onReload });
  const mDeleteRep = useCustomerDeleteRep({ onClose: () => setShowModal(false), onCancel, onReload });
  const { mUpdate: mReadUpdate } = useReadMutation();
  const { listQueryKey } = useListQueryKeys(MENU_CUSTOMER_ALL);
  const { mRestore, mEmpty } = useCusomerRestoreMutation(listQueryKey);

  //restore deleted items
  const handleDelete = () => {
    mDelete.mutate({ ids: checkedIds });
  };
  //open List Print Preview
  const handlePrintPreview = () => {
    setShowPrintPreview(true);
  };

  //assign reps
  const handleAssignChange = (selectedReps: User[]) => {
    if (selectedReps && selectedReps.length > 0) {
      if (repAction === 'CHANGE_REP' || repAction === 'ADD_REP') {
        const params: any = {
          ids: checkedIds,
          assignTo: selectedReps.map((_rep: User) => ({
            user: {
              id: _rep.id,
              name: _rep.name
            },
            group: { id: '', name: '' }
          }))
        };
        mAssignRep.mutate(params);
      }
    }
    if (repAction === 'DELETE_REP') {
      const params: any = {
        ids: checkedIds,
        repIds: selectedReps.map((_rep: any) => _rep.id)
      };
      mDeleteRep.mutate(params);
    }
  };

  //restore deleted items
  const handleRestore = () => {
    mRestore.mutate(
      { ids: checkedIds },
      {
        onSuccess() {
          onCancel && onCancel();
          onReload && onReload();
        }
      }
    );
  };

  //Empty deleted items
  const handleEmpty = () => {
    mEmpty.mutate(
      { ids: checkedIds },
      {
        onSuccess() {
          onCancel && onCancel();
          onReload && onReload();
        }
      }
    );
  };

  //buttons
  let quickButtons: LabelValueIcon[] = [];
  //add merge
  if (category !== 'all' && checkedIds.length > 1) {
    quickButtons.push({
      label: 'ncrm_common_merge',
      value: 'MERGE',
      icon: <Merge fontSize="small" />,
      onClick: () => setShowMerge(true)
    });
  }
  if (category === 'account') {
    quickButtons = quickButtons.concat([
      {
        label: 'Change Reps',
        value: 'CHANGE_REP',
        icon: <ManageAccounts fontSize="small" />,
        onClick: () => {
          setShowModal(true);
          setRepAction('CHANGE_REP');
        }
      },
      {
        label: 'Add Reps',
        value: 'ADD_REP',
        icon: <GroupAdd fontSize="small" />,
        onClick: () => {
          setShowModal(true);
          setAllReps([]);
          setRepAction('ADD_REP');
        }
      },
      {
        label: 'Delete Reps',
        value: 'DELETE_REP',
        icon: <GroupRemove fontSize="small" />,
        onClick: () => {
          setShowModal(true);
          setRepAction('DELETE_REP');
        }
      }
    ]);
  }
  //more
  quickButtons = quickButtons.concat([
    {
      label: 'ncrm_common_mark_as_read',
      value: 'LOG_ACTION_MARK_AS_READ',
      icon: <CheckCircleOutlined fontSize="small" />,
      onClick: () => {
        const logView = {
          action: 'LOG_ACTION_MARK_AS_READ',
          menu: `${MENU_CUSTOMER}_${category}`,
          ids: checkedIds
        };

        mReadUpdate.mutate(
          { logView },
          {
            onSuccess() {
              onCancel && onCancel();
              onReload && onReload();
            }
          }
        );
      }
    },
    {
      label: 'ncrm_common_mark_as_unread',
      value: 'LOG_ACTION_MARK_AS_UNREAD',
      icon: <CircleOutlined fontSize="small" />,
      onClick: () => {
        const logView = {
          action: 'LOG_ACTION_MARK_AS_UNREAD',
          menu: `${MENU_CUSTOMER}_${category}`,
          ids: checkedIds
        };

        mReadUpdate.mutate(
          { logView },
          {
            onSuccess() {
              onCancel && onCancel();
              onReload && onReload();
            }
          }
        );
      }
    },
    {
      label: 'ncrm_common_sendemail',
      value: 'MAIL',
      icon: <Mail fontSize="small" />,
      onClick: () => console.log('Send mail')
    },
    {
      label: 'ncrm_customer_sendsms',
      value: 'SMS',
      icon: <Sms fontSize="small" />,
      onClick: () => console.log('Send sms')
    },
    {
      label: 'ncrm_customer_export',
      value: 'EXPORT',
      icon: <Download fontSize="small" />,
      onClick: () => console.log('Export')
    },
    {
      label: 'ncrm_customer_delete',
      value: 'DELETE',
      icon: <Delete fontSize="small" />,
      onClick: handleDelete
    },
    {
      label: 'ncrm_common_btn_print',
      value: 'PRINT',
      icon: <Print fontSize="small" />,
      onClick: handlePrintPreview
    }
  ]);
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
      <AssignRepModal
        title={assignTitle}
        isOpen={showModal}
        visibleSelect={repAction !== 'DELETE_REP'}
        onClose={() => setShowModal(false)}
        value={allReps}
        onChange={handleAssignChange}
        loading={mAssignRep.isLoading || mDeleteRep.isLoading}
      />
      <CustomerMergeModal
        isOpen={showMerge}
        category={category}
        onClose={() => setShowMerge(false)}
        defaultItems={itemsList.filter((_item: any) => checkedIds.includes(_item.id))}
        onReload={() => {
          onReload && onReload();
          onCancel([]);
        }}
      />
      {showPrintPreview && (
        <CustomerPrintPreview onClose={() => setShowPrintPreview(false)} layoutData={selectedCustomers ?? []} isOpen={showPrintPreview} />
      )}
    </>
  );
};

export default ListBottomToolbar;
